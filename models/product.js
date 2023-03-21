module.exports = (sequelize, DataTypes) => {
  /* sequelize.define  sequelize에 정의한다.(테이블정의) //Product라는 테이블 */
  const product = sequelize.define("Product", {
    /* 이 데이터베이스는 id가 자동으로 생성됌 */
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    seller: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    soldout: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0,
      //SQLite는 boolean 자료형을 지원하지 않는다. 숫자형으로 0은 false, 1은 true로 구현한다.
    },
  });
  return product;
};
