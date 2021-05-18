import joi from 'joi'

export function validateAddUsersSchema() {
  const schema = joi.object({
    summonerName: joi.string().min(1).max(50).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
  })
  return schema
}

export function validateUserId() {
  return joi.string().min(40).max(60).required()
}

export function validateSummonerName() {
  return joi.string().min(1).max(20).required()
}
