const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    // TODO: Use Mongoose's ObjectId data type, Default value is set to a new ObjectId
    reactionID: { type: String, required: true },
    reactionBody: { type: String, required: true, max: 280 },
    // TODO: createdAt
    username: { type: String, required: true},
    // TODO: Date - Set default value to the current timestamp, Use a getter method to format the timestamp on query
    date: { type: Date, default: Date.now },
  },
  // TODO: virtual: true
  );

const thoughtSchema = new mongoose.Schema({
    // TODO: createdAt
  thoughtText: { type: String, required: true, min: 1, max: 280 },
  date: {},
    // String required, reactions are like replies
  username: { type: String, required: true}, // TODO:Array of _id values referencing the Thought model
  reactions: [reactionSchema], // TODO: // Array of nested documents created with the reactionSchema
  lastAccessed: { type: Date, default: Date.now },
});

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').
  get(function() { return this.reactions.length; }).
  set(function(v) {
    this.set( this.reactions.length );
  });

const Thought = mongoose.model('Thought', thoughtSchema);


// Schema Settings:

// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

ß
module.exports = Thought;
