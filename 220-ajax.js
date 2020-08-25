function ajax(options){
		var method = options.method  || 'GET'

		var url = options.url || ''

		var data = options.data || {}

		var xhr = new XMLHttpRequest();

		var mime;

		if(method == 'GET'){
			var query = ''
			for(var key in data){
				query += key + '=' + data[key] + '&'
			}
			query = '?' + query.slice(0,-1)
			url = url + query
			mime = 'application/x-www-form-urlencoded'
			data = ''
		}else if(method == 'POST'){
			mime = 'application/json'
			data = JSON.stringify(data)
		}
	    xhr.open(method,url,true);

	    
	   mime ? xhr.setRequestHeader('Content-Type',mime) : null ;

	    
	    xhr.send(data);

	    xhr.onreadystatechange = function(){
	    	if(xhr.readyState == 4){
            
            if(xhr.status == 200){
                try{
                    var obj = JSON.parse(xhr.responseText);
                    typeof options.success == 'function' ? options.success(obj) : null
                }catch(e){
                    typeof options.error == 'function' ? options.success(xhr.status,e) : null
                }
            }
            
            else{
                typeof options.error == 'function' ? options.success(xhr.status) : null
            }
        }
	}
}