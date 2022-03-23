const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
  {
    uid: { type: String, required: [true, 'Please enter an id'] },
    submittedBy: {
      type: String,
      required: [true, 'Please enter a name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
    },
    assignedTo: {
      type: String,
      required: [true, 'Please enter a name'],
    },
    ticketId: {
      type: Number,
      required: [true, 'Please enter a ticket id'],
    },
    title: {
      type: String,
      required: [true, 'Please enter a title'],
    },
    summary: {
      type: String,
      required: [true, 'Please enter a summary'],
    },
    priority: {
      type: String,
      required: [true, 'Please enter a priority'],
    },
    dueDate: {
      type: Date,
      required: [true, 'Please enter a date'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('ticket', ticketSchema);
