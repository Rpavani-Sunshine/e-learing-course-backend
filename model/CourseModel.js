const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      index: true,
    },
    level: {
      type: String,
      index: true,
    },
    createdAt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const CourseModel = mongoose.model("Course", courseSchema);

module.exports = CourseModel;
