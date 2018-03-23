/**
 * Created by lenovo on 2018/3/13.
 */
$(function(){
    //2018-03-20 所问问题解答
    //选中的时候不知道为啥不增加class样式，（答：没找到你哪个地方是实现这个功能的，请标记）
    //li减少的时候，li.length的值不会跟着减少！（答：没找到你哪个地方是实现这个功能的，请标记）
    //还有li上面的叉，点击没反应（也没有弄成单个的li） （答：事件绑定问题，已调整）
    var field=$(".header-todo");              //定义输入框
    field.bind('keypress',function(event){             //键盘事件  bind() 方法为被选元素添加一个或多个事件处理程序，并规定事件发生时运行的函数。
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
        var $target = $(event.target);                    //target规定那个元素触发事件
        $target.closest("li").remove();
        dianji()
    });
    //checkbox 选择改变事件
    $("#todoItems").on("change", "input", function (event) {
        var $target = $(event.target),
            isChecked = $target.prop("checked"),
            $targeLi = $target.next("p");
            //可查看li已经添加此样式    
        if (isChecked){
            $targeLi.addClass("error")
        }else{
            $targeLi.removeClass("error")
        }
        dianji()
    });




    //根据复选框的未选中状态来显示span的数值
    //缺陷：当选中复选框的时候，span里面的数值不会自动减少。
    //解释：方法调用位置不正确，span数值改变的地方有哪些？
    //1、新增li时  2、li的checkbox改变时 3、删除todo时  （还有哪些我没想到呢）
    //这些地方才是执行这个方法的位置
    function dianji(){
        var $aaa=$("li>input:checkbox").not("input:checked");
        if(!$aaa){
            $aaa.length-=1;
        }
        $("#lostcount").html($aaa.length);  //显示复选框未被选中的值
        reveal(); cla();
    }

    function reveal(){       //当li为o的时候，隐藏两个界面
        var $over=$("li>input").length;
        if($over==0){
            $(".all .fander,.all .center").hide();
    }
    }
/*    function cla(){                 //当选中 复选框的时候，清理完成按钮显示，否则移除
        $('li>input').each(function(){
            //var $ele=$(this);
            for(var j=0;j<$("li>input").length-1;j++){
                if ($('li>input').eq().prop("checked")) {
                    $(".fander-end").show();
                }else{
                    $(".fander-end").hide();
                }
            }
        });
    }*/
    function cla() {
        var $liInput = $('li>input');//,hasCheckBox=false;
        $(".fander-end").hide();
        $liInput.each(function (item,index) {
            if ($liInput.eq(index).prop("checked")) {
               // hasCheckBox=true;
                $(".fander-end").show();
            }
        });
        //hasCheckBox ? $(".fander-end").show() : $(".fander-end").hide();
    }




    //=================事件绑定 end====================
    function load(val) {                                  //用jq设置li的内容
        $(".all .fander,.all .center").show();
        $(".lost").append("<li><input class='reo' type='checkbox' name='zbl' /> </input>" +
            "<p>" + val + "</p>" +
            "<a>×</a></li>");
        dianji();
    }
                    
        /*
        //以下删除，移动到上放，因为事件绑定放到这里，每次执行load方法就绑定一次事件
        //将会导致事件多次绑定，
         //10此 header-todo 的input回车后，此处当鼠标移入后执行十次。
         //这个地方要是还不懂在问我
        $("#todoItems").on("mouseenter", "li", function (event) {
            var $target=$(event.target);
            $target.find("a").show()
        });                                                           //这样是对的，mouseenter，mouseleave为hover的两个状态
        $("#todoItems") .on("mouseleave","li",function(event){
            var $target=$(event.target);
            $target.find("a").hide();
        });*/


    //add by zhanglizhao 
    //解决li上面的叉，点击没反应问题，a元素的事件绑定未绑定上
    //解释：
    //$("a").click(function(){})  与 $("a").on("click",function(){}) 是相等的
    //意思是在 在a元素上绑定点击事件，此时a元素必须存在dom中，即$("a")必须有值，否则事件绑定不上，即function无回调
    //$("#todoItems").on("click", "a", function (event) {});  
    //的意思是在id为todoItems的元素下的a元素上绑定事件，此时$("#todoItems")必须有值，
    //下面的a元素可以是后来添加的
    $(".center-all").click(function(){         //全选或者全不选按钮
        var i=0;
        var coll=$("li>input");
        if(coll[i].checked){
            for(var i=0;i<coll.length;i++){
                coll[i].checked=false;
                $("li>input").next("p").removeClass("error");
            }
        }else{
            for(var i=0;i<coll.length;i++){
                coll[i].checked=true;
                $("li>input").next("p").addClass("error");
            }
        }
        dianji();cla();
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
    });

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
        reveal();
    });

});
