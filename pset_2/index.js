

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// JWT secret must come from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

let users = [];
let nextUserId = 1;

let notes = [];
let nextNoteId = 1;

// Track failed login attempts
const loginAttempts = new Map();

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes


// ---------- AUTH ROUTES (public) ----------

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const normalizedEmail = email?.trim().toLowerCase();

  if (!name || !normalizedEmail || !password) {
    return res.status(400).json({
      error: 'name, email and password are required'
    });
  }

  const existing = users.find(u => u.email === normalizedEmail);

  if (existing) {
    return res.status(409).json({
      error: 'Email already registered'
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: nextUserId++,
    name,
    email: normalizedEmail,
    password: hashedPassword
  };

  users.push(user);

  res.status(201).json({
    message: 'User registered',
    userId: user.id
  });
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // BUG FIX #1:
  // Normalize the email before searching for the user
  const normalizedEmail = email?.trim().toLowerCase();

  if (!normalizedEmail || !password) {
    return res.status(400).json({
      error: 'email and password are required'
    });
  }

  // Check login lockout
  const attempt = loginAttempts.get(normalizedEmail);

  if (attempt && attempt.lockedUntil > Date.now()) {
    return res.status(429).json({
      error: 'Too many failed login attempts. Try again later.'
    });
  }

  // Clear expired lockout
  if (attempt && attempt.lockedUntil <= Date.now()) {
    loginAttempts.delete(normalizedEmail);
  }

  const user = users.find(u => u.email === normalizedEmail);

  if (!user) {
    recordFailedLogin(normalizedEmail);

    return res.status(401).json({
      error: 'Invalid email or password'
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    recordFailedLogin(normalizedEmail);

    return res.status(401).json({
      error: 'Invalid email or password'
    });
  }

  // Successful login resets failed attempts
  loginAttempts.delete(normalizedEmail);

  const payload = {
    userId: user.id,
    email: user.email
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({
    message: 'Login successful',
    token
  });
});


// Record failed login attempt
function recordFailedLogin(email) {
  const current = loginAttempts.get(email) || {
    count: 0,
    lockedUntil: 0
  };

  current.count++;

  if (current.count >= MAX_LOGIN_ATTEMPTS) {
    current.lockedUntil = Date.now() + LOCKOUT_TIME;
  }

  loginAttempts.set(email, current);
}


// ---------- AUTH MIDDLEWARE ----------

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'No token provided'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({
      error: 'Invalid or expired token'
    });
  }
}


// ---------- PROTECTED ROUTES ----------

app.get('/profile', requireAuth, (req, res) => {
  const user = users.find(u => u.id === req.user.userId);

  // Robustness fix
  if (!user) {
    return res.status(404).json({
      error: 'User not found'
    });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email
  });
});


app.post('/notes', requireAuth, (req, res) => {
  const { title, content } = req.body;

  if (!title) {
    return res.status(400).json({
      error: 'title is required'
    });
  }

  const note = {
    id: nextNoteId++,
    userId: req.user.userId,
    title,
    content: content || ''
  };

  notes.push(note);

  res.status(201).json(note);
});


app.get('/notes', requireAuth, (req, res) => {
  const myNotes = notes.filter(
    n => n.userId === req.user.userId
  );

  res.json(myNotes);
});


app.get('/notes/:id', requireAuth, (req, res) => {
  const note = notes.find(
    n =>
      n.id === Number(req.params.id) &&
      n.userId === req.user.userId
  );

  if (!note) {
    return res.status(404).json({
      error: 'Not found'
    });
  }

  res.json(note);
});


app.patch('/notes/:id', requireAuth, (req, res) => {
  const note = notes.find(
    n =>
      n.id === Number(req.params.id) &&
      n.userId === req.user.userId
  );

  if (!note) {
    return res.status(404).json({
      error: 'Not found'
    });
  }

  // BUG FIX #2:
  // Never allow userId or id to be changed by the client
  const { title, content } = req.body;

  if (title !== undefined) {
    note.title = title;
  }

  if (content !== undefined) {
    note.content = content;
  }

  res.json(note);
});


app.listen(3000, () => {
  console.log('Server running on port 3000');
});