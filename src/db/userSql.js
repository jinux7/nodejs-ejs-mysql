var UserSQL = {  
    insert:'INSERT INTO user(id,name,age,sex,work) VALUES(?,?,?,?,?)', //插入数据
    queryAll:'SELECT * FROM user',  //查询所有数据
    getUserById:'SELECT * FROM user WHERE id = ? ', //查询数据by id
  };
module.exports = UserSQL;