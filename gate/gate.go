package gate

import (
	"fmt"
	"time"
	"net"
	"bufio"
	"../global"
)
func TcpPipe(conn *net.TCPConn) {
	ipStr := conn.RemoteAddr().String()
	defer func() {
		fmt.Println("disconnected :" + ipStr)
		//关闭连接
		conn.Close()
	}()
	//读数据 创建接受变量
	reader := bufio.NewReader(conn)

	var us _global.User
	us.Ip=ipStr

	//死循环
	for {

		//读数据
		message, err := reader.ReadString('\n')
		//读错误，停止函数
		if err != nil {
			_global.Tcplist=append(_global.Tcplist,us)
			return
		}
		//读正常，输出信息
		fmt.Println(string(message))
		//获得时间，字节化，并输出给客户端
		msg := time.Now().String() + "\n"
		b := []byte(msg)
		fmt.Print(_global.S)
		conn.Write(b)
	}
}
