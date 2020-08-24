/*
//以下是我们准备的NodeJs服务器端  server.js 代码:
var http = require('http')
var fs   = require('fs');
var server = http.createServer(function(req,res){
	var urlStr = req.url;
    var filePath = './'+urlStr;
    var data = fs.readFileSync(filePath);

    /*设置响应头 实现强缓存  以下的NodeJs代码设置的响应头表示请求文件设置为10s后到期,
    到期后需要再次请求*/

    // res.setHeather("Expires",new Date(Date.now() + 10000));

    /*设置响应头 实现强缓存 Cache-control的优先级高于 
    Expires(如果两者同时存在，优先按照Cache-control设置的时间)
    */
   // res.setHeader('Cache-control','max-age=10');

   /*设置响应头 设置Cache-Control: no-cache
   来告诉浏览器不缓存文件,每次都发送请求到服务器
   */
/*
   res.setHeader('Cache-control','no-cache');
   res.end(data); 
});
server.listen(3000,'127.0.0.1',function(){
	console.log('Sever is running at http://127.0.0.1:3000')
})
*/


/*
//以下是我们准备的NodeJs服务器端  server.js 代码:
var http = require('http');
var fs   = require('fs');
var server = http.createServer(function(req,res){
    var urlStr = req.url;
    var filePath = './'+urlStr;
    //设置一个较短缓存时间的强缓存用来测试
    res.setHeader('Cache-control','max-age=1');
    //获取文件的修改时间信息
    var statObj= fs.statSync(filePath)
    var ctime = statObj.ctime.toGMTString()
    //设置协商缓存 使用Last-Modified
    res.setHeader('Last-Modified',ctime)
    /*但是 Last-Modified 存在一些缺陷：
	Last-Modified 标注的最后修改只能精确到秒级，如果某些文件在 1 秒钟以内，被修改多次的话，
	它将不能准确的标注，有可能存在服务器没有准确获取文件修改时间
	*/
	/*
    //获取请求头的if-modified-since
    var ifModifiedSince = req.headers['if-modified-since']

    //比较更新时间
    if(ifModifiedSince && ifModifiedSince===ctime){
        res.statusCode=304
        return res.end()
    }
    var data = fs.readFileSync(filePath)
    res.end(data);
});

server.listen(3000,'127.0.0.1',function(){
    console.log("Server is running at http://127.0.0.1:3000");
})

*/


//以下是我们准备的NodeJs服务器端  server.js 代码:
var http = require('http');
var fs   = require('fs');
var crypto = require('crypto')
var server = http.createServer(function(req,res){
    var urlStr = req.url;

    var filePath = './'+urlStr;
    //设置一个较短缓存时间的强缓存用来测试
    res.setHeader('Cache-control','max-age=1');
    //读取文件
    var data = fs.readFileSync(filePath)
    //根据文件内容生成的hash字符串的签名
    var hash = crypto.createHash('md5').update(data).digest('base64')
    //设置签名的协商缓存
    res.setHeader('Etag',hash)
    //获取请求头的if-none-match
    var ifNoneMatch = req.headers['if-none-match']
    //比较
    if(ifNoneMatch === hash){
        res.statusCode=304
        return res.end()
    }

    res.end(data);
});

server.listen(3000,'127.0.0.1',function(){
    console.log("Server is running at http://127.0.0.1:3000");
})