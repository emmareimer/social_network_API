const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // TODO: string, unique, required, trimmed
  username: { type: String, required: true },
  // TODO: string, unique, required, valid email
  email: { type: String, required: true },
  thoughts: [], // TODO:Array of _id values referencing the Thought model
  friends: [], // TODO: Array of _id values referencing the User model (self-reference)
  lastAccessed: { type: Date, default: Date.now },
});

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').
  get(function() { return this.friends.length; }).
  set(function(v) {
    this.set( this.friends.length );
  });

const User = mongoose.model('User', userSchema);


module.exports = User;
