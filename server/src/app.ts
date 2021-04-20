import express, {Application, Request, Response, NextFunction} from 'express'

import usersRouter from './routes/userRoute';

const app: Application = express()

const add = (a: number, b: number):number => a + b; 

app.get('/', (req: Request, res: Response) => {
  console.log(add(3, 2));
  
  res.send('Hello')
});

app.use('/api/users', usersRouter)

app.listen(3000, () => console.log('Server running'));