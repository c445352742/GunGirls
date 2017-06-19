package main
import (
	"fmt"
	"net"
	"./gate"
	"./logical/Serverhttp"

)

func main() {
	var tcpAddr *net.TCPAddr
	//解析并返回
	tcpAddr, _ = net.ResolveTCPAddr("tcp", "127.0.0.1:6999")
	//监听
	tcpListener, _ := net.ListenTCP("tcp", tcpAddr)

	//后台网页服务
	go Serverhttp.Httpmain()

	//结束时关闭
	defer tcpListener.Close()
	for {
		//接收器返回连接，并等待下一个
		tcpConn, err := tcpListener.AcceptTCP()
		if err != nil {
			continue
		}
		fmt.Println("A client connected : " + tcpConn.RemoteAddr().String())
		go gate.TcpPipe(tcpConn)
	}
}
