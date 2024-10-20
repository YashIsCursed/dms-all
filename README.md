# DMS Project

#### Project-<u><b>12</b></u> By Students Of <u><b>SYCO-C</b></u>

## Social Media User Profiles

#### Practical Question

- ### Develop a database that models social media user profiles, posts, comments, likes, and connections between users.

### Tables Included

    1. User
    2. Posts
    3. Comments
    4. Likes
    5. Connections

<details>
<summary>User</summary>
<!--All you need is a blank line-->

1. user_id (Primary Key)
2. username
3. email
4. password_hash
5. full_name
6. date_of_birth
7. profile_picture_url
8. bio
9. location
10. website_url
11. registration_date
12. last_login_date

</details>

<details>
<summary>Posts</summary>
<!--All you need is a blank line-->

1. post_id (Primary Key)
2. user_id (Foreign Key, references Users)
3. post_text
4. post_image_url
5. post_date
6. post_location

</details>
<details>
<summary>Comments</summary>
<!--All you need is a blank line-->

1. comment_id (Primary Key)
2. user_id (Foreign Key, references Users)
3. post_id (Foreign Key, references Posts)
4. comment_text
5. comment_date

</details>

<details>
<summary>Likes</summary>
<!--All you need is a blank line-->

1. like_id (Primary Key)
2. user_id (Foreign Key, references Users)
3. post_id (Foreign Key, references Posts)
4. like_date

</details>

<details>
<summary>Connections (Friendships)</summary>
<!--All you need is a blank line-->

1. connection_id (Primary Key)
2. user_id1 (Foreign Key, references Users)
3. user_id2 (Foreign Key, references Users)
4. connection_date
5. status (e.g., pending, accepted, blocked)

</details>

### Relationships

1. Users can create many posts, and each post is created by one user
   (one-to-many relationship between Users and Posts).
2. Users can post many comments, and each comment is posted by one user
   (one-to-many relationship between Users and Comments).
3. Posts can have many comments and likes (one-to-many relationship between
   Posts and Comments/Likes).
4. Users can have many connections (friends), and each connection involves two
   users (many-to-many relationship between Users and Connections).

###### Refrence

1. [Dropdown in Markdown](https://dev.to/asyraf/how-to-add-dropdown-in-markdown-o78)
2. [My Sql Npm](https://www.npmjs.com/package/mysql)
3. [MySQL & Js connect](https://www.youtube.com/watch?v=Hej48pi_lOc)
4. [MYSQL & HTML integration](https://www.youtube.com/watch?v=MDZC8VDZnV8)
