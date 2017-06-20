package Serverhttp

import (
	"net/http"
	"log"
	"text/template"
	"../../kit/sessions-master"
	"../../kit/context-master"

	//mysql database
	"../../mydb"

	"fmt"
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
	//fmt.Println(session.Values)
	var admin string
	var pri string
	d:=data()
	//read session
	if session.Values["adminAcc"]=="null" {//if null
		d["adminAcc"]="Anonymous"
		d["privilege"]="No Access"
	}else{
		admin= session.Values["adminAcc"].(string)
		pri= session.Values["privilege"].(string)
		d["adminAcc"]=admin
		d["privilege"]=pri
	}
	// 将页面渲染后反馈给客户端


	t.Execute(w,d)
}

func check(w http.ResponseWriter, r *http.Request)  {
	r.ParseForm() //解析参数，默认是不会解析的
	//for i, v := range r.Form {
	//	fmt.Println(i, "  ", v)
	//	fmt.Println("in check:",r.Form)
	//}
	//r.Form["account"]

	// 获得一个session. Get()总能返回session，即使参数是空的
	session,err := store.Get(r,"userinfo")
	session.Options = &sessions.Options{
		Path:     "/",
		//秒为单位
		MaxAge:   3600,
		HttpOnly: true,
	}
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//resolve the ajax form and search data in the db
	var account string="null account"
	if len(r.Form)!=0{
		//fmt.Println("form is:",r.Form)
		account=r.Form["account"][0]
	}
	adminmap:=Mydb.Admin(account)

	//write session
	//fmt.Println("form is:",len(r.Form))

	if adminmap[0]["password"]=="no such account"{
		session.Values["adminAcc"] = "null"
		session.Values["privilege"]= "null"
		// Save it before we write to the response/return from the handler.
		session.Save(r, w)
		fmt.Fprint(w,"no such account")
		// Save it before we write to the response/return from the handler.
		return
	}

	if r.Form["password"][0]!=adminmap[0]["password"] {
		session.Values["adminAcc"] = "null"
		session.Values["privilege"]= "null"
		// Save it before we write to the response/return from the handler.
		session.Save(r, w)
		fmt.Fprint(w,"wrong password")
		// Save it before we write to the response/return from the handler.
		return
	}
	if r.Form["password"][0]==adminmap[0]["password"]{
		session.Values["adminAcc"] = adminmap[0]["account"]
		session.Values["privilege"]= adminmap[0]["privilege"]
		// Save it before we write to the response/return from the handler.
		session.Save(r, w)
		fmt.Fprint(w,"logged in")
		return
	}
	//http.Redirect(w,r,"/show",http.StatusFound)
}

func Httpmain() {
	//静态服务
	http.Handle("/static/", http.FileServer(http.Dir(currentDir)))
	//动态模版渲染
	http.HandleFunc("/", index)    //设置访问的路由
	http.HandleFunc("/check", check)    //设置访问的路由
	http.HandleFunc("/show", show) //设置访问的路由
	//go Mydb.Database()
	err := http.ListenAndServe(":7000", context.ClearHandler(http.DefaultServeMux)) //设置监听的端口
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
