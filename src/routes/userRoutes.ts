import { Router } from 'express';
import { UserController } from '../controller/UserController';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();
const userController = new UserController();

// Define routes
router.get('/', userController.all);
router.get('/:id', userController.one);
router.post('/', userController.save);
router.post('/login', userController.login);
router.patch('/:id', verifyToken, userController.modify);
router.delete('/:id', verifyToken, userController.remove);

export default router;