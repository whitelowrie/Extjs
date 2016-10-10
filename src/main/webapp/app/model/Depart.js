Ext.define('DataCart10.model.Depart', {
    extend: 'DataCart10.model.Base',

    //id的生成规则
    identifier:'uuid',

    fields:[
        {
            name:'id',
            type:'string'
        },{
            name:'name',
            type:'string'
        },{
            name:'code',
            type:'string'
        },{
            name:'describe',
            type:'string'
        },{
            name:'note',
            type:'string'
        }
    ],

    proxy:{
        type:'ajax',
        //四种不同的操作
        api:{
            //post
            create:'/mvc/depart/new',
            //get
            read:'/mvc/depart/load',
            //post
            update:'/mvc/depart/update',
            //post
            destory:'/mvc/depart/destory'
        },

        //告诉系统服务端的返回数据如何解析
        reader:{
            type:'json',
            rootProperty:'root',
            totalProperty:'total',
            successProperty:'success',
            messageProperty:'message'
        },
        //写入器
        writer:{
            type:'json',
            transform:{
                fn:function(data, request){
                	//判断是不是数组
                    if(!Array.isArray(data)){
                        var arrayData = new Array();
                        arrayData.push(data);
                        return arrayData;
                    }
                },
                scope:this
            }
        }
    }
});
