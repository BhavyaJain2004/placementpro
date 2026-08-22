const mongoose = require('mongoose');

// Ek hi document rehta hai is collection mein (key: 'security') — chhoti si settings/config storage.
// Purpose: "Force Logout Everyone" kab last chalaya gaya, yeh yaad rakhna — taaki Security tab ki
// detection lists us time ke baad ka hi data dikhayein (purana data delete nahi hota, DB mein safe
// rehta hai, bas view se filter ho jata hai jab tak fresh logins na aa jayein).
const systemConfigSchema = new mongoose.Schema({
  key:               { type: String, required: true, unique: true },
  lastForceLogoutAt: { type: Date, default: null }
});

module.exports = mongoose.model('SystemConfig', systemConfigSchema);
