package _global

import ()
//全局已登录用户表结构
type User struct {
	Id string
	Ip string
	Name string
	Time string
	Loc string
}

//全局场景用户表结构
type Scene struct {
	Id string
	Name string
	Appearance []string
}

var Tcplist []User

func s()  {
	var us User
	us.Ip="d"
}
