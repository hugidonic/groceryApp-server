import express, { application } from 'express';
import cors from 'cors';
import {json} from 'body-parser';
// Routers
import ProductsRouter from './modules/Products' 
import CategoriesRouter from './modules/Categories' 
import OrdersRouter from './modules/Orders' 
import UserRouter from './modules/User' 
import config from 'config';

declare global {
  namespace Express {
    interface Request {
      userId: string 
    }
  }
}

const PORT = config.get('port') || 5000

const app = express();

app.use(json())
app.use(cors())
app.use('/api/images', express.static('images'))

// Routes
app.use('/api', ProductsRouter)
app.use('/api/user', UserRouter)
app.use('/api', CategoriesRouter)
app.use('/api', OrdersRouter)

// 10.0.2.2

app.get('/', (req,res) => {
	res.send("Server is up and running")
})

app.listen(PORT, () => {
	console.log(`App listening on http://localhost:${PORT}`);
})
