const { literal } = require("sequelize");
const db = require("../models");
const addresses = db.Addresses;
const profile = db.Profile;
const user = db.User;

module.exports = {
  getAddresses: async (req, res) => {
    try {
      const response = await addresses.findAll();
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getAddress: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await addresses.findOne({
        where: { id: id },
      });
      if (!response)
        return res.status(404).send({ msg: "Data tidak ditemukan" });
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  },
  deleteAddress: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await addresses.destroy({
        where: { id: id },
      });
      if (!response)
        return res.status(404).send({ msg: "Data tidak ditemukan" });
      res.status(200).send({ msg: "Delete Behasil" });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  },
  createAddress: async (req, res) => {
    const {
      address,
      province,
      district,
      subDistrict,
      urbanVillage,
      postalCode,
      profileId,
    } = req.body;
    try {
      await addresses.create({
        address,
        province,
        district,
        subDistrict,
        urbanVillage,
        postalCode,
        profileId,
      });
      res.status(201).json({ msg: "Addresses Created Berhasil" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  updateAddresses: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await addresses.findOne({
        where: { id: id },
      });
      if (!response)
        return res.status(404).send({ msg: "Data tidak ditemukan" });
      const {
        address,
        province,
        district,
        subDistrict,
        urbanVillage,
        postalCode,
        profileId,
        activated,
      } = req.body;
      await addresses.update(
        {
          address,
          province,
          district,
          subDistrict,
          urbanVillage,
          postalCode,
          profileId,
          activated,
        },
        {
          where: {
            id: response.id,
          },
        }
      );
      res.status(200).send({ msg: "Update Behasil" });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  },
  updateAddressesActivated: async (req, res) => {
    try {
      const { profileId, addressesId } = req.params;

      const response = await profile.findAll({
        where: { id: profileId },
        attributes: ["firstname"],
        include: [
          {
            model: addresses,
            as: "addresses",
            attributes: ["id"],
          },
        ],
      });
      const dataResponse = JSON.stringify(response);
      const data = JSON.parse(dataResponse);
      const dataId = [];
      for (const iterator of data[0].addresses) {
        dataId.push(iterator.id);
      }
      console.log("dataaaaaaaaaa", dataId);
      await addresses.update(
        {
          activated: false,
        },
        { where: { id: dataId, activated: true } }
      );
      await addresses.update(
        {
          activated: true,
        },
        { where: { id: addressesId } }
      );
      res
        .status(200)
        .send({
          msg: `update Activated Addresses dengan id Profile ${profileId} & id Addresses ${addressesId} berhasil`,
        });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  },
};
