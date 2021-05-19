import {Request, Response, NextFunction} from 'express'
import { getMatchesByUserIdModel, getMatchInfoByMatchIdModel, getSummonerRankedInfoByIdModel, getSummonerInfoByIdModel, getSummonerInfoByNameModel } from '../models/ritomodel'
import { validateMatchId, validateSummonerName, validateUserId } from '../utils/dataValidation'

export const getMatchesByUserIdController = async (req: Request, res: Response) => {
  let emptyParams: any = {}
  if(req && req.query) {
    const test = req.query
    emptyParams = new URLSearchParams(test as any)
  }
  const accountId = req.params.accountId
  const body = {
    emptyParams, accountId
  }
  try {
    const response = await getMatchesByUserIdModel(body)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getSummonerInfoByNameController = async (req: Request, res: Response) => {
    const accountName = req.params.accountName
    try {
      await validateSummonerName().validateAsync(accountName)
      const reponse = await getSummonerInfoByNameModel(accountName)
      res.status(200).json(reponse)
    } catch (error) {
      res.status(500).json(error)
    }
}

export const getSummonerInfoByIdController = async (req: Request, res: Response) => {
  const accountId = req.params.accountId
  try {
    await validateUserId().validateAsync(accountId)
    const reponse = await getSummonerInfoByIdModel(accountId)
    res.status(200).json(reponse)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getSummonerRankedInfoByIdController = async (req: Request, res: Response) => {
  const summonerId = req.params.summonerId
  try {
    await validateUserId().validateAsync(summonerId)
    const reponse = await getSummonerRankedInfoByIdModel(summonerId)
    res.status(200).json(reponse)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getMatchInfoByMatchIdController = async (req: Request, res: Response) => {
  const matchId = req.params.matchId
  try {
    await validateMatchId().validateAsync(matchId)
    const reponse = await getMatchInfoByMatchIdModel(matchId)
    res.status(200).json(reponse)
  } catch (error) {
    res.status(500).json(error)
  }
}
