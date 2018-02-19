// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ProjectSchema = new Schema({
   created: {
      type: Date,
      default: Date.now
   },
   title: {
      type: String,
      default: '',
      trim: true,
      required: 'O título deve ser preenchido!'
   },
   description: {
      type: String,
      default: '',
      trim: true
   },
   creator: {
      type: Schema.ObjectId,
      ref: 'User'
   },
   deadline: {
      type: Date,
      default: Date.now
   },
   status: {
      type: String,
      default: 'Em andamento'
   }
});

mongoose.model('Project', ProjectSchema);
