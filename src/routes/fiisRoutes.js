import { Router } from 'express';
import fiisController from '../controllers/fiisController.js';

const router = Router();

router.get('/', fiisController.getAll);
router.get('/:ticker', fiisController.getOne);
router.post('/', fiisController.create);
router.put('/:ticker', fiisController.update);
router.delete('/:ticker', fiisController.remove);

export default router;
