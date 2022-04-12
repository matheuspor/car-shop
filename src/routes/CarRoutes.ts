import { Router } from 'express';
import CarController from '../controllers/Car';
import carSchema from '../utils/joiSchemas';
import validateWithJoi from '../utils/validateWithJoi';

class CarRoutes {
  public router = Router();

  protected controller: CarController;

  protected validate: typeof validateWithJoi;

  constructor() {
    this.controller = new CarController();
    this.addRoute();
    this.validate = validateWithJoi;
  }

  public addRoute(): void {
    const route = '/cars';
    this.router.get(route, this.controller.read);
    this.router.get(`${route}/:id`, this.controller.readOne);
    this.router.post(route, this.controller.create);
    this.router.put(`${route}/:id`, this.controller.update);
    this.router.delete(`${route}/:id`, this.controller.delete);
  }
}

export default CarRoutes;