const express = require("express");
const cors = require("cors");
const app = express();
const models = require("./models");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get("/banners", (req, res) => {
  models.Banner.findAll({
    //갯수제한
    limit: 2,
  })
    .then((result) => {
      res.send({
        banners: result,
      });
    })
    .catch((error) => {
      console.log(error);
      //500번 에러
      res.status(500).send("에러가 발생했습니다.");
    });
});

app.get("/products", function (req, res) {
  models.Product.findAll({
    order: [["createdAt", "DESC"]],
    attributes: ["id", "name", "price", "seller", "imageUrl", "createdAt", "soldout"],
  })
    .then((result) => {
      res.send({
        product: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.send("에러발생");
    });
});

app.get("/products/:id", function (req, res) {
  const params = req.params;
  const { id } = params;
  models.Product.findOne({
    where: {
      id,
    },
  })
    .then((result) => {
      res.send({ product: result });
    })
    .catch((err) => {
      console.error(err);
      res.send("상품조회시 에러가 발생했습니다.");
    });
});

app.post("/products", function (req, res) {
  const body = req.body;
  const { name, description, price, seller, imageUrl } = body;
  if (!name || !description || !price || !seller) {
    res.send("모든 필드를 입력해주세요");
  }
  models.Product.create({
    name,
    description,
    price,
    seller,
    imageUrl,
  })
    .then((result) => {
      console.log("상품생성결과:", result);
      res.send({ result });
    })
    .catch((err) => {
      console.error(err);
      res.send("상품업로드에 문제가 발생했습니다");
    });
});

//결제하기
/* api서버는 요청받으면 전달하고 응답함 */
app.post("/purchase/:id", function (req, res) {
  /* 전달부분 */
  const { id } = req.params;
  //update() 값을변경
  models.Product.update(
    {
      soldout: 1,
      //1로 바꾼다.
    },
    {
      where: {
        id,
        //id값에 있는 것을
      },
    }
  )
    .then((result) => {
      res.send({
        result: true,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("에러가 발생했습니다.");
    });
});

app.post("/image", upload.single("image"), (req, res) => {
  const file = req.file;
  console.log(file);
  res.send({
    imageUrl: file.path,
  });
});

/* ************************************************** */
/* ****************** Todos ************************* */
//reding
app.get("/todos", function (req, res) {
  models.Todo.findAll({
    order: [["id", "DESC"]],
    attributes: ["id", "subject", "description", "completed"],
  })
    .then((result) => {
      res.send({
        todos: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.send("에러발생");
    });
});
//create
app.post("/todos", function (req, res) {
  const body = req.body;
  const { subject, description, completed } = body;

  models.Todo.create({
    subject,
    description,
    completed,
  })
    .then((result) => {
      console.log("Product생성결과:", result);
      res.send({ result });
    })
    .catch((err) => {
      console.error(err);
      res.send("상품업로드에 문제가 발생했습니다");
    });
});
//update
app.post("/todos/:id", (req, res) => {
  const { id } = req.params; //한번에 표기
  models.Todo.findOne({ where: { id } })
    .then((item) => {
      const completedValue = item.completed === 0 ? 1 : 0;
      models.Todo.update(
        {
          completed: completedValue,
        },
        {
          where: { id },
        }
      )
        .then(() => {
          res.send({ result: true });
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("에러발생");
    });
});
//delete
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  //models.Todo.destroy()//전체삭제
  models.Todo.destroy({ where: { id } })
    .then(() => {
      res.send("삭제완료");
    })
    .catch((err) => {
      res.status(501).send(err);
      console.log(err);
    });
});

app.listen(port, () => {
  console.log("망고샵 서버 실행중");
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB 연결 성공");
    })
    .catch((err) => {
      console.log("DB 연결 실패");
      console.error(err);
      process.exit();
    });
});
