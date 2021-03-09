import {Router} from 'express';
import {check} from 'express-validator';
const router = Router();

import ctrl from '../controllers/projects.controller';
import auth from '../middlewares/auth.middleware';

router
  .route('/')
  //get all projects
  .get(auth.verifyToken, ctrl.getAllProjects)
  //create new project
  .post(
    auth.verifyToken,
    [check('name', 'Project name is required').notEmpty()],
    ctrl.createProject
  );

router
  .route('/:id')
  //update project
  .put(
    [check('name', 'Project name is required').notEmpty()],
    auth.verifyToken,
    ctrl.updateProject
  )
  //delete project
  .delete(auth.verifyToken, ctrl.deleteProject);

export default router;
