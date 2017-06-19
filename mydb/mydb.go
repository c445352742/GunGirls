package Mydb

import (
	"database/sql"
	_"../kit/mysql-master"
	"fmt"
)
var (
	//dbip  = "tcp(localhost:3306)"//IP地址
	dbip  = ""//IP地址
	username = "golang"//用户名
	password = "11111111"//密码
	dbname     = "woodgames"//表名
)
func Database(){
	s:=username+":"+password+"@"+dbip+"/"+dbname+"?timeout=1s"

	db, err := sql.Open("mysql",s)
	//fmt.Print(err)
	defer db.Close()

	stmt, err := db.Prepare(
		//插入数据
"INSERT INTO admin (account, password ,PRIVILEGE)values('ff' ,'ff', 'ff')")
		//更新数据
//"update admin set account='golang', password='golang' ,PRIVILEGE='readonly' where id='2'")
	checkErr(err)
	_, err = stmt.Exec()

	rows, err := db.Query("SELECT * FROM admin where id='1'")
	checkErr(err)
	fmt.Print("content is")
	for rows.Next() {
		var id int
		var account string
		var password string
		var privilege string
		err = rows.Scan(&id, &account, &password, &privilege)
		checkErr(err)

		fmt.Println(id)
		fmt.Println(account)
		fmt.Println(password)
		fmt.Println(privilege)
	}
	//
	////删除数据
	//stmt, err = db.Prepare("delete from userinfo where uid=?")
	//checkErr(err)
	//
	//res, err = stmt.Exec(id)
	//checkErr(err)
	//
	//affect, err = res.RowsAffected()
	//checkErr(err)
	//
	//fmt.Println(affect)
	//


}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
