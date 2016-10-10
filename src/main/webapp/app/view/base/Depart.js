/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('DataCart10.view.base.Depart', {
    extend: 'Ext.grid.Panel',

    xtype:'departManage',
    //controller:'base-user',

    //viewModel:{
    //    type:'base-user'
    //},
    //视图再被实例化的时候会创建一个session的对象
    session: true,
    requires:[
        'Ext.toolbar.Paging',
        'DataCart10.view.base.DepartController',
        'DataCart10.view.base.DepartModel',
        'DataCart10.model.Depart',
        'DataCart10.view.base.DepartForm'
    ],

    controller:'base-depart',

    viewModel: {
        type: 'base-depart'
    },

    bind:{
      store:'{departStore}'
    },
    //定义顶部工具条,默认就是添加按钮
    tbar:[{
        text:'新&nbsp;&nbsp;&nbsp;增',
        width:100,
        tooltip:'添加一个部门的系统',
        handler:'onNew'
    },'-',{
        text:'删&nbsp;&nbsp;&nbsp;除',
        width:100,
        tooltip:'选择删除',
        handler:'onBatchDel'
    },'-',{
        text:'数据同步',
        width:100,
        tolltip:'数据同步到府服务'
    }],

    bbar:{
        reference:'departpagingtoolbar',
        xtype:'pagingtoolbar',
        bind:{
          store:'{departStore}'
        },
        displayInfo:true,
        displayMsg:'{0} - {1} of {2}',
        emptyMsg:'没有要显示的数据'
    },

    columns:[{
        text:'部门编码',
        width:80,
        dataIndex:'code'
    },{
        text:'部门名称',
        width:80,
        dataIndex:'name'
    },{
        text:'部门描述',
        width:80,
        dataIndex:'describe'
    },{
        text:'备注',
        width:80,
        dataIndex:'node'
    },{
        xtype:'widgetcolumn',
        width:90,
        widget:{
            xtype:'button',
            text:'修改',
            handler:'onEdit'
        }
    },{
        xtype:'widgetcolumn',
        width:90,
        widget:{
            xtype:'button',
            text:'删除',
            handler:'onDel'
        }
    }],

    listeners: {
        afterlayout:{
            fn:'onAfterLayout',
            delay:1,
            single:true
        }
    }
});
