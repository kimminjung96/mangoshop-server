const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.get("/products", (req, res) => {
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
    ],
  });
});
app.post("/products", (req, res) => {
  res.send("상품등록이 완료 되었습니다.");
});
app.post("/login", (req, res) => {
  res.send("로그인이 완료 되었습니다.");
});

app.listen(port, () => {
  console.log("망고샵의 쇼핑몰 서버가 돌아가고 있습니다. 으르렁왈왈왈🐶🐶");
});
