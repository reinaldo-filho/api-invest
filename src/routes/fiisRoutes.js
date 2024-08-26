import { Router } from 'express';
import fiisController from '../controllers/fiisController.js';

const router = Router();

router.get('/', fiisController.getAll);
router.get('/:ticker', fiisController.getOne);

export default router;
