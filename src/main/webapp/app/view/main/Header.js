/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('DataCart10.view.main.Header', {
    //1.从哪个主键继承,尽量继承基类
    extend: 'Ext.toolbar.Toolbar',
    //2.取个别名alias,或者是xtype
    alias: 'widget.topheader',
    //3.给这个组件设定一个id
    id:'app-header',
    //4.标题title
    title:'萨摩耶',
    //5.高度宽度
    height:52,

    //8.定义控制器
    //controller:'main',
    //9.viewModel
    //模板方法 initComponent



    initComponent:function() {
        //定义自己的逻辑
        //this.callParent()

        //document.title = this.title;

        this.items = [{
            id:'app-header-logo',
            xtype:'component'
        },{
            id:'app-header-title',
            xtype:'component',
            html:this.title
        },
        //后面添加的菜单都在右边
         '->',
        {
            text:'下载',
            glyph:0xf0ed
        },
        {
            text:'访问北风网',
            glyph:0xf1e5,
            handler:'oVisitWeb'
        },{
            text:'系统菜单',
            glyph:0xf0c9,
            menu:[{
                    text:'风格'
                },
                '-',
                {
                    text:'关羽'
                },
                '-',
                {
                text:'退出'
            }]
        }];
        this.callParent();
    }
});
