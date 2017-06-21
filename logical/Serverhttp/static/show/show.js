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