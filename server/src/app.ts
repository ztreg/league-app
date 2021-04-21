import express, {Application, Request, Response} from 'express'
import cors from 'cors'
import usersRouter from './routes/userRoute';
import authRouter from './routes/authRoute'
import { connect } from './database/mongodb'

const app: Application = express()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello')
});

app.use(cors())
app.use(express.json());
app.use('/users', usersRouter)
app.use('/auth', authRouter)

const PORT = 3000

connect()

app.listen(PORT, () => console.log('Server running on port ' + PORT));