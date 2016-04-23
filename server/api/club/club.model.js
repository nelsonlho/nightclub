'use strict';

import mongoose from 'mongoose';

var ClubSchema = new mongoose.Schema({
  id: String,
  info: String,
  active: Boolean,
  usersJoining : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  }]
});

export default mongoose.model('Club', ClubSchema);
