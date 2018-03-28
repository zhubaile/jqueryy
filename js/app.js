
$(function(){
    new Todos({
        itemsHbs: $("#todoItemsHbs").html(),
        footHbs: $("#todoFootHbs").html(),
        $todoInput: $("#todoInput"),
        $body: $("#body"),
        $foot: $("#foot")
    })
});
function Todos(options) {
    this.opts=$.extend({                                //$.extend遍历数组对象
        $todoInput: "", //todo 输入区
        $body: "",   //内容区 盒子jquery对象
        $foot: "",  //底部盒子jquery对象
        itemsHbs: "",//todos 内容区 模板
        footHbs:""// todos 底部 模板
    },options);
    this.todos={
        status: "all",  //all 所有  active 进行中（未完成）  completed 完成
        items: this.getItem()
    };
    this.event();
    this.render()
}

//扩展原型方法
$.extend(Todos.prototype,{
    //时间绑定
    event:function(){
        var _this=this;
        this.opts.$todoInput.on("keypress", function (event) {
            if (event.keyCode == "13") {
                var value = _this.opts.$todoInput.val();
                if (value){
                    _this.opts.$todoInput.val("");
                    _this.push(value);
                    _this.render()
                }
            }
        })
        //删除按钮 点击事件
        this.opts.$body.on("click", "a", function (event) {
            var $target = $(event.target)
            ,index = $target.attr("data-num");  //attr() 方法设置或返回被选元素的属性值。
            _this.pop(index);
            _this.render();
        })
        .on("change", "input.reo", function (event) {
            var $target = $(event.target)
                , index = $target.attr("data-num");
            _this.edit(index, $target.prop("checked"));
            _this.render();
        })
    },
    //界面渲染
    render: function () {
        var data=this.getData();
        this.opts.$body.html(Handlebars.compile(this.opts.itemsHbs)(data));
        this.opts.$foot.html(Handlebars.compile(this.opts.footHbs)(data));
    },
   /*  data 数据格式 {
        total:1,
        todos:{
            isAllChecked:true,
            items:[{title:'fsdf',completed:true}]
        },
        foot:{
            status:"all",
            num:1,
            isClean:true
        }
   }
   */
    getData:function(){
        var activeArr = [], completedArr = [], todoItems=[];
        this.todos.items.forEach(function (item, index){
            if (item.completed){
                completedArr.push(item)
            }else{
                activeArr.push(item);
            }
        })
        switch (this.todos.status) {
            case 'all':
                todoItems=this.todos.items
                break;
            case 'active':
                todoItems = activeArr
                break;
            case 'completed':
                todoItems = completedArr
                break;
            default:                        //default除了以上情况剩下的为此
                todoItems = this.todos.items
                break;
        }
        return {
            total: this.todos.items.length,
            todos: {
                isAllChecked: (this.todos.items.length == completedArr.length),
                items: todoItems
            },
            foot: {
                status: this.todos.status,
                completedNum: activeArr.length,
                isCleanBtn: (todoItems.length > 0)
            }
        };

    },
    push: function (title) {
        this.todos.items.push({
            completed:false,
            title: title
        });
        this.todos.total++;
        this.setItem(this.todos.items)
    },
    pop: function (index) {
        this.todos.items = $.grep(this.todos.items, function (value,eq) {
            if (index!=eq){
                return value
            }
        });
        (this.todos.total>0)&&(this.todos.total--);                                              //这句不明白什么意思?
        this.setItem(this.todos.items);
    },
    edit: function (index, completed) {
        this.todos.items = $.grep(this.todos.items, function (value, eq) {  //$.grep()数组过滤
            if (index == eq) {
                value["completed"]=completed;
            }
            return value
        });
        (this.todos.total > 0) && (this.todos.total--);
        this.setItem(this.todos.items);
    },
    //存储输入内容
    setItem: function (dataArr){
        localStorage.setItem("todos", JSON.stringify(dataArr));
    },
    //读取输入内容
    getItem:function() {
        var data=localStorage.getItem("todos");
        if(data){
           return JSON.parse(data);  //用来解析字符串
        }
        return [];
    }
});


/*
     *Handlebars helper 判断两个字符串是否相当
     * */
Handlebars.registerHelper('if_eq', function (left,right, options) {         //访问模板
    if (left == right) return options.fn(this);                                       //这句话也不明白什么意思?
    return options.inverse(this);
});
