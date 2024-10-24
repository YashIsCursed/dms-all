import express from "express";
import dotenv from "dotenv";
import {
  getPostById,
  SelectComments,
  SelectConnection,
  SelectLikes,
  SelectPosts,
  SelectUserByUid,
  SelectUserByUName,
  SelectUsers,
  countPostsOfUsers,
  countFriends,
  InsertUser,

} from "./.database/db.mjs";
dotenv.config();

const app = express();

app.use(express.json());

//Get Every Data 
app.get("/", async (req, res) => {
  const [allUsers] = await SelectUsers();
  const [allPosts] = await SelectPosts();
  const [allComments] = await SelectComments();
  const [allLikes] = await SelectLikes();
  const [allConnections] = await SelectConnection();
  const result = {
    users: allUsers,
    posts: allPosts,
    comments: allComments,
    likes: allLikes,
    connections: allConnections,
  };
  res.send(result);
});

//Get All Posts
app.get("/posts", async (req, res) => {
  const [result] = await SelectPosts();
  res.send(result);
});

// Get User Using username
app.get("/:name", async (req, res) => {
  const requestedNameLower = req.params.name.toLowerCase(); // Lowercase the requested name

  const [users] = await SelectUsers();

  const user = users.find((user) =>
    user.username.toLowerCase() === requestedNameLower
  );
  if (user) {
    res.cookie(user.username, user.password_hash, { maxAge: 5000 });
    res.status(201).send(user);
  } else {
    res.status(404).send("User not found");
  }
});

//Get All Post By The User
app.get("/:username/posts", async (req, res) => {
  const UserName = req.params.username.toLocaleLowerCase();

  const [users] = await SelectUsers();
  const user = users.find((user) => user.username.toLowerCase() === UserName);

  const [posts] = await SelectPosts();
  const friends = await countFriends(user.user_id);
  const userPosts = posts.filter((post) => post.user_id === user.user_id);
  const totalPosts = await countPostsOfUsers(user.user_id);

  res.json({
    User: user.username,
    friends: (friends === 0) ? 'No Friends Bro' : friends,
    totalPosts: (totalPosts === 0) ? 'No Posts' : totalPosts,
    userPosts
  });
})

// Get Post Using username And post_id
app.get("/:username/post/:post_id", async (req, res) => {
  const UserName = req.params.username.toLocaleLowerCase();
  const postId = parseInt(req.params.post_id);

  {// CONDITION

    if (isNaN(postId)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    if (!isNaN(UserName)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
  }
  const [users] = await SelectUsers();
  const user = users.find((user) => user.username.toLowerCase() === UserName);

  const post = await getPostById(postId, user.user_id);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const response = [user, post];
  res.json(response);
});

//Get Friends Of A User
app.get("/:username/friends", async (req, res) => {
  const UserName = req.params.username.toLocaleLowerCase();

  const [users] = await SelectUsers();
  const user = users.find((user) => user.username.toLowerCase() === UserName);

  const friends = await countFriends(user.user_id);
  const posts = await countPostsOfUsers(user.user_id);

  res.json({
    User: user.username,
    totalPosts: (posts === 0) ? 'No Posts' : posts,
    friends: (friends === 0) ? 'No Friends Bro' : friends,

  });
});

app.post("/new/user", async (req, res) => {
  const BData = req.body;
  if (BData.username==null||BData.email==null||BData.password_hash==null||BData.full_name==null) {
    return res.status(400).send("Invalid Data")
  }
  const NewUser = [
    BData.username,
    BData.email,
    BData.password_hash,
    BData.full_name,
    BData.dob,
    BData.profile_pic,
    BData.bio,
    BData.location,
    BData.web_url
  ];
  const [result] = await InsertUser(NewUser);
  console.log(result);
  res.json(result).status(202);
})
app.listen(5000, () => {
  console.log("Startserver at  localhost:5000");
});
