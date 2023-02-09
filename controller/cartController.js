const db = require("../models");
const { Op } = require("sequelize");
const User = db.User;
const Product = db.Product;
const Cart = db.Cart;
const ProductCart = db.Product_Cart;
const ProductImage = db.Product_Image;
const ProductWarehouses = db.Product_Warehouses;
const Sequelize = require("sequelize");

module.exports = {
  createCart: async (req, res) => {
    const { quantity, price, product_id } = req.body;
    try {
      const cart = await Cart.findOne({
        where: {
          user_id: req.user.id,
        },
      });
      const product = await Product.findOne({
        where: {
          id: product_id,
        },
      });
      if (!cart) {
        const data = await Cart.create({
          user_id: req.user.id,
        });
        await ProductCart.create({
          quantity: 1,
          price: product.price,
          product_id: product_id,
          cart_id: data.dataValues.id,
        });
      } else {
        await ProductCart.create({
          quantity: 1,
          price: product.price,
          product_id: product_id,
          cart_id: cart.id,
        });
      }
      res.status(201).json({ msg: "suksess add cart" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  listCarts: async (req, res) => {
    try {
      const ProductCarts = await ProductCart.findAll({
        include: [
          {
            model: Product,
            as: "products",
            attributes: ["id", "name", "desc", "price", "weight"],
          },
          {
            model: Cart,
            as: "carts",
            where: {
              user_id: req.user.id,
            },
            include: [
              {
                model: User,
                as: "users",
                attributes: ["id", "email", "isAdmin"],
              },
            ],
          },
        ],
      });
      res
        .status(200)
        .json({ total: ProductCarts.length, result: ProductCarts });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  orderCarts: async (req, res) => {
    try {
      const ProductCarts = await ProductCart.findAll({
        where: { status: true },
        include: [
          {
            model: Product,
            as: "products",
            attributes: ["id", "name", "desc", "price", "weight"],
          },
          {
            model: Cart,
            as: "carts",
            where: {
              user_id: req.user.id,
            },
            include: [
              {
                model: User,
                as: "users",
                attributes: ["id", "email", "isAdmin"],
              },
            ],
          },
        ],
      });
      res
        .status(200)
        .json({ total: ProductCarts.length, result: ProductCarts });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  statusCart: async (req, res) => {
    const { status, id } = req.body;
    try {
      await ProductCart.findAll({
        where: {
          status: status,
        },
      });
      await ProductCart.update(
        { status: status },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(200).json({ msg: "succses update status" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  statusCarts: async (req, res) => {
    const { status, cart_id } = req.body;
    try {
      const dataUpdate = await ProductCart.findAll({
        where: {
          cart_id: cart_id,
          status: !status,
        },
      });
      if (dataUpdate) {
        await ProductCart.update(
          { status: status },
          {
            where: {
              status: !status,
              cart_id: cart_id,
            },
          }
        );
      }
      res.status(200).json({ msg: "succses update status" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deleteCart: async (req, res) => {
    const { id } = req.params;
    try {
      await ProductCart.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({ msg: "succses delete cart" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deleteCarts: async (req, res) => {
    const { cart_id } = req.body;
    try {
      const dataDelete = await ProductCart.findAll({
        where: {
          cart_id: cart_id,
        },
      });
      await ProductCart.destroy({
        where: {
          cart_id: cart_id,
        },
      });
      res.status(200).json({ msg: "succses delete many cart" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};
