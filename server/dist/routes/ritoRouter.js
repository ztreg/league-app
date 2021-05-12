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
const express_1 = require("express");
const node_fetch_1 = __importDefault(require("node-fetch"));
const ritoRouter = express_1.Router();
const mainURL = 'https://euw1.api.riotgames.com';
const matchURL = 'lol/match/v4/matches';
const userNameURL = 'lol/summoner/v4/summoners/by-name';
const rankedURL = 'lol/league/v4/entries/by-summoner';
const userByIdUrl = '/lol/summoner/v4/summoners/by-account';
const matchlistByAccount = 'lol/match/v4/matchlists/by-account';
const apiQuery = process.env.queryToken;
ritoRouter.get('/matches/user/:accountId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let emptyParams = {};
    if (req && req.query) {
        const test = req.query;
        emptyParams = new URLSearchParams(test);
    }
    const accountId = req.params.accountId;
    const fullString = `${mainURL}/${matchlistByAccount}/${accountId}?${emptyParams.toString()}&${apiQuery}`;
    yield node_fetch_1.default(`${fullString}`)
        .then((response) => response.json())
        .then(userData => {
        res.status(200).json(userData);
    }).catch((error) => {
        console.error('MATCHES: ', error);
        res.status(500).json(error);
    });
}));
ritoRouter.get('/summoner/:accountName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accountName = req.params.accountName;
    const fullString = `${mainURL}/${userNameURL}/${accountName}?${apiQuery}`;
    yield node_fetch_1.default(`${fullString}`)
        .then((response) => response.json())
        .then(userData => {
        res.status(200).json(userData);
    }).catch((error) => {
        console.error('USER BY NAME: ', error);
        res.status(500).json(error);
    });
}));
ritoRouter.get('/summonerById/:accountId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accountId = req.params.accountId;
    const fullString = `${mainURL}/${userByIdUrl}/${accountId}?${apiQuery}`;
    yield node_fetch_1.default(`${fullString}`)
        .then((response) => response.json())
        .then(userData => {
        res.status(200).json(userData);
    }).catch((error) => {
        console.error('USER BY ID:', error);
        res.status(500).json(error);
    });
}));
ritoRouter.get('/summonerRanked/:summonerId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const summonerId = req.params.summonerId;
    const fullString = `${mainURL}/${rankedURL}/${summonerId}?${apiQuery}`;
    yield node_fetch_1.default(`${fullString}`)
        .then((response) => response.json())
        .then(userData => {
        res.status(200).json(userData);
    }).catch((error) => {
        console.error('USERRANKED BY ID:', error);
        res.status(500).json(error);
    });
}));
ritoRouter.get('/matches/:matchId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const matchId = req.params.matchId;
    const fullString = `${mainURL}/${matchURL}/${matchId}?${apiQuery}`;
    yield node_fetch_1.default(`${fullString}`)
        .then((response) => response.json())
        .then(userData => {
        res.status(200).json(userData);
    }).catch((error) => {
        console.error('err: MATCH BY ID:', error);
        res.status(500).json(error);
    });
}));
// ritoRouter.get('/matches', loginController)
// ritoRouter.get('/summoner/ranked', loginController)
exports.default = ritoRouter;
