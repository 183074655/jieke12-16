btn1.onclick = function() {
	ajax({
		url: 'http://localhost:8000/user/login',
		type: 'post',
		data: {
			user: userName1.value,
			pass: passWord1.value
		},
		success: function(da) {
			alert(da)
		},
		error: function() {

		}
	})
}
btn2.onclick = function() {
	ajax({
		url: 'http://localhost:8000/user/login2',
		type: 'post',
		data: {
			user: userName2.value,
			pass: passWord2.value
		},
		success: function(da) {
			if(da=='用户名以存在'){
				alert('用户名以存在')
			}else{
				window.open(da)
			}
			

		},
		error: function() {

		}
	})
}

function ajax(req) {
	if(window.XMLHttpRequest) {
		var ajax = new XMLHttpRequest()
	} else {
		var ajax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(req.type == 'get') {
		ajax.open('get', req.url + '?' + strdata(req.data), true)
		ajax.send()
	} else {
		ajax.open('post', req.url, true)
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
		ajax.send(strdata(req.data))
	}
	ajax.onreadystatechange = function() {
		if(ajax.readyState == 4) {
			if(ajax.status >= 200 && ajax.status < 300 || ajax.status == 304) {
				req.success(ajax.responseText)
			} else {
				req.error(ajax.status)
			}

		}
	}

	function strdata(da) {
		var arr = []
		for(var i in da) {
			arr.push(i + '=' + da[i])
		}
		var strurl = arr.join('&')
		return strurl
	}
}