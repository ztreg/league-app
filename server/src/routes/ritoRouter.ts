import { Router } from 'express';
import fetch from 'node-fetch';

const ritoRouter = Router();

const mainURL = 'https://euw1.api.riotgames.com'
const matchURL = 'lol/match/v4/matches'
const userNameURL = 'lol/summoner/v4/summoners/by-name'
const rankedURL = 'lol/league/v4/entries/by-summoner'
const userByIdUrl = '/lol/summoner/v4/summoners/by-account'
const matchlistByAccount = 'lol/match/v4/matchlists/by-account'
const apiQuery = process.env.queryToken

ritoRouter.get('/matches/user/:accountId', async (req, res) => {
    let emptyParams: any = {}
    if(req && req.query) {
      const test = req.query
      emptyParams = new URLSearchParams(test as any)
    }
    const accountId = req.params.accountId
    
   const fullString = `${mainURL}/${matchlistByAccount}/${accountId}?${emptyParams.toString()}&${apiQuery}`
    await fetch(`${fullString}`)
    .then((response: any) => response.json())
      .then(userData =>  {
        res.status(200).json(userData)
      }).catch((error: Error) => {
        console.error('MATCHES: ', error)
        res.status(500).json(error)
    })
})

ritoRouter.get('/summoner/:accountName', async (req, res) => {
  const accountName = req.params.accountName
  const fullString = `${mainURL}/${userNameURL}/${accountName}?${apiQuery}`

  await fetch(`${fullString}`)
  .then((response: any) => response.json())
    .then(userData =>  {
      res.status(200).json(userData)
    }).catch((error: Error) => {
      console.error('USER BY NAME: ', error)
      res.status(500).json(error)
  })
})

ritoRouter.get('/summonerById/:accountId', async (req, res) => {
  const accountId = req.params.accountId
  const fullString = `${mainURL}/${userByIdUrl}/${accountId}?${apiQuery}`
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
  const fullString = `${mainURL}/${rankedURL}/${summonerId}?${apiQuery}`
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
  const fullString = `${mainURL}/${matchURL}/${matchId}?${apiQuery}`
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
  