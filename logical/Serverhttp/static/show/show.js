var show=new Vue({
    el: "#show",
    data:{
        name:tplobj.adminAcc,
        privilege:tplobj.privilege,
        toggle:false,
    },
    methods:{
        act:function(){
            if(this.toggle)
                this.toggle=false;
            else this.toggle=true;
        },
    }
});