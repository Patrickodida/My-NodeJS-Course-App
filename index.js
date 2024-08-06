import express from "express";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";
import session from "express-session";

const app = express();
const __dirname = path.resolve();
// Hardcoded password for Authentication
const PASSWORD = "passw@rd";

// Middleware to log requests
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

// Use session Middleware
app.use(
  session({
    secret: "passw@rd",
    resave: false,
    saveUninitialized: false,
  })
);

// Middleware to check whether the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.redirect("/login");
  }
}

// Routes

app.get(
  "/",
  (req, res) => {
    res.send("Welcome to this server application");
  })
;

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Set the 'req.session.isAuthenticated' to true upon successful login
app.post("/login", (req, res) => {
  const { password } = req.body;
  if (password === PASSWORD) {
    req.session.isAuthenticated = true;
    res.redirect("/node-course");
  } else {
    res.send("Invalid Password. Please try again!");
  }
});

// Protect the '/node-course' route for only Authenticated users
app.get("/node-course", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "node-course.html"));
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
