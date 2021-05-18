import fetch from 'node-fetch';

const mainURL = 'https://euw1.api.riotgames.com'
const matchURL = 'lol/match/v4/matches'
const userNameURL = 'lol/summoner/v4/summoners/by-name'
const rankedURL = 'lol/league/v4/entries/by-summoner'
const userByIdUrl = '/lol/summoner/v4/summoners/by-account'
const matchlistByAccount = 'lol/match/v4/matchlists/by-account'
const apiQuery = process.env.queryToken

export const getMatchesByUserIdModel = async (body: any) => {
  const {accountId, emptyParams} = body
  const fullString = `${mainURL}/${matchlistByAccount}/${accountId}?${emptyParams.toString()}&api_key=${apiQuery}`
  return await fetch(`${fullString}`)
  .then((response: any) => response.json())
    .then(userData =>  {
      return userData
    }).catch((error: Error) => {
      return error
  })

}

export const getSummonerInfoByNameModel = async (accountName: string) => {
  console.log('getting by name pog');
  
  const fullString = `${mainURL}/${userNameURL}/${accountName}?api_key=${apiQuery}`
  
  return await fetch(`${fullString}`)
    .then((response: any) => response.json())
      .then(userData =>  {
       return userData
      }).catch((error: Error) => {
      return error
    })
}