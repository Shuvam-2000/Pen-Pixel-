# Blog Application

This is a simple Blog Application built using **Node.js**, **Express.js**, **EJS**, and **MongoDB**. The application allows users to sign up, sign in, create blogs, upload profile pictures, read blogs, and interact with other users through comments.

## Features

1. **Authentication**:
   - User sign-up with email and password.
   - User sign-in for returning users.

2. **Blog Management**:
   - Add new blogs with a title, content, and an optional profile picture.
   - View a list of all blogs.
   - Read individual blog posts.

3. **Comments**:
   - Add comments to blog posts.
   - View all comments on a blog post.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side scripting.
- **Express.js**: Web framework for building RESTful APIs.
- **EJS**: Templating engine for rendering dynamic HTML.
- **MongoDB**: NoSQL database for storing user and blog data.

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd blog-application
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:

     ```env
     PORT=8000
     MONGO_URI=<your-mongodb-connection-string>
     SESSION_SECRET=<your-session-secret>
     ```

4. Start the application:

   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:8000`.
