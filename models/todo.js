import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

const TodoModel = mongoose.model("Todo", todoSchema);

export default TodoModel;
