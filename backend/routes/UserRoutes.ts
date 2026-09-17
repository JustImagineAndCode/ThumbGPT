import express from 'express';
import { getThumbnailById, getUserThumbnail } from '../controllers/UserController.js';


const UserRouter = express.Router();

UserRouter.get ('/thumbnails' , getUserThumbnail)
UserRouter.get ('/thumbnail/:id' , getThumbnailById)

export default UserRouter

