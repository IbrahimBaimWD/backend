const db = require("../../models");
const { Op, where } = require("sequelize");
const User = db.User;
const Product = db.Product;
const ProductDiscount = db.Product_Discount;
const ProductCategory = db.Product_Category;
const ProductImage = db.Product_Image;
const ProductStock = db.Product_Stock;

module.exports = {
  products: async (req, res) => {
    try {
      const getProducts = await Product.findAll({
        include: [
          {
            model: ProductImage,
            as: "product_image",
            attributes: ["id", "image"],
          },
          {
            model: ProductCategory,
            as: "product_categorys",
            attributes: ["category"],
          },
          { model: ProductStock, as: "product_stocks", attributes: ["stock"] },
          { model: ProductDiscount, as: "product_discounts" },
        ],
      });
      res.status(200).send({
        result: getProducts,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  createProduct: async (req, res) => {
    const { name, desc, price, weight, category_id, discount_id, stock } =
      req.body;
    try {
      await Product.create(
        {
          name: name,
          desc: desc,
          price: price,
          weight: weight,
          user_id: req.user.id,
          category_id: category_id,
          discount_id: discount_id,
          product_stocks: [{ stock: stock }],
        },
        {
          include: [
            {
              model: ProductCategory,
              as: "product_categorys",
            },
            {
              model: ProductDiscount,
              as: "product_discounts",
            },
            {
              model: ProductStock,
              as: "product_stocks",
            },
          ],
        }
      );
      res.status(201).json({ msg: "Product Created Succses" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const dataProduct = await Product.findOne({
        where: { id },
      });
      if (!dataProduct) return res.status(404).send({ msg: "Data Not Found" });
      const { name, desc, price, weight } = req.body;
      await Product.update(
        {
          name: name || dataProduct.name,
          desc: desc || dataProduct.desc,
          price: price || dataProduct.price,
          weight: weight || dataProduct.weight,
        },
        { where: { id } }
      );
      res.status(200).json({ msg: "Product Update Succses" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  uploadProduct: async (req, res) => {
    try {
      let fileUploaded = req.file;

      await ProductImage.create(
        {
          image: `/products/${fileUploaded.filename}`,
          product_id: req.params.id,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(201).send({
        status: "Success",
        message: "Success upload product image",
      });
    } catch (error) {
      res.status(400).send(error);
      console.log(error);
    }
  },
};
