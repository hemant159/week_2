"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}

app.use(logger);

app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
exports.default = app;

//# sourceMappingURL=bug23.js.map