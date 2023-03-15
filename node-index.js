var http = require("http"); //노드모듈 import 해서 변수 http에 저장
var hostname = "127.0.0.1"; //컴퓨터 내부주소
var port = "8080"; //서버포트
//서버생성(요청, 응답)
const server = http.createServer((req, res) => {
  //console.log('REQUEST:',req);
  //res.end('hi member')
  const path = req.url;
  const method = req.method;
  if (path === "/products") {
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      //JSON.stringify 자바스크립트나 객체를 제이슨문자열로 바꿔줌
      const products = JSON.stringify([{ name: "배변패드", price: 50000 }]);
      res.end(products);
    } else if (method === "POST") {
      res.end("생성되었습니다.");
    }
  }
  res.end("Good Bye");
});
server.listen(port, hostname);
console.log("mangoshop server on");



/* 
- 3/14 http서버 구축포트번호 구별 react 3000번 포트 node 8080번 포트
- / 까지가 경로 ? 질의문 (쿼리문) : key:value
- nodejs 서버구축(교안참고) ** 프로젝트에서는 노드로만 구축하지는 않음 (섞어서)*
- 폴더 최상단 (vscode) → 워크스페이스

1. npm init
node js 는 js 를 웹이 아닌 다양한 환경에서 사용할 수 있게 해준다.(아무데서나 js 를 컴파일 할 수 있다.)

2. test
- test.js 작성해서 콘솔에 메세지 입력후
- 터미널에서 node test.js 입력
- 우리는 es6를 사용하는데 node는 common js 를 사용한다. (리액트,뷰는 노드기반인데 es6 와 호환이 되도록 개발되었는데 scss 같은경우는 아님 그래서 가끔충돌난다.)
*/
