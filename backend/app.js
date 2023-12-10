var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var session = require("express-session");
var express = require("express");
var cookieParser = require("cookie-parser");
var createError = require("http-errors");
var path = require("path");
var User = require("./models/users");
var ThemeModel = require("./models/themes");
var ItemModel = require("./models/items");
var OrdersModel = require("./models/orders");
var app = express();
var PORT = 8000;
let cors = require("cors");
const { emit } = require("process");
var error;
var message = "";

app.use(cors());
app.use(cookieParser());
mongoose
  .connect(
    "mongodb+srv://venkat:Venkat1708@cluster0.dp7vavc.mongodb.net/wplproject",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { name, username, phone, address, password } = req.body;
  console.log(name, username, phone, address, password);
  const user = new User({ name, username, phone, address, admin: "0" });
  User.register(new User(user), password.toString(), (err) => {
    if (err) {
      console.log(err.message);
      return res.status(409).json({ error: err });
    }
    return res.status(200).json({ user: user });
  });
});

app.get("/themes", async (req, res) => {
  try {
    const themes = await ThemeModel.find({});
    const themes_ = themes.map((theme) => ({
      id: theme._id,
      title: theme.Theme_Name,
      image: theme.Theme_Image_Url,
    }));

    return res.status(200).json(themes_);
  } catch (error) {
    console.error("Error fetching themes:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/themes/:title", async (req, res) => {
  console.log("I am here");
  const title = req.params.title;
  try {
    const theme = await ThemeModel.findOne({ Theme_Name: title });
    const items = await ItemModel.find({ Theme_ID: theme._id });
    console.log(items);
    return res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching Items:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/signin", function (req, res, next) {
  console.log("Backend", req.body);
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log("User not Signed In");
      return res.status(401).json({ error: "Invalid Username or Password" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      console.log("User Signed In");
      return res.status(200).json({ user, message: "Successfully Signed In" });
    });
  })(req, res, next);
});

app.get("/allproducts", async (req, res) => {
  try {
    const items = await ItemModel.find({});
    console.log(items);
    return res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching Items:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/inventory", async (req, res) => {
  const newItem = req.body;
  const items = await ItemModel.updateOne(
    { _id: newItem._id },
    {
      $set: {
        Item_Name: newItem.Item_Name,
        Item_Price: newItem.Item_Price,
        Item_Qty: newItem.Item_Qty,
      },
    }
  );
  items.modifiedCount == 1
    ? res.status(200)
    : res.status(500).json({ error: "Item not updated" });

  return res.status(200);
});

app.post("/addNewItem", async (req, res) => {
  const { itemName, itemDesc, imgUrl, itemQuant, Theme } = req.body;
  const category = req.body.Theme;
  const itemPrice = req.body.price;
  const theme = await ThemeModel.findOne({ Theme_Name: Theme });
  const item = new ItemModel({
    Item_Name: itemName,
    Item_Qty: itemQuant,
    Item_Price: itemPrice,
    Description: itemDesc,
    Item_Category: Theme,
    Item_Image_Url: imgUrl,
    Theme_ID: theme._id,
  });
  const insertItem = await ItemModel.insertMany([item]);
  insertItem ? res.send(200) : res.send(500).json({ error: "Item not added" });
});

app.delete("/inventory", async (req, res) => {
  const newItem = req.body;
  const items = await ItemModel.deleteOne({ _id: newItem._id });

  items.deletedCount == 1
    ? res.status(200)
    : res.status(500).json({ error: "Item not deleted" });
});

app.post("/checkout", async (req, res) => {
  const productsOrdered = req.body;
  for (const orderItem of productsOrdered) {
    const item = await ItemModel.findById(orderItem.id);
    if (item.Item_Qty - orderItem.quantity < 0) {
      return res.status(400).json({
        error: `Insufficient stock for ${orderItem.name}, only ${item.Item_Qty} in stock. `,
      });
    }
  }
  const orderDetailsArray = [];

for (const orderItem of productsOrdered) {
  const item = await ItemModel.findById(orderItem.id);

  await ItemModel.updateOne(
    { _id: orderItem.id },
    {
      $set: {
        Item_Qty: item.Item_Qty - orderItem.quantity,
      },
    }
  );

  const orderDetails = {
    product_id: orderItem.id,
    product_name: orderItem.name,
    product_price: orderItem.price,
    quantity: orderItem.quantity,
    // Add other relevant details here
  };

  orderDetailsArray.push(orderDetails);
}
// Insert order details into OrdersModel
const order = await OrdersModel.create({ Order_details: orderDetailsArray });

res.json({ orderId: order._id, orderDesc: order.Order_details });
});

app.get("/orderDetails/:id", async (req, res) => {
  const order = await OrdersModel.findOne({_id: req.params.id})
  console.log("get call");
  console.log(order);
  const orderDesc = order.Order_details.map((orderItem) => ({
    id: orderItem.product_id,
    product_name: orderItem.product_name,
    price: orderItem.product_price,
    quantity: orderItem.quantity
  }));

  return res.json(orderDesc);
});


app.use(function (err, req, res, next) {
  if (err.status === 401) {
    res.status(401).render("error", { error: err.message });
  } else {
    next(err);
  }
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  // res.render("error", { error: err.message });
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, function () {
  console.log("Server is listening to" + PORT);
});
