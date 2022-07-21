import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

enum ErrorStatus {
  'any.required' = 400,
  'boolean.base' = 400,
  'number.greater' = 400,
  'number.less' = 400,
  'string.empty' = 400,
  'string.min' = 400,
  'any.only' = 400,
}

const validateWithJoi = (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const errorType = error.details[0].type as keyof typeof ErrorStatus; // https://stackoverflow.com/questions/55377365/what-does-keyof-typeof-mean-in-typescript //
      return res.status(ErrorStatus[errorType])
        .send({ message: error.message });
    }
    next();
  };

export default validateWithJoi;