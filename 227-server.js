var http = require('http');
var fs   = require('fs');
var server = http.createServer(function(req,res){
	//创建Cookie  
	// 默认格式  res.setHeader('Set-Cookie',键=值[;Expires=过期时间;Max-Age=有效期的秒数])
	// res.setHeader('Set-Cookie','test = 123')


	// //5s后过期
	// var expires = new Date(Date.now() + 5 * 1000).toGMTString()
	// res.setHeader('Set-Cookie','test=123;Expires='+expires)

	//10s后过期
	// res.setHeader('Set-Cookie','test=123;Max-Age=10')

    var urlStr = req.url;
    var filePath = './'+urlStr;
    var data = fs.readFileSync(filePath);
    res.end(data);
});

server.listen(3000,'127.0.0.1',function(){
    console.log("Server is running at http://127.0.0.1:3000");
})

