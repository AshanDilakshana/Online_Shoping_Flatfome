import express from 'express';
import{ createUser,logingUser} from '../controllers/userController.js';



const userRouter = express.Router();

userRouter.post('/register', createUser);
userRouter.post('/login', logingUser);
















export default userRouter;