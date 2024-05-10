import { Router } from 'express';
import { ParticipationController } from '../controller/ParticipationController';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();
const participationController = new ParticipationController();

router.get('/', verifyToken, participationController.all);
router.get('/one', verifyToken, participationController.one);
router.post('/', verifyToken, participationController.save);

export default router;