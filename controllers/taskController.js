const Task = require("../models/Task");
const Notification = require("../models/Notification");

const createTask = async (req, res) => {
  try {
    const { users = [], ...rest } = req.body;

    if (!users.includes(req.user.id)) users.push(req.user.id);

    const task = await Task.create({
      ...rest,
      users,
    });

    const otherUsers = users.filter((id) => id != req.user.id);
    await Notification.insertMany(
      otherUsers.map((userId) => ({
        recipient: userId,
        message: `A new shared task "${task.title}" was created.`,
      }))
    );

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const {
      priority,
      completed,
      sortBy = "createdAt",
      order = "desc",
      search,
    } = req.query;

    const filter = { users: req.user.id };

    if (priority) filter.priority = priority;
    if (completed !== undefined) filter.completed = completed === "true";
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const sortOption = {};
    sortOption[sortBy] = order === "asc" ? 1 : -1;

    const tasks = await Task.find(filter).sort(sortOption);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      users: req.user.id,
    });

    const otherUsers = task.users.filter((id) => id.toString() !== req.user.id);
    await Notification.insertMany(
      otherUsers.map((userId) => ({
        recipient: userId,
        message: `The task "${task.title}" was deleted.`,
      }))
    );

    if (!task)
      return res.status(404).json({ error: "Task not found or unauthorized" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, users: req.user.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    const otherUsers = task.users.filter((id) => id.toString() !== req.user.id);
    await Notification.insertMany(
      otherUsers.map((userId) => ({
        recipient: userId,
        message: `The task "${task.title}" was updated.`,
      }))
    );
    if (!task)
      return res.status(404).json({ error: "Task not found or unauthorized" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
};
