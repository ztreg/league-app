"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRouter = require('express').Router();
// const userRouter = route
userRouter.get('/', getAllUsers);
function getAllUsers(req, res) {
    res.json({ 'name': 'Pelle' });
}
exports.default = userRouter;
