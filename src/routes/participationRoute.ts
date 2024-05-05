import { Router } from 'express';
import { ParticipationController } from '../controller/ParticipationController';

const router = Router();
const participationController = new ParticipationController();

router.get('/', participationController.all)

export default router;