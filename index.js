import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Support Engineer I",
    content:
      "XXX is seeking a Customer Support Engineer I to join our small, but growing Support team. This is both an individual contributor and a customer-facing role. This person will be proficient in using our suite of products to efficiently problem-solve technical questions and implement solutions for existing customers. You will become a go-to person for technical questions about how our products work. You will work with our Support Engineers, ensuring effective time-management, SLA achievement, and a collaborative environment. This is a demanding role that requires customer relationship management, project management, communication, and technical skills. We are looking for candidates that are truly passionate about helping our customers on a daily basis.",
    author: "Koray Adams",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Solutions Analyst",
    content:
      "Are you a seasoned Solution Analyst with a proven track record in Asset Financing? Do you thrive on solving complex challenges in the finance industry? Join this innovative team and play a pivotal role in shaping the future of asset financing solutions! The company is a trailblazer in the financial sector, committed to revolutionizing asset financing through cutting-edge technology and strategic insights. As they expand their reach, they are seeking a talented Solution Analyst to contribute to their mission of transforming financial landscapes.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Technical Product Analyst",
    content:
      "XXX is a world leader in digital payments, facilitating more than 215 billion payments transactions between consumers, merchants, financial institutions and government entities across more than 200 countries and territories each year. Our mission is to connect the world through the most innovative, convenient, reliable and secure payments network, enabling individuals, businesses and economies to thrive. When you join Visa, you join a culture of purpose and belonging where your growth is priority, your identity is embraced, and the work you do matters. We believe that economies that include everyone everywhere, uplift everyone everywhere. Your work will have a direct impact on billions of people around the world helping unlock financial access to enable the future of money movement.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Getting All posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

//Getting a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

//Posting a new post
app.post("/posts", (req, res) => {
  const newId = (lastId += 1);
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

//Patching a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

//Deleting a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
