module.exports = (sequelize, DataTypes)=>{
    /* sequelize.define  sequelize에 정의한다.(테이블정의) */
    const product = sequelize.define("Product",{
        /* 이 데이터베이스는 id가 자동으로 생성됌 */
        name:{
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        price:{
            type:DataTypes.INTEGER(10),
            allowNull:false,
        },
        seller:{
            type:DataTypes.STRING(30),
            allowNull:false,
        },
        description:{
            type:DataTypes.STRING(300),
            allowNull:false,
        },
        imageUrl:{
            type:DataTypes.STRING(300),
            allowNull:true,
        },
    })
    return product;
}