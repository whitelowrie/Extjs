/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('DataCart10.view.main.MainMenu', {
    extend: 'Ext.panel.Panel',

    alias:'widget.mainmenu',
    title:'系统菜单',
    glyph:0xf0c9,
    frame:true,
    collapsible:true,
    width:'20%',
    minWidth:100,
    height:'80%',
    split: true,
    layout: {
        type: 'accordion',
        animate:true
    },
    requires:[
        'Ext.tree.Panel'
    ],

    viewModel:'main',

    controller:'main',

    initComponent:function(){
        //通过apply方法追加一个items
        var me = this;
        me.items = [];
        var menus = me.getViewModel().get('leftMenu.menuGroup');

        function makeTreeStore(group){
            //1、实话一个treeStore

            var tree = Ext.create('Ext.data.TreeStore',{
                root:{
                    text:group.text,
                    expanded:true,
                    leaf:false
                }
            });
            //2、通过实例得到根节点
            var root = tree.getRootNode();
            var menuItems = group.menuItems;
            for(var i in menuItems){
                var item = menuItems[i];
                var childNode = Ext.apply({},{
                    text:item.text,
                    leaf:true,
                    iconCls: 'x-fa fa-database',
                    moduleId:item.module,
                    modelName:item.text,
                    id:item.module
                });
                root.appendChild(childNode);
            }
            //3、循环每个分组下的模块项，得到模块项的配置注入tree
            return tree;
        }

        for(var i in menus){
            //取到我们的每一个功能分组
            var menuGroup = menus[i];
            //实例化treepanel
            var groupPanel = Ext.create('Ext.tree.TreePanel',{
                header:{
                    title:menuGroup.text,
                    //数据库图标
                    //没用
                    //glyph:0xf1c0
                },

                rootVisible:false,
                store:makeTreeStore(menuGroup)
                //listeners:{
                //   // select:'onMenuItemSelect'
                //}
            });
            me.items.push(groupPanel);
        }

        this.callParent();
    }


});
