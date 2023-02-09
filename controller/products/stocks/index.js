const db = require("../../../models");
const product = require("../../../models/product");
const ProductStock = db.Product_Stock;

module.exports = {
  stock: async (req, res) => {
    try {
      const getStock = await ProductStock.findAll({
        attributes: ["id", "stock", "product_id"],
      });
      res.status(200).send({
        result: getStock,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  updateStock: async (req, res) => {
    try {
      const { id } = req.params;
      const stocks = await ProductStock.findOne({
        where: { id: id },
      });
      if (!stocks) return res.status(404).send({ msg: "Data Not Found" });
      const { stock } = req.body;
      await ProductStock.update(
        { stock },
        {
          where: {
            id: stocks.id,
          },
        }
      );
      res.status(200).send({ msg: "Update Success" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};
