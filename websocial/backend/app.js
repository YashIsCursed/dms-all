import express from "npm:express@^4.21.1";
import dotenv from "npm:dotenv";
dotenv.config();

const users = [
  {
    "Name": "Yash",
    "Password": "Yash@123",
    "age": 16,
  },
  {
    "Name": "Alice",
    "Password": "SecurePassword1",
    "age": 25,
  },
  {
    "Name": "Bob",
    "Password": "MySecretPass",
    "age": 32,
  },
  {
    "Name": "Carol",
    "Password": "Carol'sPassword",
    "age": 28,
  },
  {
    "Name": "David",
    "Password": "David123!",
    "age": 45,
  },
  {
    "Name": "Eve",
    "Password": "EvePasswordSecure",
    "age": 22,
  },
  {
    "Name": "Frank",
    "Password": "Frank'sSecret",
    "age": 51,
  },
  {
    "Name": "Grace",
    "Password": "GracefulPassword",
    "age": 30,
  },
  {
    "Name": "Henry",
    "Password": "HenryStrongPass",
    "age": 27,
  },
  {
    "Name": "Ivy",
    "Password": "IvySecurePassword",
    "age": 29,
  },
];
const app = express();

app.use(express.json());
app.get("/api/user", (req, res) => {
  res.send(users);
});
app.post("/api/user", (req, res) => {
  console.log(req.body);
  users.push(req.body);
  return res.status(201).send(users);
});
app.get("/:name",(req,res)=>{
  const requestedNameLower = req.params.name.toLowerCase(); // Lowercase the requested name

  const user = users.find(user => user.Name.toLowerCase() === requestedNameLower);
  if (user) {
    res.cookie(user.Name,user.Password,{ maxAge: 5000})
    res.status(201).send("hello " + user.Name)
  } else {
    res.status(404).send("User not found");
  }

})

app.listen(5000, () => {
  console.log("Started localhost:5000");
});
