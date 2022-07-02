const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: {
      type: String,
      enum: [
        "SW General",
        "React JS",
        "Node JS",
        "Javascript",
        "Python",
        "C++",
        "others",
      ],
      default: "others",
    },
    title: {
      type: String,
      required: [true, "Please enter a title of the content"],
    },
    contentState: {
      type: String,
      required: [true, "Please enter a blogData of the content"],
    },
    status: {
      type: String,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
