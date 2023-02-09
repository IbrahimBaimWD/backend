const db = require("../models");
const addresses = db.Addresses;
const profile = db.Profile;
const user = db.User;

module.exports = {
  getProfiles: async (req, res) => {
    try {
      const response = await profile.findAll({
        attributes: { exclude: ["userId"] },
        include: [
          {
            model: addresses,
            as: "addresses",
          },
        ],
        order: [[{ model: addresses, as: "addresses" }, "activated", "DESC"]],
      });
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await profile.findOne({
        where: { id: id },
        attributes: { exclude: ["userId"] },
        include: [
          { model: user, as: "user", attributes: { exclude: ["password"] } },
        ],
      });
      if (!response)
        return res.status(404).send({ msg: "Data tidak ditemukan" });
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  },
  deleteProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await profile.destroy({
        where: { id: id },
      });
      if (!response)
        return res.status(404).send({ msg: "Data tidak ditemukan" });
      res.status(200).send({ msg: "Delete Behasil" });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  },
  createProfile: async (req, res) => {
    const { firstname, lastname, dob } = req.body;
    try {
      await profile.create({
        firstname: firstname,
        lastname: lastname,
        dob: dob,
        userId: req.user.id,
      });
      res.status(201).json({ msg: "Profile Created Berhasil" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const profiles = await profile.findOne({
        where: { id: id },
      });
      if (!profiles)
        return res.status(404).send({ msg: "Data tidak ditemukan" });
      const { firstname, lastname, dob } = req.body;
      await profile.update(
        {
          firstname: firstname,
          lastname: lastname,
          dob: dob,
          userId: req.user.id,
        },
        {
          where: {
            id: profiles.id,
          },
        }
      );
      res.status(200).send({ msg: "Update Behasil" });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  },
};
