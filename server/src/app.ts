import express, {Application, Request, Response} from 'express'

import usersRouter from './routes/userRoute';
import { connect } from './database/mongodb'

const app: Application = express()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello')
});

app.use(express.json());
app.use('/users', usersRouter)

const PORT = 3000

connect()

app.listen(PORT, () => console.log('Server running on port ' + PORT));