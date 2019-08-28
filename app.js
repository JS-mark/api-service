const jsonServer = require("json-server")
const server = jsonServer.create()
const router = jsonServer.router("db.json")
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)
server.use(jsonServer.bodyParser)
server.get("/test/country.json", (req, res) => {
	res.send(router.db.get("test").get("country"))
})
server.post("/test/country.json", (req, res) => {
	// let obj = router.db
	// 	.get("test")
	// 	.get("country")
	// 	.find(req.body)
	// 	.value()
	// console.log(req.body.language)
	// let newObj = Object.keys(obj)
	// 	.filter(key => {
	// 		if (new RegExp(req.body.language, "i").test(obj[key])) {
	// 			return key
	// 		}
	// 	})
	// 	.reduce((_obj, key) => {
	// 		_obj[key] = obj[key]
	// 		return _obj
	// 	}, {})
	res.send(
		router.db
			.get("test")
			.get("country")
			.find(req.body)
			.value()
	)
})
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server

server.use((req, res, next) => {
	if (req.method === "POST") {
		req.body.createdAt = Date.now()
	}
	// Continue to JSON Server router
	next()
})

// Use default router
server.use(router)
server.listen(3000, () => {
	console.log("JSON Server is running")
})
