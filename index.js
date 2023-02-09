const express = require("express");
const cors = require("cors");
const TaskRoute = require("./routes/taskRoute");
const UserRoute = require("./routes/userRoute");
const ProfileRouter = require("./routes/profileRoute");
const AddressesRouter = require("./routes/adressesRoute");
const ProductRouter = require("./routes/productRoute");
const CartRouter = require("./routes/cartRoute");
const Auth = require("./routes/authRoute");
const Branch = require("./routes/branchRoute");

const app = express();
const path = require("path");
var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Application. This Restfull API" });
});
app.use(Auth);
app.use(UserRoute);
app.use(ProfileRouter);
app.use(AddressesRouter);
app.use(TaskRoute);
app.use(ProductRouter);
app.use(CartRouter);
app.use(Branch);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
