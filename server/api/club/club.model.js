'use strict';

import mongoose from 'mongoose';

var ClubSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Club', ClubSchema);
