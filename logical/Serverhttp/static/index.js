var app2=new Vue({
    el: "#app",
    data:{
        toggle:false,
        acc:""
    },
    methods:{
        submit:function(){
            console.log("check");
        },
    }
});
axios.get('/check')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });