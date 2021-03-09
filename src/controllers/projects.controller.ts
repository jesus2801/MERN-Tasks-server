import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import {ProjectDocument} from '../interfaces/Project.interfaces';
import Project from '../models/Project';

export default {
  createProject: function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const project: ProjectDocument = new Project(req.body);

      project.creator = req.user.id;
      project.save();
      res.status(200).json(project);
    } catch (e) {
      next(e);
    }
  },

  getAllProjects: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await Project.find({creator: req.user.id}).sort({date: -1});
      res.json({projects});
    } catch (e) {
      next(e);
    }
  },

  updateProject: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const {name} = req.body;
      const newProject = {
        name,
      };

      const project: ProjectDocument = await Project.findById(req.params.id);
      if (project.creator.toString() !== req.user.id) {
        return res.status(401).json({
          msg: 'Acces denied',
        });
      }

      const response = await Project.findByIdAndUpdate(
        {_id: req.params.id},
        {$set: newProject},
        {new: true}
      );
      res.status(200).json({response});
    } catch (e) {
      next(e);
    }
  },

  deleteProject: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const project: ProjectDocument = await Project.findById(req.params.id);
      if (project.creator.toString() !== req.user.id) {
        return res.status(401).json({
          msg: 'Acces denied',
        });
      }

      await Project.findOneAndDelete({_id: req.params.id});

      res.status(200).json({
        msg: 'project deleted',
      });
    } catch (e) {
      next(e);
    }
  },
};
