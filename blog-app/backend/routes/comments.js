import express from 'express';
import {addComment, deleteComment} from '../controllers/commentsController.js';
import {authMiddleware} from '../middleware/auth.js';
const router = express.Router({mergeParams: true});
router.post('/:postId', authMiddleware, addComment);
router.get('/:postId/:commentId', authMiddleware,deleteComment);
export default router;