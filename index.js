import express from "express";
import morgan from "morgan";
const app = express();
// Middleware to log requests
app.use(morgan("dev"));

// Hardcoded password for Authentication
const PASSWORD = "passw@rd";

app.get(
  ("/",
  (req, res) => {
    res.send("Welcome to this server application");
  })
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
