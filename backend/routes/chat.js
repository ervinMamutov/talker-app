import express from 'express';
import verifyToken from '../middleware/verifyToken.js';

import chatControllers from '../controllers/chat.js';

const router = express.Router();

router.post('/new-chat', verifyToken, chatControllers.new);
router.get('/user-chats', verifyToken, chatControllers.getChats);
router.post('/group-chat', chatControllers.group);
export default router;
