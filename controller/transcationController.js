const db = require("../models");
const task = db.Task;
const user = db.User;

module.exports = {
  getTasks: async (req, res) => {
    try {
      const response = await task.findAll({
        attributes: ["id", "title", "userId"],
        include: [
          {
            model: user,
            attributes: ["email", "isAdmin"],
          },
        ],
      });
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getTask: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await task.findOne({
        where: { id: id },
        attributes: ["id", "title", "userId"],
        include: [
          {
            model: user,
            attributes: ["email", "isAdmin"],
          },
        ],
      });
      if (!response)
        return res.status(404).send({ msg: "Data tidak ditemukan" });
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  },
  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await task.destroy({
        where: { id: id },
      });
      if (!response)
        return res.status(404).send({ msg: "Data tidak ditemukan" });
      res.status(200).send({ msg: "Delete Behasil" });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  },
  createTask: async (req, res) => {
    const { title, userId } = req.body;
    try {
      await task.create({
        title: title,
        userId: userId,
      });
      res.status(201).json({ msg: "Task Created Berhasil" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  updateTask: async (req, res) => {
    try {
      const { id } = req.params;
      const tasks = await task.findOne({
        where: { id: id },
      });
      if (!task) return res.status(404).send({ msg: "Data tidak ditemukan" });
      const { title, userId } = req.body;
      const respons = await task.update(
        { title, userId },
        {
          where: {
            id: tasks.id,
          },
        }
      );
      res.status(200).send({ msg: "Update Behasil" });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  },
};
