import { Router } from 'express';
import fiisRoutes from './fiisRoutes.js';

const router = Router();

// mapeia todas as rotas da api
router.use('/fiis', fiisRoutes);

export default router;
