import mysql from "mysql2";

const pool = await mysql.createPool({
  host: "10.88.0.4",
  user: "root",
  password: "1234",
  database: "SocialM",
}).promise();

export async function SelectUsers() {
  const rows = await pool.query("SELECT * FROM Users");
  return rows;
}

export async function SelectComments() {
  const rows = pool.query("SELECT * FROM Comments");
  return rows;

}

export async function SelectConnection() {
  const rows = pool.query("SELECT * FROM Connections");
  return rows;

}

export async function SelectLikes() {
  const rows = pool.query("SELECT * FROM Likes");
  return rows;

}

export async function SelectPosts() {
  const rows = await pool.query("SELECT * FROM Posts");
  return rows;

}

export async function SelectUserByUid(id) {
  try {
    const [rows] = await pool.query("SELECT * FROM Users WHERE user_id = ?", [
      id,
    ]);
    return rows;
  } catch (error) {
    console.error("Error selecting user:", error);
    throw error;
  }
}

export async function SelectUserByUName(name) {
  try {
    const [rows] = await pool.query("SELECT * FROM Users WHERE username = ?", [
      name,
    ]);
    return rows;
  } catch (error) {
    console.error("Error selecting user:", error);
    throw error;
  }
}

export async function getPostById(postId, userId) {
  const [posts] = await pool.query(
    "SELECT * FROM Posts WHERE post_id = ? AND user_id = ?",
    [postId, userId],
  );

  return posts;
}

export async function countPostsOfUsers(user_id) {
  const [rows] = await pool.query("SELECT count(*) FROM Posts WHERE user_id = ?", [user_id]);
  return rows[0]['count(*)'];
};

export async function countFriends(user_id) {
  const [rows] = await pool.query('SELECT count(*) FROM Connections WHERE user_id1 = ? OR user_id2= ?', [user_id, user_id]);
  return rows[0]['count(*)'];
};

export async function InsertPost(postInfo) {
  try {
    const query =
      "INSERT INTO Posts (post_id, post_text, post_image_url, post_location) VALUES (?,?,?,?)";
    const values = [
      postInfo.post_id,
      postInfo.post_text,
      postInfo.post_image_url,
      postInfo.post_location,
    ];
    const [result] = await pool.query(query, values);
    return result.insertId;
  } catch (error) {
    console.error("Error inserting post:", error);
    throw error;
  }
}

export async function InsertUser(
  username,
  email,
  pass,
  full_name,
  dob,
  profile_pic,
  bio,
  location,
  web_url
) {
  /// CONDITIONS

  {
    if (username == null || email == null || pass == null || full_name == null) {
      return " Username OR Email OR Full Name Must Not Be NUll";
    }
    const user_info = [username, email, pass, full_name, dob, profile_pic, bio, location, web_url];
    const res = await pool.query("INSERT INTO Users (username,email,password_hash,full_name,date_of_birth,profile_picture_url,bio,location,website_url) VALUES(?,?,?,?,?,?,?,?,?);", user_info);
    return res;
  }
}
