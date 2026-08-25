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
  name:          { type: String, required: true, trim: true },
  email:         { type: String, required: true, unique: true, lowercase: true, trim: true },
  mobile:        { type: String, default: '' },
  referredBy:    { type: String, default: '', trim: true },
  password:      { type: String, required: true },
  isPaid:        { type: Boolean, default: false },
  isAdmin:       { type: Boolean, default: false },
  paymentId:     { type: String },
  orderId:       { type: String },
  paidAt:        { type: Date },
  sessions:      { type: [sessionSchema], default: [] },
  sessionVersion: { type: Number, default: 0 },
  // Single-device login enforcement — jo bhi naya login hota hai uska sessionId yahan set hota hai,
  // aur purana koi bhi token (kisi bhi device/IP se) turant invalid ho jata hai. IP/device pe depend
  // nahi karta — isliye campus WiFi/hostel jaisi shared-IP situations mein galat false-positive nahi aata.
  activeSessionId: { type: String, default: null },
  hasTestAccess: { type: Boolean, default: false },
  feedbackGiven: { type: Boolean, default: false },
  termsAcceptedAt: { type: Date, default: null },
  masterDsaAccess: { type: Boolean, default: false },
  selectedPlan:    { type: String, enum: ['99', '199', '299', '1000'], default: '99' },
 resume49:        { type: Boolean, default: false },
  resume99:        { type: Boolean, default: false },
  resume150:       { type: Boolean, default: false },
  resumeAnalysisUsed: { type: Boolean, default: false },
  
}, { timestamps: true });

// Admin panel ki analytics queries (Overview, Revenue, Signups History waghera) bahut
// baar isPaid / masterDsaAccess / createdAt pe filter karti hain — index ke bina har
// query poori collection scan karti thi. Isse queries kaafi fast ho jayengi.
userSchema.index({ isPaid: 1 });
userSchema.index({ masterDsaAccess: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ isPaid: 1, masterDsaAccess: 1 }); // "both access" wale count ke liye combo




module.exports = mongoose.model('User', userSchema);
