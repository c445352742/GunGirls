package Serverhttp

import (
	"net/http"
	"log"
	"text/template"
	"../../kit/sessions-master"
	"../../kit/context-master"
	"fmt"

	//mysql
	"../../mydb"

)

const currentDir = "./logical/Serverhttp"

//向模版传函数
//func Ok()  int{
//	return 12
//}
//var cvt=template.FuncMap{
//	"Ok":Ok,
//}

func data() map[string]string {
	return map[string]string{
		"l":"{{",
		"r":"}}",
	}
}
func index(w http.ResponseWriter, r *http.Request) {

	r.ParseForm() //解析参数，默认是不会解析的
	t, err := template.ParseFiles(currentDir + "/src/index.html")
	if err != nil {
		log.Fatal("convert template: ", err)
	}
	// 将页面渲染后反馈给客户端
	t.Execute(w, data())
}
var store = sessions.NewCookieStore([]byte("secret"))

func show(w http.ResponseWriter, r *http.Request) {
	//向模版传函数
	//t:= template.Must(template.New("iindex." +
	//	"html").Funcs(cvt).ParseFiles(currentDir+"/src/iindex.html"))
	t, err := template.ParseFiles(currentDir + "/src/show/show.html")
	if err != nil {
		log.Fatal("convert template: ", err)
	}
	session,err := store.Get(r,"userinfo")
	// 将页面渲染后反馈给客户端

	d:=data()
	//fmt.Print(session.Values["account"])
	var p string
	if session.Values["account"]==nil {
		p= "null session"
	}else{
		p= session.Values["account"].([]string)[0]
	}

	d["s"]=p
	t.Execute(w, d)
	//t.Execute(w, data())
}

func check(w http.ResponseWriter, r *http.Request)  {
	r.ParseForm() //解析参数，默认是不会解析的
	//for i, v := range r.Form {
	//	fmt.Println(i, "  ", v)
	//}
	//r.Form["account"]

	// 获得一个session. Get()总能返回session，即使参数是空的
	session,err := store.Get(r,"userinfo")
	session.Options = &sessions.Options{
		Path:     "/",
		//秒为单位
		MaxAge:   3600 ,
		HttpOnly: true,
	}
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Println("write session:",session.IsNew)
	// Set some session values.
	session.Values["account"] = nil
	session.Values["pwd"] = nil
	if(r.Method == "POST") {
		session.Values["Id"] = r.Form["account"]
		session.Values["pwd"] = r.Form["password"]
	}
	// Save it before we write to the response/return from the handler.
	session.Save(r, w)

	http.Redirect(w,r,"/show",http.StatusFound)
}

func Httpmain() {
	//静态服务
	http.Handle("/static/", http.FileServer(http.Dir(currentDir)))
	//动态模版渲染
	http.HandleFunc("/", index)    //设置访问的路由
	http.HandleFunc("/check", check)    //设置访问的路由
	http.HandleFunc("/show", show) //设置访问的路由
	go Mydb.Database()
	err := http.ListenAndServe(":7000", context.ClearHandler(http.DefaultServeMux)) //设置监听的端口
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
