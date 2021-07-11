const mongoose = window.require('mongoose');
const { Schema } = mongoose;

const unitTypeSchema = new Schema({
  reference: { type: String, unique: true, required: true, dropDups: true },
  unit: { type: String, required: true },
});

const UnitType = mongoose.model('UnitType', unitTypeSchema, 'unitTypes');

export { unitTypeSchema, UnitType };
