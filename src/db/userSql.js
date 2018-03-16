var UserSQL = {  
    insert:'INSERT INTO user(name,age,sex,work) VALUES(?,?,?,?)', //插入数据
    queryAll:'SELECT * FROM user',  //查询所有数据
    getUserById:'SELECT * FROM user WHERE id = ? ', //查询数据by id
    update:'update user set name=?,age=?,sex=?,work=? where id=?', //更新数据by id
    delete:'delete from user where id=?', //删除数据by id
  };
module.exports = UserSQL;