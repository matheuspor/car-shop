import { NextFunction, Request, Response } from 'express';

const verifyId = () => 
  (req:Request, res:Response, next:NextFunction) => {
    const { id } = req.params;
    if (!id) return res.status(400).send({ error: 'Id is required' });
    if (id.length < 24) {
      return res.status(400)
        .send({ error: 'Id must have 24 hexadecimal characters' });
    }
    next();
  };

export default verifyId;