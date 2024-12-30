import Todo from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required!" });
    }

    const todo = await Todo({ title, description });
    await todo.save();

    return res.status(201).json({
      success: true,
      message: "Todo created successfully!",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
