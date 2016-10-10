/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('DataCart10.view.main.HeaderMenu', {
    //1.从哪个主键继承,尽量继承基类
    extend: 'Ext.Container',
    //2.取个别名alias,或者是xtype
    xtype:'headerGlobalMenu',
    //3.给这个组件设定一个id
    id:'header-glogbal-menu',
    //4.标题title
    title:'萨摩耶',

    initComponent:function(){

        var menu = Ext.create('Ext.menu.Menu',{
            width:30,
            items:[{
                text:'风格',
                menu:[{
                    text:'crisp',
                    group:'theme',
                    //选中的
                    checked:true
                },{
                    text:'neutral',
                    group:'theme'
                },{
                    text:'nepture',
                    group:'theme'
                }]
            },'-',{
                text:'关于',
                handler:'onClickAbout'
            },'-',{
                text:'退出',
                handler:'onClickExit'
            }]
        });

        this.items = [{
            xtype:'component',
            cls:'app-header-menu',
            margin:'0 5 0 0',
            //component是没有点击事件的，所以要用元素的事件代替
            listeners:{
                scope:this,
                click:function(e){
                    menu.showBy(this);
                },
                //还有一个值叫做body,点击整个body都有响应。el只有点击菜单才有反应
                element:'el'
            }
        }];
        this.callParent();
    }
});
