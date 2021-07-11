const mongoose = window.require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  reference: { type: String, unique: true, required: true, dropDups: true },
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: 'Category' },
});

const Category = mongoose.model('Category', categorySchema, 'categories');

export { categorySchema, Category };
