var show=new Vue({
    el: "#show",
    data:{
        name:tplobj.adminAcc,
        privilege:tplobj.privilege,
        logged:false,
        ws:Object,
    },
    created:function () {
        if(this.name!="Anonymous"){
            this.logged=true;
            this.websocket();
        }else{
            alert("Please log in first.");
            location.href="./"
        }
    },
    methods:{
        websocket:function () {

        },
        send:function () {
            this.ws=new WebSocket("ws://localhost:7000/ws");
            this.ws.onmessage=function (e) {
                console.log(e.data);
            }
            var times=this;
            setTimeout(function () {
                var date=new Date();
                var data="from browser: " +
                    date.getMinutes() +"m"+ date.getSeconds()
                times.ws.send(data);
            },1000)

        },
    },

});
//
// <script>
// $(function() {
//     var ws = new WebSocket("ws://localhost:8080/echo");
//     ws.onmessage = function(e) {
//         $('<li>').text(event.data).appendTo($ul);
//     };
//     var $ul = $('#msg-list');
//     $('#sendBtn').click(function(){
//         var data = $('#name').val();
//         ws.send(data);
//     });
// });
// </script>