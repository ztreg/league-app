import {Request, Response} from 'express'
import { getMatchesByUserIdModel, getSummonerInfoByNameModel } from '../models/ritomodel'
import { validateSummonerName } from '../utils/dataValidation'
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


