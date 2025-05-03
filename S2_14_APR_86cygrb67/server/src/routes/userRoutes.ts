import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';
import {addUser, getUsers, updateUser } from '../controllers/userController';

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(['admin']));

router.get('/', getUsers);
router.post('/',addUser);
router.put('/:id', updateUser);


export default router;