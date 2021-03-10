import {hash, compare} from 'bcrypt';
import {Request, Response} from 'express';
import {ProjectDocument} from '../interfaces/Project.interfaces';
import Project from '../models/Project';

export default {
  hashPass: async function (pass: string): Promise<string> {
    const hashPass = await hash(pass, 10);
    return hashPass;
  },

  comparePass: async function (pass: string, hash: string) {
    const isEquals = await compare(pass, hash);
    return isEquals;
  },

  validProject: async function (
    projectID: number | string,
    res: Response,
    req: Request
  ): Promise<boolean | ProjectDocument> {
    const exits: ProjectDocument = await Project.findById(projectID);

    if (!exits) {
      res.status(404).json({
        msg: 'Project not found',
      });
      return false;
    }

    if (exits.creator.toString() !== req.user.id) {
      res.status(401).json({
        msg: 'Acces denied',
      });
      return false;
    }
    return exits;
  },
};
