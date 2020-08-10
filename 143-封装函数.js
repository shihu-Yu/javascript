	function animate(elem,attr,target,callback){
    //防止同时开启多个定时器,在设置定时器前需要清除定时器
    clearInterval(elem.timer);
    //定义速度
    var speed = 0;
    //多物体同时运动时需要把定时器ID保存在元素对象上避免各个物体动画之间的干扰
    elem.timer = setInterval(function(){
        //透明值的获取需要用getComputedStyle方法,透明值的设置不需单位,因此封装函数时需要分别处理
        var current = parseFloat(getComputedStyle(elem,false)[attr]);
        if(attr == 'opacity'){
            current = Math.round(current * 100);
        }
        //速度正负的决定由当前值和目标值的大小关系来决定
        //当前值大于目标值的话为负速度
        if(current > target){
            speed = -10;
        }
        //当前值小于目标值的话为正速度
        else{
            speed = 10;
        }
        /**
         * 动画结束的条件
         * 1.速度一般需要根据需求调整,通常不能保证运动结束时恰好到达目标值,所以不能用当前值等于目标值来做为动画结束的条件
         * 2.动画结束的条件应当是当目标值和当前值的差不够一次速度的改变时,直接把元素改为目标值并且结束动画
         */
        //当目标值和当前值的差不够一次速度的改变时
        if(Math.abs(target - current) < Math.abs(speed)){
            //直接把元素改为目标值
            if(attr == 'opacity'){
                elem.style.opacity = target / 100;
            }else{
                elem.style[attr] = target + 'px';
            }
            //结束动画
            clearInterval(elem.timer);
            //执行回调函数
            typeof callback == 'function' ? callback() : null
        }
        //当目标值和当前值大于一次速度改变时
        else{
            if(attr == 'opacity'){
                elem.style.opacity = (current + speed)/100; 
            }else{
                elem.style[attr] = current + speed + 'px';
            }
        }
    },30)
}