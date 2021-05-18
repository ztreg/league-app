import { Router } from 'express';
import fetch from 'node-fetch';
import { getMatchesByUserIdController, getSummonerInfoByNameController } from '../controllers/ritocontroller';

const ritoRouter = Router();

const mainURL = 'https://euw1.api.riotgames.com'
const matchURL = 'lol/match/v4/matches'
const userNameURL = 'lol/summoner/v4/summoners/by-name'
const rankedURL = 'lol/league/v4/entries/by-summoner'
const userByIdUrl = '/lol/summoner/v4/summoners/by-account'
const matchlistByAccount = 'lol/match/v4/matchlists/by-account'
const apiQuery = process.env.queryToken

ritoRouter.get('/matches/user/:accountId', getMatchesByUserIdController)

ritoRouter.get('/summoner/:accountName', getSummonerInfoByNameController)

ritoRouter.get('/summonerById/:accountId', async (req, res) => {
  const accountId = req.params.accountId
  const fullString = `${mainURL}/${userByIdUrl}/${accountId}?api_key=${apiQuery}`
  await fetch(`${fullString}`)
  .then((response: any) => response.json())
    .then(userData =>  {
      res.status(200).json(userData)
    }).catch((error: Error) => {
      console.error('USER BY ID:', error)
      res.status(500).json(error)
  })

})

ritoRouter.get('/summonerRanked/:summonerId', async (req, res) => {
  const summonerId = req.params.summonerId
  const fullString = `${mainURL}/${rankedURL}/${summonerId}?api_key=${apiQuery}`
  await fetch(`${fullString}`)
  .then((response: any) => response.json())
    .then(userData =>  {
      res.status(200).json(userData)
    }).catch((error: Error) => {
      console.error('USERRANKED BY ID:', error)
      res.status(500).json(error)
  })

})

ritoRouter.get('/matches/:matchId', async (req, res) => {
  const matchId = req.params.matchId
  const fullString = `${mainURL}/${matchURL}/${matchId}?api_key=${apiQuery}`
  await fetch(`${fullString}`)
  .then((response: any) => response.json())
    .then(userData =>  {
      res.status(200).json(userData)
    }).catch((error: Error) => {
      console.error('err: MATCH BY ID:', error)
      res.status(500).json(error)
  })

})
// ritoRouter.get('/matches', loginController)
// ritoRouter.get('/summoner/ranked', loginController)

export default ritoRouter;
  
