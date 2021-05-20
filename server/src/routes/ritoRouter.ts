import { Router } from 'express';

import { 
  getMatchesByUserIdController, 
  getSummonerRankedInfoByIdController, 
  getSummonerInfoByIdController, 
  getSummonerInfoByNameController, 
  getMatchInfoByMatchIdController 
} from '../controllers/ritocontroller';

import {authMiddleware} from '../utils/auhorization'
const ritoRouter = Router();


ritoRouter.get('/summoner/:accountName', getSummonerInfoByNameController)

ritoRouter.get('/summonerById/:accountId', getSummonerInfoByIdController)

ritoRouter.get('/matches/user/:accountId', authMiddleware, getMatchesByUserIdController)

ritoRouter.get('/summonerRanked/:summonerId', authMiddleware, getSummonerRankedInfoByIdController)

ritoRouter.get('/matches/:matchId', authMiddleware, getMatchInfoByMatchIdController)

export default ritoRouter;
  
