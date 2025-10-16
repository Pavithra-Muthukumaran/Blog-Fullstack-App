import express from 'express';
import {addComment, getComments} from '../controllers/commentsController.js';
import {protect} from '../middleware/auth.js';
const router = express.Router({mergeParams: true});
router.post('/:postId', protect, addComment);
router.get('/:postId/:commentId', protect,deleteComment);
export default router;