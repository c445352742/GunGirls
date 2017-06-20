package Mydb

import (
	"database/sql"
	_"../kit/mysql-master"
	"fmt"
	"strconv"
)
var (
	//dbip  = "tcp(localhost:3306)"//IP地址
	dbip  = ""//IP地址
	username = "golang"//用户名
	password = "11111111"//密码
	dbname     = "woodgames"//表名
)

func Admin(uacc string)[]map[string]string  {
	s:=username+":"+password+"@"+dbip+"/"+dbname+"?timeout=1s"
	db, err := sql.Open("mysql",s)
	//fmt.Print(err)
	defer db.Close()

	rows, err := db.Query("SELECT * FROM admin where account="+"'"+uacc+"'")

	checkErr(err)

	var m []map[string]string
	var m1 map[string]string
	m1=make(map[string]string)


	for rows.Next() {
		var id int
		var account string
		var password string
		var privilege string
		err = rows.Scan(&id, &account, &password, &privilege)
		m1["id"]=strconv.Itoa(id)
		m1["account"]=account
		m1["password"]=password
		m1["privilege"]=privilege
		m=append(m,m1)
	}
	//if no such account
	if m1["account"]=="" {
		m1["account"] = "no such account"
		m1["password"] = "no such account"
		m1["privilege"] = "no such account"
		m = append(m, m1)
	}
	//fmt.Println(m)
	return m

}

func Database(){
	s:=username+":"+password+"@"+dbip+"/"+dbname+"?timeout=1s"
	db, err := sql.Open("mysql",s)
	//fmt.Print(err)
	defer db.Close()

	stmt, err := db.Prepare(
		//插入数据
//"INSERT INTO admin (account, password ,PRIVILEGE)values('ff' ,'ff', 'ff')")
//		更新数据
"update admin set account='golang', password='golang' ,PRIVILEGE='readonly' where id='2'")
	checkErr(err)
	_, err = stmt.Exec()

	
	
	rows, err := db.Query("SELECT * FROM admin where id='1'")
	checkErr(err)
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
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
