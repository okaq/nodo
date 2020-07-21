// nodo web serve
// AQ <aq@okaq.com>
// 2020-07-22
package main

import (
	"fmt"
	"net/http"
	"time"
)

const (
	INDEX = "zodo.html"
)

func motd() {
	fmt.Println("web serve on localhost:8080")
	fmt.Println(time.Now().String())
}

func NodoHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r)
	http.ServeFile(w,r,INDEX)
}

func main() {
	motd()
	http.HandleFunc("/", NodoHandler)
	http.ListenAndServe(":8080", nil)
}

