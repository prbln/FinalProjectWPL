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

app.get("/", function (req, res) {
  // res.redirect("/login");
});

app.get("/login", function (req, res) {
  if (req.isAuthenticated()) {
    console.log("i am here");
    message = "";
  }
  // res.render("login", { message, error });
});

app.get("/signup", function (req, res) {
  // res.render("signup", { error });
});

app.post("/signup", async (req, res) => {
  const { name, username, phone, address, password } = req.body;
  console.log(name, username, phone, address, password);
  const user = new User({ name, username, phone, address, admin: "0" });
  User.register(new User(user), password.toString(), (err) => {
    if (err) {
      console.log(err.message);
      return res.status(409).json({ error: "User already exists" });
    }
    return res.status(409).json({ user: user });
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

// app.get("/themes/:id",async( req ,res)=>{
//   console.log("I am here")
//   const id= JSON.stringify(req.params.id)
//   console.log(id)
//   try {
//     const items = await ItemModel.find({"Theme_ID": req.params.id});
//     // const themes_= themes.map(theme =>({
//     //       "id": theme._id,
//     //       "title": theme.Theme_Name,
//     //       "image":theme.Theme_Image_Url
//     //     }))
//     console.log(items)
//     return res.status(200).json(items);
//   } catch (error) {
//     console.error("Error fetching Items:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// })
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

// app.use((req, res, next) => {
//   if (req.isAuthenticated()) {
//     req.session.lastActivity = Date.now();
//   }
//   next();
// });

app.get("/welcome", isLoggedIn, function (req, res) {
  const username = req.user.username;
  // res.render("welcome", { username });
});

app.post("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    // res.redirect("/");
  });
});

app.get("/logout", isLoggedIn, function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    // res.redirect("/");
  });
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
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    // message="User is Logged Out, Require Re-Login"
    message = "You are logged out, please login again!!";
    return next();
  } else {
    const err = createError(
      401,
      "You cannot access this page without logging in!!!!"
    );
    next(err);
  }
}

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
