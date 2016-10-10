/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('DataCart10.view.main.ContentPanel', {
    extend: 'Ext.tab.Panel',

    xtype: 'content-tabpanel',
    id:'content-tabpanel',

    //也可以不要header直接加，这样的话就会停靠在顶端
    //header:{
    //    title: '工作区',
    //    glyph: 0xf108
    //},

   // tabBarHeaderPosition: 2,  //如果 配置了 tabBarHeaderPosition， 那么 标题将会和tab在一行 显示
                                //如果 不配置 ， 那 就 是 两行
    //headerPosition:'top',
    //
    //tabRotation:'default', // default, 0 , 1(旋转90度)，2（旋转270）
    //
    //titleRotation:'default', //标题旋转
    ////标题位置
    //titleAlgin:'right',
    ////图标相对文字位置
    //iconAlign:'right',


    requires:[
      'Ext.ux.TabReorderer'
    ],

    plugins:'tabreorderer',

    defaults:{
      closable:true
    },

    background:'777',

    //停靠工具栏
    dockedItems:{
        //停靠位置
        dock:'bottom',
        xtype:'toolbar',
        items:[{
            text:'test Toolbar',
            listeners:{
                click:'onDockedclick'
            }
        },{
            text:'test Toolbar1',
            listeners:{
                click:'onDockedclick'
            }
        },{
            text:'test Toolbar2',
            listeners:{
                click:'onDockedclick'
            }
        }]
    }
});
