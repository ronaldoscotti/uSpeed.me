// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var TaskSchema = new Schema({
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
   designated: {
      type: Schema.ObjectId,
      ref: 'User'
   },
   project: {
      type: Schema.ObjectId,
      ref: 'Project'
   },
   status: {
      type: String,
      default: 'Por fazer'
   },
   being: {
      type: String,
      default: '',
      trim: true
   },
   iCan: {
      type: String,
      default: '',
      trim: true
   },
   soThat: {
      type: String,
      default: '',
      trim: true
   }
});

mongoose.model('Task', TaskSchema);
