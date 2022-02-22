const Order = require("../models/order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE order
router.post("/", verifyToken, async (req, res) => {
  const order = new Order(req.body);
  try {
    const neworder = await order.save();
    res.status(200).json(neworder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE order
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedorder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedorder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE order
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER Order
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL orderS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get monthly income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastmonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousmonth = new Date(new Date().setMonth(lastmonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      { $match: { $gte: previousmonth } },
      {
        $project: {
          $month: { $month: "$createdAt" },
          $sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: "$sales",
        },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
