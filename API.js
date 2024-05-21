import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Import paket cors

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Discovering Coding Through Robotics",
    content: "In the world of robotics, we know that designing hardware and components is just one part of the equation. Equally important is the skill of developing algorithms that enable robots to perform desired tasks. My interest in coding was piqued and deepened when I started working as a robotics teacher at a private company. This experience exposed me to the fascinating intersection of hardware and software, where I learned how to create algorithms that bring robots to life, performing complex tasks with precision.",
    author: "Yoga Adi S",
    date: "2022-10-21T10:00:00Z",
  },
  {
    id: 2,
    title: "Learning Coding Fundamentals Through Game Development",
    content: "Besides robotics, another enjoyable medium for exploring and understanding programming fundamentals such as loops, functions, variables, callbacks, classes, and objects is game development. Through game development, these concepts become less abstract and can be seen, used, and experienced directly. Developing games provides an interactive and engaging way to solidify core programming skills, making the learning process both fun and effective.",
    author: "Yoga Adi S",
    date: "2023-04-21T11:00:00Z",
  },
  {
    id: 3,
    title: "Delving into JavaScript",
    content: "I have studied and switched between various programming languages multiple times, but I realized this approach wasn't very effective. It reminds me of the saying that it's better to practice one skill 1,000 times than to practice 1,000 skills once. Therefore, I decided to focus deeply on JavaScript, mastering its intricacies and becoming proficient in one language. This focused approach has allowed me to gain a deeper understanding and expertise, making me more confident and competent as a developer.",
    author: "Your Name",
    date: "2024-01-21T12:00:00Z",
  },
  {
    id: 4,
    title: "Exploring 3D Websites with Three.js",
    content: "Recently, I have been diving into Three.js, a powerful JavaScript library that makes creating 3D graphics on the web both accessible and efficient. Three.js simplifies the process of developing 3D content, allowing developers to create visually stunning, interactive web experiences. By leveraging WebGL, Three.js abstracts the complexities of 3D rendering and provides an easy-to-use interface for building sophisticated 3D scenes, animations, and more. This has opened up new possibilities for enhancing the user experience on websites, making them more engaging and immersive.",
    author: "Yoga Adi S",
    date: "2024-07-21T13:00:00Z",
  }
];

let lastId = 3;

// Middleware
app.use(cors()); // Gunakan middleware cors
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
