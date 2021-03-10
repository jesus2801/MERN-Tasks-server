import {Router} from 'express';
import {check} from 'express-validator';
import ctrl from '../controllers/tasks.controller';
const router = Router();

router
  .route('/')
  //get all tasks
  .get([check('project', 'Project is required').notEmpty()], ctrl.getProjectTasks)
  //create new task
  .post(
    [
      check('name', 'Task name is required').notEmpty(),
      check('project', 'Project is required').notEmpty(),
    ],
    ctrl.createTask
  );

router
  .route('/:id')
  //updateTask
  .put(
    [
      check('name', 'Ivalid name').notEmpty().optional(),
      check('state', 'Invalid state').isBoolean().optional(),
      check('project', 'Project is required').notEmpty(),
    ],
    ctrl.updateTask
  )
  .delete(check('project', 'Project is required').notEmpty(), ctrl.deleteTask);

export default router;
