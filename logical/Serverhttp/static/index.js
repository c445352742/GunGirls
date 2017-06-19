var app2=new Vue({
    el: "#app",
    data:{
        toggle:false,
        acc:""
    },
    methods:{
        act:function(){
            if(this.toggle)
                this.toggle=false;
            else this.toggle=true;
        },
    }
});