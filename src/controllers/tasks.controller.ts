import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import {TaskInterface, TaskDocument} from '../interfaces/Task.interfaces';
import Task from '../models/Task';
import helpers from '../herlpers/functions';

export default {
  createTask: async function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {project} = req.body;

    try {
      const projectDoc = await helpers.validProject(project, res, req);
      if (!projectDoc) return;

      const task: TaskDocument = new Task(req.body);
      await task.save();
      return res.json({
        task,
      });
    } catch (e) {
      next(e);
    }
  },

  getProjectTasks: async function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {project} = req.body;

    try {
      const projectDoc = await helpers.validProject(project, res, req);
      if (!projectDoc) return;

      const tasks: TaskInterface[] = await Task.find({project: projectDoc});
      res.status(200).json({tasks});
    } catch (e) {
      next(e);
    }
  },

  updateTask: async function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {project, name, state} = req.body;
    try {
      const isValid = await helpers.validProject(project, res, req);
      if (!isValid) return;

      let task: TaskDocument = await Task.findById(req.params.id);

      if (!task) {
        return res.status(404).json({
          msg: 'Sorry an error occurred',
        });
      }

      const newTask: any = {};
      if (name) newTask.name = name;
      if (state) newTask.state = state;
      task = await Task.findOneAndUpdate({_id: req.params.id}, newTask, {new: true});
      res.status(200).json({task});
    } catch (e) {
      next(e);
    }
  },

  deleteTask: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const {project} = req.body;

      const isValid = await helpers.validProject(project, res, req);
      if (!isValid) return;

      let task: TaskDocument = await Task.findById(req.params.id);

      if (!task) {
        return res.status(404).json({
          msg: 'Sorry an error occurred',
        });
      }

      await Task.findOneAndRemove({_id: req.params.id});
      res.status(200).json({
        msg: 'Task deleted',
      });
    } catch (e) {
      next(e);
    }
  },
};
