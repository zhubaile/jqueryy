/**
 * Created by lenovo on 2018/3/13.
 */
$(function(){
    //2018-03-20 所问问题解答
    //选中的时候不知道为啥不增加class样式，（答：没找到你哪个地方是实现这个功能的，请标记）
    //li减少的时候，li.length的值不会跟着减少！（答：没找到你哪个地方是实现这个功能的，请标记）
    //还有li上面的叉，点击没反应（也没有弄成单个的li） （答：事件绑定问题，已调整）
    var field=$(".header-todo");              //定义输入框
    field.bind('keypress',function(event){             //键盘事件
        if(event.keyCode=="13"){                           //当按回车时候做出判断
           if(!field.val()){                         //如果输入框为空则alert提示
               alert("输入框不能为空");
           }else{
               load(field.val());
               field.val("").focus();                            //清除输入框的值
           }
        }
    });
    //=================事件绑定 start====================
    //鼠标移入li事件 
    $("#todoItems").on("mouseenter", "li", function (event) {
        var $target = $(event.target);
        $target.find("a").show()
    });
    //鼠标移出li事件 
    $("#todoItems").on("mouseleave", "li", function (event) {
        var $target = $(event.target);
        $target.find("a").hide()
    });
    //删除按钮 点击事件    
    $("#todoItems").on("click", "a", function (event) {
        var $target = $(event.target);
        $target.closest("li").remove();
    });
    //checkbox 选择改变事件
    $("#todoItems").on("change", "input", function (event) {
        var $target = $(event.target),
            isChecked = $target.prop("checked"),
            $targeLi = $target.closest("li");
            //可查看li已经添加此样式
        if (isChecked){
            console.log("li添加样式error")
            $targeLi.addClass("error")
        }else{
            console.log("li移除样式error")
            $targeLi.removeClass("error")
        }
    });

    //=================事件绑定 end====================


    function load(val){                                  //用jq设置li的内容
        $(".all .fander,.all .center").show();
                $(".lost").append("<li><input class='reo' type='checkbox' name='zbl'/> </input>" +
                    "<p>"+val+"</p>" +
                    "<a>×</a></li>");
                    //add by zhanglizhao
                    //有没有发现一个bug，有多个li时，移动到任意一个li上，删除按钮就全部出来





        /*
        //以下删除，移动到上放，因为事件绑定放到这里，每次执行load方法就绑定一次事件
        //将会导致事件多次绑定，
        $("#todoItems").on("mouseenter", "li", function (event) {
         //10此 header-todo 的input回车后，此处当鼠标移入后执行十次。 
         //这个地方要是还不懂在问我
            var $target=$(event.target);
            $target.find("a").show()
        });
        $("#todoItems").on("mouseleave", "li", function (event) {
            var $target = $(event.target);
            $target.find("a").hide()
        }); */
        //$("li").hover(function(){$("a").show();},function(){$("a").hide();});




        $("#lostcount").html(($("li>input").length));                    //li减少的时候，li.length的值不会跟着减少！

        
    }
    //add by zhanglizhao 
    //解决li上面的叉，点击没反应问题，a元素的事件绑定未绑定上
    //解释：
    //$("a").click(function(){})  与 $("a").on("click",function(){}) 是相等的
    //意思是在 在a元素上绑定点击事件，此时a元素必须存在dom中，即$("a")必须有值，否则事件绑定不上，即function无回调
    //$("#todoItems").on("click", "a", function (event) {});  
    //的意思是在id为todoItems的元素下的a元素上绑定事件，此时$("#todoItems")必须有值，
    //下面的a元素可以是后来添加的


   /* 
   //如果想达到此效果，不能用这个方法，故移除此方法
   function yichu(){                                  //次方法为选中复选框的时候添加error样式;
        $('li>input').each(function(){           //选中的时候不知道为啥不增加class样式?
            var $ele=$(this);
            if ($ele.prop("checked")) {
                $ele.next("p").addClass("error");
            } else {
                $ele.next("p").removeClass("error");
            }
        });
    }
    yichu(); */






    $(".center-all").click(function(){         //全选或者全不选按钮
        var i=0;
        var coll=$("li>input");
        if(coll[i].checked){
            for(var i=0;i<coll.length;i++){
                coll[i].checked=false;
            }
        }else{
            for(var i=0;i<coll.length;i++){
                coll[i].checked=true;
            }
        }
    });

    $(".btn.one").click(function(){     //点击所有按钮的时候显示所有li
        $(".btn.one").addClass("bode").siblings().removeClass("bode");
        $('li>input').each(function(){
            var $ele=$(this);
            if ($ele.prop("checked")) {                    //prop（）为了检索属性值，设置或返回被选元素的属性和值
                $ele.closest("li").show();                      //closest()   这个为查找父级元素的；
            } else {
                $ele.closest("li").show();
            }
        });
    });         //

    $(".btn.two").click(function(){     //点击未完成按钮的时候显示所有checked=flase的li
        $(".btn.two").addClass("bode").siblings().removeClass("bode");
        $('li>input').each(function(){             //选中li下面的input type=checkbox的值
          var $ele=$(this);
           if ($ele.prop("checked")) {
               $ele.closest("li").hide();
           } else {
               $ele.closest("li").show();
           }
       });
    });
    $(".btn.three").click(function(){     //点击未完成按钮的时候显示所有checked=true的li
        $(".btn.three").addClass("bode").siblings().removeClass("bode");
        $('li>input').each(function(){
            var $ele=$(this);
            if ($ele.prop("checked")) {
                $ele.closest("li").show();
            } else {
                $ele.closest("li").hide();
            }
        });
    });
    $(".fander-end").click(function(){                   //清理按钮
        $('li>input').each(function(){
            var $ele=$(this);
            if ($ele.prop("checked")) {
                $ele.closest("li").remove();
            }
        });
    });

});
