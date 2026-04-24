// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name:      { type: String, required: true },
//   email:     { type: String, required: true, unique: true, lowercase: true },
//   password:  { type: String, required: true },
//   isPaid:    { type: Boolean, default: false },
//   isAdmin:   { type: Boolean, default: false },
//   paymentId: String,
//   orderId:   String,
//   paidAt:    Date
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  token:   { type: String },
  ip:      { type: String, default: 'Unknown' },
  device:  { type: String, default: 'Unknown' },
  loginAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  mobile:    { type: String, default: '' },
  password:  { type: String, required: true },
  isPaid:    { type: Boolean, default: false },
  isAdmin:   { type: Boolean, default: false },
  paymentId: { type: String },
  orderId:   { type: String },
  paidAt:    { type: Date },
  sessions:  { type: [sessionSchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
