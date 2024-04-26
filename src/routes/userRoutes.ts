import { Router } from 'express';
import { UserController } from '../controller/UserController';

const router = Router();
const userController = new UserController();

// Define routes
router.get('/', userController.all);
router.get('/:id', userController.one);
router.post('/', userController.save);
router.patch('/:id', userController.modify);
router.delete('/:id', userController.remove);

export default router;      