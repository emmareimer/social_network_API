const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, },
  email: { 
    type: String, 
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ], 
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ], 
    lastAccessed: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').
  get(function() { return this.friends.length; }).
  set(function(v) {
    this.set( this.friends.length );
  });

const User = mongoose.model('User', userSchema);


module.exports = User;
