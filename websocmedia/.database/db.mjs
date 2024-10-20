import mysql from "mysql2";

const pool = await mysql.createPool({
  host: "10.88.0.4",
  user: "root",
  password: "1234",
  database: "SocialM",
}).promise();

export async function SelectUsers() {
  try {
    const [rows] = await pool.query("SELECT * FROM Users");
    return rows;
  } catch (error) {
    console.error("Error selecting users:", error);
    throw error;
  }
}

export async function SelectComments() {
  try {
    const [rows] = pool.query("SELECT * FROM Comments");
    return rows;
  } catch (error) {
    console.error('error Selecting comments:', error);
    throw error;
  }
}

export async function SelectConnection() {
  try {
    const [rows] = pool.query("SELECT * FROM Connections");
    return rows;
  } catch (error) {
    console.error('error Selecting Connections:', error);
    throw error;
  }
}

export async function SelectLikes() {
  try {
    const [rows] = pool.query("SELECT * FROM Likes");
    return rows;
  } catch (error) {
    console.error('error Selecting Likes: ', error);
    throw error;
  }
}

export async function SelectPosts() {
  try {
    const [rows] = await pool.query("SELECT * FROM Posts");
    return rows;
  } catch (error) {
    console.error("Error selecting posts:", error);
    throw error;
  }
}

export async function InsertPost(postInfo) {
  try {

    const query = "INSERT INTO Posts (post_id, post_text, post_image_url, post_location) VALUES (?,?,?,?)";
    const values = [postInfo.post_id, postInfo.post_text, postInfo.post_image_url, postInfo.post_location];
    const [result] = await pool.query(query, values);
    return result.insertId;
  } catch (error) {
    console.error("Error inserting post:", error);
    throw error;
  }
}

export async function SelectUser(id) {
  try {
    const [rows] = await pool.query('SELECT * FROM Users WHERE user_id > ?', [id]);
    return rows;
  } catch (error) {
    console.error("Error selecting user:", error);
    throw error;
  }
}

export async function getPostById(postId, userId) {
  try {
    const query = 'SELECT * FROM Posts WHERE post_id = ? AND user_id = ?';
    const [posts] = await connection.execute(query, [postId, userId]);
    if (posts.length === 0) {
      return null;
    }
    return posts[0];
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}
