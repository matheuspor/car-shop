import { Router } from 'express';
import CarController from '../controllers/Car';
import validateWithJoi from '../controllers/middlewares/validateWithJoi';
import verifyId from '../controllers/middlewares/verifyId';
import { carSchema } from '../utils/joiSchemas';

class CarRoutes {
  public router = Router();

  protected controller: CarController;

  constructor() {
    this.controller = new CarController();
    this.addRoute();
  }

  public addRoute(): void {
    this.router.get('/', this.controller.read);
    this.router.post('/', validateWithJoi(carSchema), this.controller.create);
    this.router.get('/:id', verifyId(), this.controller.readOne);
    this.router.put('/:id', verifyId(), this.controller.update);
    this.router.delete('/:id', verifyId(), this.controller.delete);
  }
}

export default CarRoutes;