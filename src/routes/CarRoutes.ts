import { Router } from 'express';
import CarController from '../controllers/Car';
import carSchema from '../utils/joiSchemas';
import validateWithJoi from '../utils/validateWithJoi';

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
    this.router.get('/:id', this.controller.readOne);
    this.router.put('/:id', this.controller.update);
    this.router.delete('/:id', this.controller.delete);
  }
}

export default CarRoutes;