import mysql from "npm:mysql2";

const pool = mysql.createPool({
  host: "10.88.0.4",
  user: "root",
  password: "1234",
  database: "SocialM",
}).promise();

export async function SelectUsers() {
  const res = pool.query("SELECT * FROM Users");
  return res;
}
export async function SelectPosts() {
  const res = pool.query("SELECT * FROM Posts");
  return res;
}
export async function SelectComments() {
  const res = pool.query("SELECT * FROM Comments");
  return res;
}
export async function SelectConnection() {
  const res = pool.query("SELECT * FROM Connections");
  return res;
}
export async function SelectLikes() {
  const res = pool.query("SELECT * FROM Likes");
  return res;
}
export async function CreateUser(name, email, pass, fullName) {
  const res = pool.query(
    "INSERT INTO Users (username,email,password_hash,full_name) VALUES (?,?,?,?)",
    [name, email, pass, fullName],
  );
  return res;
}
// export async function CreatePost(userId,PostText,PostImage,postLocation) {

// }

CreateUser("name", "email", "pass", "fullName", null, null, null, null, null);
