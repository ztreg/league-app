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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFollowingListModel = exports.updateUserFollowModel = exports.addUserModel = exports.getSingleUserModel = exports.getUsersModel = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongodb_1 = __importDefault(require("../database/mongodb"));
function hashPW(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcryptjs_1.default.hashSync(password, 10);
    });
}
const getUsersModel = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield mongodb_1.default.User.find({});
});
exports.getUsersModel = getUsersModel;
const getSingleUserModel = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(filter);
    const res = yield mongodb_1.default.User.findOne(filter);
    console.log(res);
    return res;
});
exports.getSingleUserModel = getSingleUserModel;
const addUserModel = (user) => __awaiter(void 0, void 0, void 0, function* () {
    user.password = yield hashPW(user.password);
    const addedUser = yield mongodb_1.default.User.create(user);
    return addedUser;
});
exports.addUserModel = addUserModel;
const updateUserFollowModel = (userObject) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, accountId } = userObject;
    return yield mongodb_1.default.User.updateOne({ _id: id }, { $push: { following: accountId } });
});
exports.updateUserFollowModel = updateUserFollowModel;
const updateFollowingListModel = (userObject) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, following } = userObject;
    return yield mongodb_1.default.User.updateOne({ _id: id }, { following: following });
});
exports.updateFollowingListModel = updateFollowingListModel;
