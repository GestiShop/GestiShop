import { Schema, model } from 'mongoose';

const unitTypeSchema = new Schema({
  reference: { type: String, unique: true, required: true, dropDups: true },
  unit: { type: String, required: true },
});

const UnitType = model('UnitType', unitTypeSchema, 'unitTypes');

export { unitTypeSchema, UnitType };
