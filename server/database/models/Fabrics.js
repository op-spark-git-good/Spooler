const { model } = require('mongoose');

const FabricsSchema = {
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  quantity: { type: Number },
  color: { type: String },
  weave: { type: String },
  brand: { type: String },
  origin: { type: String },

}

const Fabrics = model('Fabric', new mongoose.Schema(FabricsSchema));

module.exports = {
  Fabrics,
}