const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    serialNumber: { type: String, required: true, unique: true, uppercase: true, trim: true },
    type: { type: String, enum: ['PHONE', 'ROUTER', 'IOT', 'LAPTOP'], default: 'PHONE' },
    node: { type: mongoose.Schema.Types.ObjectId, ref: 'NetworkNode', default: null, index: true },
    status: { type: String, enum: ['ONLINE', 'OFFLINE', 'FAULTY'], default: 'OFFLINE' },
    lastSeenAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Device', deviceSchema);