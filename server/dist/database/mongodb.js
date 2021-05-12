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
exports.disconnect = exports.connect = void 0;
const mongoose = require("mongoose");
// import {Mongoose as test} from "mongoose"
// const dbTest = new test()
let database;
const connect = () => {
    // add your own uri below
    const uri = "mongodb+srv://JonasEx:F*zRT*R@tuF9Ht8@jonasleague.qnofa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    if (database) {
        console.log(database);
        return;
    }
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    database = mongoose.connection;
    database.once("open", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Connected to database");
    }));
    database.on("error", () => {
        console.log("Error connecting to database");
    });
};
exports.connect = connect;
const disconnect = () => {
    if (!database) {
        return;
    }
    mongoose.disconnect();
};
exports.disconnect = disconnect;
const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    summonerName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    summonerId: {
        type: String
    },
    following: {
        type: Array
    }
});
const User = mongoose.model("User", UserSchema);
exports.default = { UserSchema, User };
