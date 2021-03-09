import {Router} from 'express';
const router = Router();

import ctrl from '../controllers/projects.controller';

router.post('/', ctrl.createProject);

export default router;
