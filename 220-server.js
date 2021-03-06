var http = require('http');
var fs   = require('fs');
var url = require('url')
var server = http.createServer(function(req,res){
    var urlStr = req.url;
    var method = req.method;
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
            var obj = {
                code:0,
                status:'ok',
                data:{}
            };
            //模拟只有用户名李雷 已经存在

            if(parm.username == '李雷'){
                obj.data.exist = 1
            }else{
                obj.data.exist = 1
            }
            var json = JSON.stringify(obj)
            res.setHeader('Content-Type','application/json')
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