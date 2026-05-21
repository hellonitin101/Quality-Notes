const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true
    },

    studentEmail: {
      type: String,
      required: true
    },

    course: {
      type: String,
      required: true
    },

    subject: {
      type: String,
      required: true
    },

    syllabus: {
      type: String,
      required: true
    },

    notesType: {
      type: String,
      required: true
    },

    language: {
      type: String,
      required: true
    },

    deadline: {
      type: String,
      required: true
    },

    extraInfo: {
      type: String
    },

    price: {
      type: Number,
      required: true
    },

    paymentStatus: {
      type: String,
      default: "Pending"
    },

    status: {
      type: String,
      default: "Pending"
    },

    pdf: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Request", requestSchema);