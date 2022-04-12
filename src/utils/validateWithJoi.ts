import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import ErrorStatus from './joiErrorStatus';

const validateWithJoi = (schema:ObjectSchema) => 
  (req:Request, res:Response, next:NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const errorType = error.details[0].type as keyof typeof ErrorStatus;
      return res.status(ErrorStatus[errorType])
        .send({ message: error.message });
    }
    next();
  };

export default validateWithJoi;