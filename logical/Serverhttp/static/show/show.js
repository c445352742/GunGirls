var show=new Vue({
    el: "#show",
    data:{
        toggle:false,
        name:s
    },
    methods:{
        act:function(){
            if(this.toggle)
                this.toggle=false;
            else this.toggle=true;
        },
    }
});