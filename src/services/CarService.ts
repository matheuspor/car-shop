import { Car } from '../interfaces/CarInterface';
import Service from '.';
import CarModel from '../models/Car';

class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (obj: Car): Promise<Car | null> => {
    const car = await this.model.create(obj);
    return car;
  };

  // public async update(id: string, obj: Lens): 
  // Promise<Lens | null | ServiceError> {
  //   const parsed = lensSchema.safeParse(obj);
  //   if (!parsed.success) return { error: parsed.error };
  //   return this.model.update(id, obj);
  // }
}

export default CarService;