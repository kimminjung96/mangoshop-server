//import React from "react";와 같은개념
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080; //http://127.0.0.1:8080/
const models = require("./models"); /* ./models/index.js */
const multer = require("multer");

const upload = multer({
  //dest: "uploads/"
  storage: multer.diskStorage({
	  destination: function (req, file, cb) {
      //cb 콜백함수 약자
		cb(null, "uploads/");
	  },
	  filename: function (req, file, cb) {
		cb(null, file.originalname);
	  },
	}),
});
/* multer => 파일을 uploads폴더 안에 저장하는 역할 */

//json 형식의 데이터를 처리할수 있게 설정
app.use(express.json());
app.use(cors());
app.use("/uploads",express.static("uploads"))

//rest API
//method,경로설정(요청,응답)
app.get("/products", (req, res) => {
  models.Product.findAll({
    //limit:1,//제한을 거는거(1개만 나옴)
    //'참조컬럼','ASC'(오름차순) || 'DESC' (내림차순) =>안쓰면 id기준 오름차순
    order: [["createdAt", "DESC"]], //정렬기능
    attributes: ["id", "name", "price", "seller", "imageUrl", "createdAt"],
  })
    .then((result) => {
      //then = 모드데이터는 비동기식
      console.log("PRODUCT : ", result);
      res.send({
        product: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("에러 발생");
    });

  /* 
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
 */
});

app.get("/products/:id", (req, res) => {
  const params = req.params;
  //const id=params.id;
  //const { id, eventId } = params;
  const { id } = params;
  models.Product.findOne({
    where: { id: id },
  })
    .then((result) => {
      console.log("조회결과 :", result);
      res.send({
        product: result,
      });
    })
    .catch((error) => {
      console.log("에러 :", error);
    }); //findOne 하나만 조회
});

app.post("/image", upload.single("image"), (req, res) => {
  const file = req.file;
  console.log("파일콘솔", file);
  res.send({
    imageUrl: file.originalname,
  });
});

//get은 데이터를 못보냄 받아뿌리기만함
//상품생성데이터를 데이터베이스에 추가
app.post("/products", (req, res) => {
  const body = req.body;
  //submit으로 보낸 데이터를 req(요청).body로 받고 그걸 상수 body에 담음

  //1. 상수 body에 전달받은 값을 구조분해할당
  const { name, description, price, seller } = body;
  if (!name || !description || !price || !seller) {
    res.send("모든 필드를 입력해주세요");
  }
  console.log(body);
  //2. 레코드 생성 (행단위)
  models.Product.create({ name, description, price, seller })
    .then((result) => {
      console.log("상품생성결과:", result);
      res.send({ result });
    })
    .catch((error) => {
      console.log("error:", error);
      res.send("상품업로드에 문제가 발생했습니다.");
    });
});
app.post("/login", (req, res) => {
  res.send("로그인이 완료 되었습니다.");
});

//app 실행
app.listen(port, () => {
  console.log("망고샵의 쇼핑몰 서버가 돌아가고 있습니다. 으르렁왈왈왈🐶🐶");
  models.sequelize
    .sync()
    .then(() => {
      console.log("😀db연결 성공");
    })
    .catch((err) => {
      console.err(err);
      console.log("😫db연결 실패");
      process.exit();
    });
  /* sync() 접속 
    sequelize.sync() db에 필요한 테이블 생성
    process.exit() 서버종료하는 명령어
   */
});

/* sqlite =>mysql을 쉽게 다루게 경량화함
    ORM => sqlite를 더 쉽게 사용함
*/

/* 
  npx sequelize init 을 하면 아래 폴더들이 생성 된다.
├── ...
├── config  //sequelize와 연결될 데이터베이스 설정
│   └── config.json 
├── models  //데이터베이스 모델링 관련 설정
│   └── index.js
├── seeders
└── migrations

*/
