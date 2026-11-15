const mongoose = require('mongoose');

const networkNodeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    type: { type: String, enum: ['CORE', 'TOWER', 'ROUTER'], default: 'TOWER' },
    city: { type: String, trim: true },
    capacity: { type: Number, required: true, min: 1 }, // max devices it can serve
    status: { type: String, enum: ['ACTIVE', 'INACTIVE', 'MAINTENANCE'], default: 'ACTIVE' },
    connectedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NetworkNode' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('NetworkNode', networkNodeSchema);