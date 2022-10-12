const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];

const posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 1,
  },
];

const http = require("http");
const express = require("express");

const app = express();
app.use(express.json()); //req.body undefined 에러 해결(아마 express사용시 발생하는 에러인듯? 전에는 body-parser Install해서 해결한 기억이 있는데 그게 express 업데이트 되면서 express내장 기능으로 추가 된듯)
app.use(express.urlencoded({ extended: false }));

const createUser = (req, res) => {
  let user = req.body.data;

  users.push({
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
  });
  console.log(users);
  res.json({ message: "userCreated" });
};

const addPost = (req, res) => {
  const post = req.body.data;

  posts.push({
    id: post.id,
    title: post.title,
    content: post.content,
    userId: post.userId,
  });

  // console.log(posts);
  res.json({ message: "postCreated" });
};

const postList = (req, res) => {
  res.json({
    data: [
      {
        userID: 1,
        userName: "Rebekah Johnson",
        postingId: 1,
        postingTitle: "간단한 HTTP API 개발 시작!",
        postingContent:
          "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
      },
      {
        userID: 2,
        userName: "Fabian Predovic",
        postingId: 2,
        postingTitle: "HTTP의 특성",
        postingContent: "Request/Response와 Stateless!!",
      },
      {
        userID: 3,
        userName: "new user 1",
        postingId: 3,
        postingTitle: "내용 1",
        postingContent: "sampleContent3",
      },
      {
        userID: 4,
        userName: "new user 2",
        postingId: 4,
        postingTitle: "내용 2",
        postingContent: "sampleContent4",
      },
    ],
  });
};

app.get("/", (req, res) => {
  res.json({ message: "hi 연결했다 자식아" });
});

app.post("/signup", createUser);
app.post("/addpost", addPost);
app.get("/postlist", postList);

const server = http.createServer(app);

server.listen(3000, () => {
  console.log("여기는 터미널 로그다 자식아");
});
