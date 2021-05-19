import { Router } from 'express';
import {Request, Response, NextFunction} from 'express'
import { 
  getMatchesByUserIdController, 
  getSummonerRankedInfoByIdController, 
  getSummonerInfoByIdController, 
  getSummonerInfoByNameController, 
  getMatchInfoByMatchIdController 
} from '../controllers/ritocontroller';
import {authMiddleware} from '../utils/auhorization'
const ritoRouter = Router();


ritoRouter.get('/matches/user/:accountId', getMatchesByUserIdController)

// No token required here. Is needed for signup and login.
ritoRouter.get('/summoner/:accountName', getSummonerInfoByNameController)

ritoRouter.get('/summonerById/:accountId', getSummonerInfoByIdController)

ritoRouter.get('/summonerRanked/:summonerId', getSummonerRankedInfoByIdController)

ritoRouter.get('/matches/:matchId', getMatchInfoByMatchIdController)

export default ritoRouter;
  
