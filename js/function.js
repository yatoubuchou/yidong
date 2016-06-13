// 封装函数
// 需求：处理getclass的兼容性问题
// 处理在一个对象下面去找对应的元素
function getClass(classname,obj){ // 创建函数（两个参数 类名 对象）
 var obj=obj||document;     //默认值为document
 if(obj.getElementsByClassName){
 	return obj.getElementsByClassName(classname);//返回值
 }else{
 	var arr=[];                 //新建空数组
 	var alls=document.getElementsByTagName("*");//获取所有元素
 	for(var i=0;i<alls.length;i++){
 		if(checkClass(alls[i].className,classname)){ //检测类名
 			arr.push(alls[i]);   //向数组的末尾添加新的元素
 		}
 	}
 	return arr; //返回数组
 }
}
getClass("one");

// 检测类名
function checkClass(search,match){ //调入类名，匹配类名
	var brr=search.split(""); //字符分割成数组
	for(var i=0;i<brr.length;i++){
		if(brr[i]==match){//如果数组中的元素匹配，返回成功
			return true;
		}
	}
	return false;
}
// 封装函数
// 需求：处理textContent innerText的兼容性问题
// 内容、属性、样式操作1
  function getInner(obj,value){
    	if(obj.textContent){
    		if(value==undefined){  //没有传value值,默认为undefined
    			return obj.textContent;
    		}else{
    			return obj.textContent=value;
    		}
    		if(value==undefined){  //没有传value值,默认为undefined
    			return obj.innerText;
    		}else{
    			return obj.innerText=value;
    	}
    }
}
2
function getInner(obj,value){
	if(obj.textContent){
		if(value==undefined){
			return obj.textContent;
		}else{
			return obj.textContent=value;
		}
		if(value==undefined){
			return obj.innerText;
		}else{
			return obj.innerText=value;
}
	}
}
// 封装函数
// 需求：处理currentStyle getComputeStyle的兼容性问题
function getStyle(obj,style){
	if(obj.currentStyle){
	  return obj.currentStyle[style];
	}else{
		return  getComputedStyle(obj,null)[style];
	}
}
// 封装函数
// 需求：处理"#one" ".one" "div"的兼容性问题
function $(search, obj) {
	var obj=obj||document;
	if(typeof(search)=="string"){
		if (search.charAt(0) == "#") {
			return document.getElementById(search.substr(1));
		}
		if (search.charAt(0) == ".") { //判断是否为类
		return getClass(search.substr(1), obj);
	}else{
		return obj.getElementsByTagName(search);
	}
}else if(typeof(search)=="function"){
		window.onload=function(){
			search();
		}
	}
}
//  封装$函数
	window.onload=function(){
		var pictures=$(".picture");//调用$函数查找类名里imgs的元素
		var dians=$("dian-lis");//调用$函数查找类名里dian-lis的元素
		var left=$(".left")[0];//调用$函数查找类名里left的元素
		var right=$(".right")[0];//调用$函数查找类名里right的元素
		var box=$(".box")[0];//调用$函数查找类名里box的元素
		var n=0;
		var t=setInterval(move,1000); // 调用setInterval元素设置时间函数
		function move(type){
			if(type=="1"){
			 n--;
			if(n<0){
				n=pictures.length-1;	
			}
		}else{
			if(n>=pictures.length){
				n++;
			}
		}
			  for(var i=0;i<pictures.length;i++){
				pictures[i].style.display="none";//让所有图片都消失
				dians[i].style.background=("#000");
				   }
				pictures[n].style.display="block";
				dians[n].style.background="red";
			}
			 box.onmouseover=function(){ ////创建鼠标移入函数
                clearInterval(t); //清除时间函数
              }
              box.onmouseout=function(){
              	t=setInterval(move,1000);
              }
			for(var i=0;i<dians.length;i++){
			dians[i].index=i; //给每个表格赋值index值
			dians[i].onclick=function(){  //创建鼠标点击函数
				for(var i=0;i<pictures.length;i++){
              	pictures[i].style.display="none";
                dians[i].style.background="#000";
              }
                pictures[this.index].style.display="block";
                dians[this.index].style.background="red";
                n=this.index;
            }
          } 
            right.onclick=function(){
            	move();
             }
            left.onclick=function(){
            	move("1");
            }
        }

 // 元素节点
 // window.onload=function(){
 	function getChilds(obj,type){
 		var type=type||"a"; //默认值为a
 		var all=obj.childNodes;//获取所有元素节点
 		var arr=[];
 		for(var i=0;i<all.length;i++){ //循环所有元素
 			if(type=="a"){ 
 				if(all[i].nodeType==1){//如果所有元素的数值类型是第一个元素的时候
 					arr.push(all[i]);//增加元素
 				}
 			}else if(type=="b"){//否则默认值为b
 				 if(all[i].nodeType==1||(all[i].nodeType==3&&all[i].nodeValue.replace(/^\s*|\s*$/g,""))){
 				 	arr.push(all[i]);//增加元素
 				}
 			}
 		}
 		return arr;
	}	
function getFirst(obj) {
	return getChilds(obj)[0];
}

function getLast(obj) {
	var nub = getChilds(obj);
	return nub[nub.length - 1];
}

function getNext(obj, type) {
	var next = obj.nextSibling;
	var type = type || "a";
	if (next == null) {
		return false;
	}
	if (type == "a") {
		while (next.nodeType == 3 || next.nodeType == 8) {
			next = next.nextSibling;
			if (next == null) {
				return false;
			}
		}
	} else if (type == "b") {

		while ((next.nodeType == 3 && !next.nodeValue.replace(/^\s*|\s*$/g, "")) || next.nodeType == 8) {
			next = next.nextSibling;
			if (next == null) {
				return false;
			}
		}
	}
	return next;
}

function getPrevious(obj) {
	var next = obj.previous;
	var type = type || "a";
	if (next == null) {
		return false;
	}
	if (type == "a") {
		while (next.nodeType == 3 || next.nodeType == 8) {
			next = next.previous;
			if (next == null) {
				return false;
			}
		}
	} else if (type == "b") {

		while ((next.nodeType == 3 && !next.nodeValue.replace(/^\s*|\s*$/g, "")) || next.nodeType == 8) {
			next = next.previous;
			if (next == null) {
				return false;
			}
		}
	}
	return next;
}

function insertBefore(obj, before) {
	var parent = before.parentNode;
	parent.insertBefore(obj, before)
}

function insertAfter(obj, after) {
	var next = getNext(after);
	var parent = after.parentNode;
	if (next) {
		insertBefore(obj, next)
	} else {
		parent.appendChild(obj)
	}
}
        
// 事件绑定（封装添加事件函数）
function addEvent(obj,event,fun){
	if(obj.attachEvent){//判断浏览器
		 obj.attachEvent("on"+event,fun);
	}else{
		obj.addEventListener(event,fun,false);
	  }
	}
// 删除事件函数
function removeEvent(obj,event,fun){
	if(obj.detachEvent){//判断浏览器
		 obj.detachEvent("on"+event,fun);
	}else{
		obj.removeEventListener(event,fun,false);
	  }
	}

// 封装滚轮函数
	function mouseWheel(obj,funUp,funDown){
		if(obj.attachEvent){
			obj.attachEvent("onmousewheel",scroll);
		}else if(obj.addEventListener){
		obj.addEventListener("DOMMouseScroll",scroll,false);
        obj.addEventListener("mousewheel",scroll,false);
	}
   function scroll(e){
        var ev=e||window.event;
        var d=ev.wheelDelta||ev.detail;
          if(d==-120||d==3){
          	if(funDown){
          		funDown();
          	  }
          	}else if(d==120||d==-3){
          		if(funUp){
          		funUp();	
          		}	
          	}
          	
          	}

          }
   




