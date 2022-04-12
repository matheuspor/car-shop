import { Request, Response } from 'express';
import Service from '../services';

export type ResponseError = {
  error: unknown;
};

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
}

abstract class Controller<T> {
  protected errors = ControllerErrors;

  constructor(protected service: Service<T>) { }

  create = async (
    req: Request,
    res: Response,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const item = await this.service.create(body);
      if (!item) throw new Error(this.errors.internal);
      return res.status(201).json(item);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const objs = await this.service.read();
      return res.json(objs);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request,
    res: Response,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const item = await this.service.readOne(id);
      return item
        ? res.json(item)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: Request,
    res: Response,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const { body } = req;
    try {
      const item = await this.service.update(id, body);
      if (!item) return res.status(404).json({ error: this.errors.notFound });
      return res.json(item);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request,
    res: Response,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const item = await this.service.delete(id);
      return item
        ? res.status(204).json(item)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}
export default Controller;