import Service from '.';
import MotorcycleModel from '../models/Motorcycle';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

class MotorcycleService extends Service<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }
}

export default MotorcycleService;