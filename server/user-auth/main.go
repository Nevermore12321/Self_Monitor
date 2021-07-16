package main

import (
	"fmt"
	"github.com/casbin/casbin/v2"
	gormadapter "github.com/casbin/gorm-adapter/v3"
	"log"
)

func main() {
	adapter, err := gormadapter.NewAdapter("mysql", "admin:gsh123@tcp(192.168.1.101:3306)/")
	if err != nil {
		log.Fatalf("err: ", err)
	}

	enforcer, err := casbin.NewEnforcer("./model.conf", adapter)
	if err != nil {
		log.Fatalf("err: ", err)
	}

	enforcer.LoadPolicy()

	p_rules := [][]string {
		[]string{ "admin", "domain1", "data1", "read"},
		[]string{ "admin", "domain1", "data1", "write"},
		[]string{ "admin", "domain2", "data2", "read"},
		[]string{ "admin", "domain2", "data2", "write"},
	}
	g_rules := [][]string {
		[]string{"alice", "admin", "domain1"},
		[]string{"bob", "admin", "domain2"},
	}
	policies, err := enforcer.AddPolicies(p_rules)
	if err != nil {
		log.Fatalf("err: ", err)
	}
	fmt.Println("policies: ", policies)

	groupingPolicies, err := enforcer.AddGroupingPolicies(g_rules)
	if err != nil {
		log.Fatalf("err: ", err)
	}
	fmt.Println("groupingPolicies: ", groupingPolicies)

	// Check the permission.
	res, err := enforcer.Enforce("alice", "domain1", "data1", "read")
	if err != nil {
		log.Fatalf("err: ", err)
	}

	if res {
		fmt.Println("pass")
	} else {
		fmt.Println("no pass")
	}
}
