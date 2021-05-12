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
exports.loginModel = void 0;
require('dotenv').config();
const usermodel_1 = require("./usermodel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.SECRET;
function createToken(payload) {
    if (secret) {
        return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '1h' });
    }
}
const loginModel = (loginObject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield usermodel_1.getSingleUserModel({ summonerName: loginObject.summonerName });
        if (user) {
            const checkedPassword = bcryptjs_1.default.compareSync(loginObject.password, user.password);
            if (checkedPassword) {
                let token = createToken({ userId: user._id, summonerName: user.summonerName });
                return { token: token, summonerName: user.summonerName, id: user._id.toString(), following: user.following };
            }
            else {
                return { msg: 'wrong password' };
            }
        }
        else {
            return { msg: 'wrong summonerName' };
        }
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
exports.loginModel = loginModel;
