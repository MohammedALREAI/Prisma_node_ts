import { Request, Response, NextFunction } from 'express';
import * as ProvisionService from '../services/provision-service';
import { RawProvisionedComponent } from '../@types';

export const provisionComponentList = async (
  req: Request<{}, {}, RawProvisionedComponent[]>,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);

    const rawProvisionedComponentList: RawProvisionedComponent[] = req.body;

    const componentList = await ProvisionService.provisionComponentList(
      rawProvisionedComponentList
    );

    res.send(componentList);
  } catch (err) {
    next(err);
  }
};
