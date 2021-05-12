import dotenv from 'dotenv'
dotenv.config()
import express, {Application, Request, Response} from 'express'
import cors from 'cors'
import usersRouter from './routes/userRoute';
import authRouter from './routes/authRoute'
import { connect } from './database/mongodb'
import path from 'path'
import ritoRouter from './routes/ritoRouter';

const app: Application = express()


app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(cors())
app.use(express.json());
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/ritoURL', ritoRouter)

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
});

const PORT = process.env.PORT || 3000

connect()

app.listen(PORT, () => console.log('Server running on port ' + PORT));