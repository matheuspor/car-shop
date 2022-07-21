import Controller from '.';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MotorcycleService from '../services/MotorcycleService';

class MotorcycleController extends Controller<Motorcycle> {
  constructor(
    service = new MotorcycleService(),
  ) {
    super(service);
  }
}

export default MotorcycleController;