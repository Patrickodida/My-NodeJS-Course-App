import express from "express";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";

const app = express();
const __dirname = path.resolve();
// Hardcoded password for Authentication
const PASSWORD = "passw@rd";

// Middleware to log requests
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: false}));

// Routes

app.get(
  ("/",
  (req, res) => {
    res.send("Welcome to this server application");
  })
);

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
})

app.post('/login', (req, res) => {
  const { password } = req.body;
  if(password === PASSWORD){
    res.redirect('/node-course.html')
  } else {
    res.send('Invalid Password. Please try again!')
  }
})

app.get('node-course', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'node-course.html'))
})

app.use((req, res, next) => {
  if(req.url === 'node-course'){
    res.redirect('/login')
  } else {
    next()
  }
})

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
