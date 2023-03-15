//import React from "react";와 같은개념
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

//json 형식의 데이터를 처리할수 있게 설정
app.use(express.json());
app.use(cors());

//rest API
//method,경로설정(요청,응답)
app.get("/products", (req, res) => {
  const query = req.query;
  console.log(query);

  //express.json()로 변환하기 떄문에 =>객체여야함
  res.send({
    products: [
      {
        id: 2,
        name: "혜주",
        price: 100,
        seller: "내현",
        imageUrl: "images/products/toy2.jpg",
      },
      {
        id: 4,
        name: "배변패드",
        price: 30000,
        seller: "흡수혁명",
        imageUrl: "images/products/house1.jpg",
      },
      {
        id: 5,
        name: "마약침대",
        price: 100000,
        seller: "베드킹",
        imageUrl: "images/products/house2.jpg",
      },
    ],
  });
});

app.get("/products/:id/event/:eventId", (req, res) => {
  const params = req.params;
  //const id=params.id;
  const { id , eventId } = params;
  res.send(`id는 ${id}이고 evnetId는 ${eventId}입니다`);
});

//get은 데이터를 못보냄 받아뿌리기만함
app.post("/products", (req, res) => {
  const body = req.body;
  //submit으로 보낸 데이터를 req(요청).body로 받고 그걸 상수 body에 담음
  console.log(body);

  res.send({ body });
});
app.post("/login", (req, res) => {
  res.send("로그인이 완료 되었습니다.");
});

//app 실행
app.listen(port, () => {
  console.log("망고샵의 쇼핑몰 서버가 돌아가고 있습니다. 으르렁왈왈왈🐶🐶");
});
