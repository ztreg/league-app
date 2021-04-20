"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const app = express_1.default();
const add = (a, b) => a + b;
app.get('/', (req, res) => {
    console.log(add(3, 2));
    res.send('Hello');
});
app.use(express_1.default.json());
app.use('/users', userRoute_1.default);
const PORT = 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
