import { Router } from 'express';
import validateWithJoi from '../controllers/middlewares/validateWithJoi';
import verifyId from '../controllers/middlewares/verifyId';
import MotorcycleController from '../controllers/Motorcycle';
import { motorcycleSchema } from '../utils/joiSchemas';

class MotorcycleRoutes {
  public router = Router();

  protected controller: MotorcycleController;

  constructor() {
    this.controller = new MotorcycleController();
    this.addRoute();
  }

  public addRoute(): void {
    this.router.get('/', this.controller.read);
    this.router.post(
      '/',
      validateWithJoi(motorcycleSchema),
      this.controller.create,
    );
    this.router.get('/:id', verifyId(), this.controller.readOne);
    this.router.put('/:id', verifyId(), this.controller.update);
    this.router.delete('/:id', verifyId(), this.controller.delete);
  }
}

export default MotorcycleRoutes;