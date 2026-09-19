import express from 'express';
import { getThumbnailById, getUserThumbnail } from '../controllers/UserController.js';
import protect from '../middlewares/auth.js';


const UserRouter = express.Router();

UserRouter.get ('/thumbnails' ,protect, getUserThumbnail)
UserRouter.get ('/thumbnail/:id' ,protect, getThumbnailById)

export default UserRouter

