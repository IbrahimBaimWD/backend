const db = require("../../../models");
const ProductCategory = db.Product_Category;

module.exports = {
  categories: async (req, res) => {
    try {
      const getCategories = await ProductCategory.findAll({
        attributes: ["id", "category"],
      });
      res.status(200).send({
        result: getCategories,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  createCategories: async (req, res) => {
    const { category } = req.body;
    try {
      await ProductCategory.create({
        category: category,
      });
      res.status(201).json({ msg: "Product Categorty Created Success" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deleteCategories: async (req, res) => {
    const { id } = req.params;
    try {
      const response = await ProductCategory.destroy({
        where: { id: id },
      });
      if (!response) return res.status(404).send({ msg: "Data not Found" });
      res.status(200).send({ msg: "Delete success" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  updateCategories: async (req, res) => {
    try {
      const { id } = req.params;
      const categories = await ProductCategory.findOne({
        where: { id: id },
      });
      if (!categories) return res.status(404).send({ msg: "Data Not Found" });
      const { category } = req.body;
      await ProductCategory.update(
        { category },
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
