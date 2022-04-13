import { Schema, model as createModel, Document } from 'mongoose';
import MongoModel from '.';
import { Car } from '../interfaces/CarInterface';

interface CarDocument extends Car, Document { }

const carSchema = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  seatsQty: Number,
  doorsQty: Number,
}, { versionKey: false });

class CarModel extends MongoModel<Car> {
  constructor(public model = createModel('Cars', carSchema)) {
    super(model);
  }
}

export default CarModel;