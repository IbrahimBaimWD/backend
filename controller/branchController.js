const db = require("../models");
const Profile = db.Profile;
const Addresses = db.Addresses;
const Branch = db.Branch;
const User = db.User;

module.exports = {
  getBranchs: async (req, res) => {
    try {
      const response = await Branch.findAll({
        include: [
          {
            model: User,
            as: "users",
            attributes: ["isAdmin", "email"],
            include: [
              {
                model: Profile,
                as: "profile",
                attributes: {
                  exclude: [
                    "userId",
                    "addressId",
                    "image",
                    "createdAt",
                    "updatedAt",
                  ],
                },
                include: [
                  {
                    model: Addresses,
                    as: "addresses",
                    attributes: {
                      exclude: ["profileId", "createdAt", "updatedAt"],
                    },
                    where: { activated: true },
                  },
                ],
              },
            ],
          },
        ],
      });
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getBranch: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await Branch.findOne({
        where: { id: id },
      });
      if (!response)
        return res.status(404).send({ msg: "Data tidak ditemukan" });
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  },
  //   deleteAddress: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       const response = await addresses.destroy({
  //         where: { id: id },
  //       });
  //       if (!response)
  //         return res.status(404).send({ msg: "Data tidak ditemukan" });
  //       res.status(200).send({ msg: "Delete Behasil" });
  //     } catch (error) {
  //       res.status(500).send({ msg: error.message });
  //     }
  //   },
  createBranch: async (req, res) => {
    const { name, user_id } = req.body;
    try {
      await Branch.create({
        name: name,
        user_id: user_id,
      });
      res.status(201).json({ msg: "Branch Created Berhasil" });
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
      res.status(200).send({
        msg: `update Activated Addresses dengan id Profile ${profileId} & id Addresses ${addressesId} berhasil`,
      });
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  },
};
