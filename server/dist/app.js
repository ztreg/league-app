"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const mongodb_1 = require("./database/mongodb");
const path_1 = __importDefault(require("path"));
const ritoRouter_1 = __importDefault(require("./routes/ritoRouter"));
const app = express_1.default();
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
app.use(cors_1.default());
app.use(express_1.default.json());
app.use('/api/v1/users', userRoute_1.default);
app.use('/api/v1/auth', authRoute_1.default);
app.use('/api/v1/ritoURL', ritoRouter_1.default);
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'index.html'));
});
const PORT = 3000;
mongodb_1.connect();
app.listen(PORT, () => console.log('Server running on port ' + PORT));
