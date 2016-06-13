 // 第一个轮播 
    $(function(){
      function one(){
      	var box=$(".box")[0];
        var pictures=$(".picture");
        var dians=$(".dian-lis");
        var right=$(".right")[0];
        var left=$(".left")[0];
        var n=0;
        var t=setInterval(move,2000);
        function move(type){
        	if(type=="1"){
        		n--;
        		if(n<0){
        			n=pictures.length-1;
        		}
        	}else{
        		n++;
        		if(n>=pictures.length){
        			n=0;
        		}
        	}	
        	for(var i=0;i<pictures.length;i++){
        	dians[i].style.background="#ccc";
        	pictures[i].style.display="none";
        }	
            dians[n].style.background="#E5268B"
            pictures[n].style.display="block";
        }
       box.onmouseover=function(){
       	    clearInterval(t);
            left.style.display="block";
            right.style.display="block";
        }
      box.onmouseout=function(){
       	   t=setInterval(move,2000);
           left.style.display="none";
           right.style.display="none";
       }
       for(var i=0;i<dians.length;i++){
       	  // dians[i].index=i;
       	  dians[i].onclick=function(){
       	  	for(var i=0;i<pictures.length;i++){
       	  	   dians[i].style.background="#ccc";
               pictures[i].style.display="none";	
       	  	}
       	     pictures[this.index].style.display="block";
             // dians[this.index].style.background="#E5268B"
             n=this.index;
        }
    }
     right.onclick=function(){
     	move();
     }
     left.onclick=function(){
     	move("1");
     }
      }one();
 // 第二个轮播
  var imgs=$(".tus")[0]
  var left1=$(".left1")[0]
  var right1=$(".right1")[0]
  var box=$(".turn")[0]
  // var boss=$(".tus")
  // var width=parseInt(getStyle(box,"width"));
  // var n=0
  var flag=true
  var t=setInterval(move,3000)
  function move(){
    if(!flag){
      return
    }
    flag=false
           var img=getFirst(imgs)
           animate(imgs,{left:-292},500,function(){
            imgs.appendChild(img)
            imgs.style.left=0
            flag=true
           })
       }
    function move1(){
      if(!flag){
        return
    }   
      flag=false
    var img=getFirst(imgs)
    var img1=getLast(imgs)
    imgs.insertBefore(img1,img)
    imgs.style.left=-292+"px"
    animate(imgs,{left:0},500,function(){
        flag=true
      })
    }
  box.onmouseover=function(){
      clearInterval(t)
    }  
    box.onmouseout=function(){
      t=setInterval(move,3000)
    }        
  left1.onclick=function(){
    move()
  }
  right1.onclick=function(){
    move1()
  }

 
      


 })