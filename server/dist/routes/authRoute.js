"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authcontroller_1 = require("../controllers/authcontroller");
const authRouter = express_1.Router();
authRouter.post('/login', authcontroller_1.loginController);
// usersRouter.get('/', getUsers);
exports.default = authRouter;
