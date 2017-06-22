Vue.prototype.$ajax=axios
var app2=new Vue({
    el: "#app",
    data:{
        toggle:false,
        acc:"golang",
        pwd:"golang",
        show:false,
        info:""
    },
    methods:{
        see:function () {
            console.log("input is :"+this.pwd+"  "+this.acc);
        },
        submit:function(){
            if(this.acc==""||this.pwd==""){
                this.show=true;
                this.info="帐号或密码不能为空";
            }else{
                this.myajax();
            }
        },


        myajax:function () {
            var vue=this;
            this.$ajax({
                method: 'post',
                url: '/check',
                params: {
                    // account: "",
                    account: vue.acc,
                    // password: "",
                    password: vue.pwd,
                }
            }).then(function(res){
                switch (res.data){
                    case "wrong password":
                        vue.show=true;
                        vue.info="密码错误";
                        break;
                    case "no such account":
                        vue.show=true;
                        vue.info="未注册的管理员帐号";
                        break;
                    case "db tcp time out":
                        vue.show=true;
                        vue.info="数据库连接超时";
                        break;
                    case "logged in":
                        vue.show=false;
                        location.href='./show';
                        break;
                    default:
                }
            }).
            catch(function (err) {
                console.log("catch"+err);
            })
        }
    }
});
// method="post" action="./check"
