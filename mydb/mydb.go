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
	////插入数据
	//stmt, err := db.Prepare("INSERT userinfo SET username=?,departname=?,created=?")
	//checkErr(err)
	//
	//res, err := stmt.Exec("码农", "研发部门", "2016-03-06")
	//checkErr(err)
	//
	//id, err := res.LastInsertId()
	//checkErr(err)
	//
	//fmt.Println(id)
	////更新数据
	//stmt, err = db.Prepare("update userinfo set username=? where uid=?")
	//checkErr(err)
	//
	//res, err = stmt.Exec("码农二代", id)
	//checkErr(err)
	//
	//affect, err := res.RowsAffected()
	//checkErr(err)
	//
	//fmt.Println(affect)
	//
	//查询数据
	rows, err := db.Query("SELECT * FROM admin ")
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
