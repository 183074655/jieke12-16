var express = require('express')
var multer = require('multer')
var mysql = require('mysql')
var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var user = express.Router()
var app = express()

var pool = mysql.createPool({
		host: '127.0.0.1',
		user: 'root',
		password: 'gqq123..',
		database: 'user',
		port: 3306
	})
	//登录注册
	! function() {
		app.use(bodyParser.urlencoded({}))
		app.use('/user', user)

		user.post('/login', function(req, res) {
			res.setHeader('Access-Control-Allow-Origin', '*')
			var user = req.body.user
			var pass = req.body.pass
			pool.getConnection(function(err, connection) {
				if(err) {
					console.log('connection::' + err)
					return
				}
				connection.query('select * from login where user=?', [user], function(err, data) {
					if(err) {
						console.log('mysql::' + err)
						return
					}
					if(data == '') {
						res.send('用户名不存在')
					} else {
						if(data[0].pass == pass) {
							res.send('登陆成功')
						} else {
							res.send('用户名或密码错误')
						}
					}

				})
			})

		})
		//注册
		user.post('/login2', function(req, res) {
			var user = req.body.user
			var pass = req.body.pass
			pool.getConnection(function(err, connection) {
				if(err) {
					console.log('connection::' + err)
					return
				}

				connection.query('select * from login where user=?', [user], function(err, data) {
					if(err) {
						console.log('mysql::' + err)
						return
					}
					if(data == '') {
						connection.query('insert into login(user,pass) values(?,?)', [user, pass], function(err, data) {
							if(err) {
								console.log('mysql::' + err)
								return
							}
							res.send('http://localhost:8000/register.html')
						})
					} else {
						res.send('用户名以存在')
					}

				})
			})

		})
	}()

	//个人信息
	! function() {
		app.use(bodyParser.urlencoded({}))
		app.use(multer({
			dest: './img'
		}).any())
		app.use('/user', user)
		user.post('/img', function(req, res) {
			var img = req.files
			var name = req.files[0].filename
			var newName = name + path.parse(req.files[0].originalname).ext
			fs.rename('./img/' + name, './img/' + newName, function(err) {
				if(err) {
					console.log(err)
					return
				}
				res.send('http://localhost:8000/img/' + newName)
			})
			console.log(newName)

		})
		user.post('/login2', function(req, res) {
			console.log(uid)
		})
//		user.post('/lee', function(req, res) {
//			var imgurls = req.body.imgurls
//			var name = req.body.name
//			var sex = req.body.sex
//			var ip = req.body.ip
//			var tel = req.body.tel
//			var email = req.body.email
//			var qq = req.body.qq
//			//		var userid = req.body.userid
//			pool.getConnection(function(err, connection) {
//				if(err) {
//					console.log('connection::' + err)
//					return
//				}
//				connection.query('select * from login', function(err, data) {
//					if(err) {
//						console.log(err)
//						return
//					}
//					var userid = data[0].uid
//
//					var sql = 'insert into name(name,imgurls,sex,ip,tel,email,qq,userid) values(?,?,?,?,?,?,?,?)'
//					var arr = [name, imgurls, sex, ip, tel, email, qq, userid]
//
//					connection.query(sql, arr, function(err, data) {
//						if(err) {
//							console.log('mysql::' + err)
//							return
//						}
//
//						res.send('ok')
//						connection.end()
//					})
//				})
//
//			})
//		})
	}()
app.use(express.static('./'))
app.listen(8000, function() {
	console.log('ok')
})