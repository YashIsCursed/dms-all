import express from "express";
import dotenv from "dotenv";
import {
  SelectUsers,
  SelectPosts,
  SelectComments,
  SelectLikes,
  SelectConnection,
  SelectUser,
  getPostById
} from "./.database/db.mjs";
dotenv.config();

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {

  const [result] = await SelectUsers();
  res.send(result);

})


app.get("/:name", async (req, res) => {

  const requestedNameLower = req.params.name.toLowerCase(); // Lowercase the requested name

  const [users] = await SelectUsers();

  const user = users.find(user => user.username.toLowerCase() === requestedNameLower);
  if (user) {
    res.cookie(user.username, user.password_hash, { maxAge: 5000 })
    res.status(201).send(user)
  } else {
    res.status(404).send("User not found");
  }

})
app.get("/:username/posts/:post_id", async (req, res) => {
  const requestedUsername = req.params.username.toLowerCase();
  const postId = parseInt(req.params.post_id);


  if (isNaN(postId)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  try {

    const user = await getUserByUsername(requestedUsername);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }


    const post = await getPostById(postId, user.user_id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }


    const response = {
      user: { username: user.username, user_id: user.user_id /* ...other user details */ },
      post,

    };


    res.json(response);


  } catch (error) {
    console.error('Error fetching user and post:', error);
    res.status(500).json({ error: 'Failed to retrieve user and post' });
  }
});

app.listen(5000, () => {

  console.log("Startserver at  localhost:5000");

});
