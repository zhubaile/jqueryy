/**
 * Created by lenovo on 2018/3/13.
 */
$(function(){
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

    function load(val){                                  //用jq设置li的内容
        $(".all .fander,.all .center").show();
                $(".lost").append("<li><input class='reo' type='checkbox' name='zbl'/> </input>" +
                    "<p>"+val+"</p>" +
                    "<a>×</a></li>");
            $("li").hover(function(){$("a").show();},function(){$("a").hide();});  //鼠标放在li上显示删除按钮，鼠标移除则消失；
        $("#lostcount").html(($("li>input").length));
/*        var $ele=$("li>input");
        //控制的变化的任务数量
        if(!$ele.prop("checked")) {
            $ele.length++;
        }else{
            $ele.length--;
        }
        $("#lostcount").html(($ele.length));*/
    }

    $("a").click(function(){
        for(var i=$("li").length-1;i>=0;i++){
            $("li[i]").remove();
        }
    });
    function yichu(){                                  //次方法为选中复选框的时候添加error样式;
        $('li>input').each(function(){             //选中li下面的input type=checkbox的值
            var $ele=$(this);
            if ($ele.prop("checked")) {
                $ele.next("p").addClass("error");
            } else {
                $ele.next("p").removeClass("error");
            }
        });
    }
    yichu();

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
    $(".fander-end").click(function(){
        $('li>input').each(function(){
            var $ele=$(this);
            if ($ele.prop("checked")) {
                $ele.closest("li").remove();
            }
        });
    });

});
