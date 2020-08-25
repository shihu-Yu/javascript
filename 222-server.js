var http = require('http');
var fs   = require('fs');
var url = require('url')
var server = http.createServer(function(req,res){
    var urlStr = req.url;
    var method = req.method;
    // var cookie = req.headers['cookie']
    // console.log(req.headers['cookie'])
    // 响应头2,Access-Control-Allow-Credentials,可选设置,表示是否允许发送Cookie。
    res.setHeader("Access-Control-Allow-Credentials",true)

    /* 响应头3,Access-Control-Expose-Headers,可选设置,
    设置允许客户端通过getResponseHeader方法获取的字段,多个字段用逗号分隔。
    */
    res.setHeader("Access-Control-Expose-Headers","Content-Type")

   
    if(method == 'POST'){
        var body = ''
        req.on('data',function(chunk){
            body += chunk
        })
        req.on('end',function(){
            var json = JSON.stringify({
            code:0,
            status:'ok',
            data:JSON.parse(body)
        })
        res.setHeader('Content-Type','application/json')
        return res.end(json);
    })
}
    else if(method == 'GET'){
        if(urlStr.search(/\?/) != -1){
        var parm = url.parse(urlStr,true).query;
        var json = JSON.stringify({
            code:0,
            status:'ok',
            data:parm
        });
        res.setHeader('Content-Type','application/x-www-form-urlencoded')
        return res.end(json);
    }
    var filePath = './'+urlStr;
    var data = fs.readFileSync(filePath)
    return res.end(data);
    }
    
});

server.listen(3000,'127.0.0.1',function(){
    console.log("Server is running at http://127.0.0.1:3000");
})