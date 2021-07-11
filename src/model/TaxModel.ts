const mongoose = window.require('mongoose');
const { Schema } = mongoose;

const taxSchema = new Schema({
  reference: { type: String, unique: true, required: true, dropDups: true },
  percentage: { type: Number, required: true },
});

const Tax = mongoose.model('Tax', taxSchema, 'taxes');

export { taxSchema, Tax };
