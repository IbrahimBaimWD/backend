const db = require("../../../models");
const ProductDiscount = db.Product_Discount;

module.exports = {
  discount: async (req, res) => {
    try {
      const getDiscount = await ProductDiscount.findAll({
        attributes: ["id", "name", "persentage", "nominal"],
      });
      res.status(200).send({
        result: getDiscount,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  createDiscount: async (req, res) => {
    const { name, persentage, nominal } = req.body;
    try {
      await ProductDiscount.create({
        name: name,
        persentage: persentage || 0,
        nominal: nominal || 0,
        status: false,
      });
      res.status(201).json({ msg: "Product Discount Created Success" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deleteDiscount: async (req, res) => {
    const { id } = req.params;
    try {
      const response = await ProductDiscount.destroy({
        where: { id: id },
      });
      if (!response) return res.status(404).send({ msg: "Data not Found" });
      res.status(200).send({ msg: "Delete success" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  updateDiscount: async (req, res) => {
    try {
      const { id } = req.params;
      const categories = await ProductDiscount.findOne({
        where: { id: id },
      });
      if (!categories) return res.status(404).send({ msg: "Data Not Found" });
      const { name, persentage, nominal, status } = req.body;
      await ProductDiscount.update(
        { name, persentage, nominal, status },
        {
          where: {
            id: categories.id,
          },
        }
      );
      res.status(200).send({ msg: "Update Success" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};
