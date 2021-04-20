"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usercontroller_1 = require("../controllers/usercontroller");
const express_1 = require("express");
const usersRouter = express_1.Router();
usersRouter.post('/', usercontroller_1.addUser);
usersRouter.get('/', usercontroller_1.getUsers);
exports.default = usersRouter;
