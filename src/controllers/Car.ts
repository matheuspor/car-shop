import Controller from '.';
import { Car } from '../interfaces/CarInterface';
import CarService from '../services/CarService';

class CarController extends Controller<Car> {
  constructor(
    service = new CarService(),
  ) {
    super(service);
  }
}

export default CarController;