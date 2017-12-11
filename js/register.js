module.exports = {


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
		user.post('/lee', function(req, res) {
			var imgurls = req.body.imgurls
			var name = req.body.name
			var sex = req.body.sex
			var ip = req.body.ip
			var tel = req.body.tel
			var email = req.body.email
			var qq = req.body.qq
			//		var userid = req.body.userid
			pool.getConnection(function(err, connection) {
				if(err) {
					console.log('connection::' + err)
					return
				}
				connection.query('select * from login', function(err, data) {
					if(err) {
						console.log(err)
						return
					}
					var userid = data[0].uid

					var sql = 'insert into name(name,imgurls,sex,ip,tel,email,qq,userid) values(?,?,?,?,?,?,?,?)'
					var arr = [name, imgurls, sex, ip, tel, email, qq, userid]

					connection.query(sql, arr, function(err, data) {
						if(err) {
							console.log('mysql::' + err)
							return
						}

						res.send('ok')
						connection.end()
					})
				})

			})
		})
}
