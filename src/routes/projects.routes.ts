import {Router} from 'express';
import {check} from 'express-validator';
const router = Router();

import ctrl from '../controllers/projects.controller';

router
  .route('/')
  //get all projects
  .get(ctrl.getAllProjects)
  //create new project
  .post([check('name', 'Project name is required').notEmpty()], ctrl.createProject);

router
  .route('/:id')
  //update project
  .put(
    [check('name', 'Project name is required').notEmpty()],

    ctrl.updateProject
  )
  //delete project
  .delete(ctrl.deleteProject);

export default router;
