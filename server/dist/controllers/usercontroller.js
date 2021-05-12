"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserFollow = exports.addUser = exports.getUsers = void 0;
const usermodel_1 = require("../models/usermodel");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield usermodel_1.getUsersModel();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(401).json({ msg: error });
    }
});
exports.getUsers = getUsers;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addedUser = yield usermodel_1.addUserModel(req.body);
        res.status(201).json(addedUser);
    }
    catch (error) {
        res.status(401).json({ msg: error });
    }
});
exports.addUser = addUser;
const updateUserFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { accountId } = req.body;
    const currentFollowing = yield usermodel_1.getSingleUserModel({ _id: id });
    const testfoll = currentFollowing.following;
    for (let i = 0; i < testfoll.length; i++) {
        const element = testfoll[i];
        if (element === accountId) {
            testfoll.splice(i, 1);
            const newObject = {
                id, following: testfoll
            };
            const test = yield usermodel_1.updateFollowingListModel(newObject);
            return res.status(200).json(test);
        }
        else {
            console.log('not following that user');
        }
    }
    try {
        console.log('npnp');
        const updatedUser = yield usermodel_1.updateUserFollowModel({ id, accountId });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
});
exports.updateUserFollow = updateUserFollow;
