import { Schema, model as createModel, Document } from 'mongoose';
import MongoModel from '.';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

interface MotorcycleDocument extends Motorcycle, Document { }

const MotorcycleSchema = new Schema<MotorcycleDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

class MotorcycleModel extends MongoModel<Motorcycle> {
  constructor(public model = createModel('Motorcycles', MotorcycleSchema)) {
    super(model);
  }
}

export default MotorcycleModel;