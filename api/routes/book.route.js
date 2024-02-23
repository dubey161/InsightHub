import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createbook } from "../controllers/book.controller.js"
import { getbooks } from '../controllers/book.controller.js';
import { deletebook } from '../controllers/book.controller.js';


const router = express.Router();

router.post('/createbook', verifyToken, createbook);
router.get('/getbooks', getbooks)//anyone can see search post
router.delete('/deletebook/:bookId/:userId', verifyToken, deletebook)





export default router;