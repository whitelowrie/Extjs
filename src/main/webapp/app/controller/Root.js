Ext.define('DataCart10.aap.controller.Root',{
    extend:'Ext.app.Controller',

    //自动添加get , set
    config: {
        //告诉系统你要控制谁，谁的哪个事件
        control: {
            //是mainmenu 里面
            'mainmenu treepanel': {
                select: 'onMenuSelectForRout'
            }
        },
        //把需要用到的视图组件引过来，方便些控制逻辑
        refs: {
            mainMenu: 'mainmenu',
            contentPanel: 'content-tabpanel'
        },

        routes : {
            //泛匹配
            ':id':{
                action:'handleRout',
                before:'beforeHandleRout'
            }
            //'userManage':'handleUser',
            //'roleManage':'handleRole'
        }
    },

    handleRout:function(id){
        ////1.菜单聚焦
        var me = this,
            node = me.fineAndFocusNode(id),
            contentPanel = me.getContentPanel();
            moduleId = id;
        //2.执行模块切换

        //var className = Ext.ClassManager.getByAlias('widget.'+id);
        ////console.log(className);
        ////var viewClass = Ext.ClassManager.get(className);
        ////console.log(viewClass);
        //var module = new className();

        Ext.suspendLayouts();


        //
        // 配置tab, 1:配置itemId, 2:title, 3:closable
        //
        //第一种方式
        // module = Ext.apply(module,{
        //    itemId:id,
        //    glyph:0xf097,//0xf0ce,
        //    title:node.get('text'),
        //    tooltip:node.get('text')
        //});

        //第二种方式
        module = Ext.apply({},{
            itemId:id,
            xtype:id,
            glyph:0xf097,//0xf0ce,
            title:node.get('text'),
            tooltip:node.get('text')
        });

        this.addTab(contentPanel,module);
        //2、需要安装tab到我们的tabpanel

        ////删除panel中的其他东西
        //contentPanel.removeAll(true);
        ////添加进入panel
        //contentPanel.add(module);
        ////更新panel
        //this.updateTitle(contentPanel,node);

        Ext.resumeLayouts(true);
    },
    addTab:function(contentPanel,module){

        console.log(module)
        //得到contentPanel
        var tabs = contentPanel,

            //如果是实例可以使用getItemId
            //id = module.getItemId(),
            //如果是配置内容可以直接获得
            id = module.itemId,
            //查找指定的tabpanel里面是否含有需要端架的tab

            tab = tabs.items.getByKey(id);
        //console.log(tabs);
        if(!tab){
            tab = tabs.add(module);
        }
        tabs.setActiveTab(tab);
    },
    beforeHandleRout:function(id,action){
        //判断当前浏览器给出的编号的合法性
        //如果合法就放行

        var me = this,
            node = me.fineNode(id);

        if(node){
            action.resume();
        }else{
            Ext.Msg.alert('系统错误','请求模块不存在' + id,function(){
                me.redirectTo(me.getApplication().getDefaultToken());
            });
        }
    },

    fineNode:function(id){
        //1、找到treepanel
        var me = this,
            mainMenu = me.getMainMenu()
            ////组件查找，只有在panel里面才有的
            menuTree = mainMenu.query('treepanel'),
            node = null;

        //2.循环treepanel,判断每个treepanel有没有这个id对应的模块

        Ext.Array.each(menuTree, function(tree){
            //首先得到store
            var store = tree.getStore();
            //
            node = store.getNodeById(id);
            if(node)
                return false;
        });

        return node;
    },
    fineAndFocusNode:function(id){
        //1、找到treepanel
        var me = this,
            mainMenu = me.getMainMenu(),
        //组件查找，只有在panel里面才有的
            menuTree = mainMenu.query('treepanel');
        node = null;
        //2.循环treepanel,判断每个treepanel有没有这个id对应的模块

        Ext.Array.each(menuTree, function(tree){
            var store = tree.getStore();
            node = store.getNodeById(id);
            if(node)
                //选中tree里面的数据
                var selectionModel = tree.getSelectionModel();
                selectionModel.select(node);
                tree.getView().focusNode(node);
                return false;
        });

        return node;
    },
    handleId:function(id){
        alert(id);
    },

    beforeHandleId:function(id,action){
      if(id === 'userManage'){
          //继续执行
          action.resume();
      }else{
          //停止
          action.stop(true);
      }
    },

    handleUser:function(){
        alert('handleUser');
    },
    handleRole:function(){
        alert('handleRole');
    },
    onMenuSelect:function(tree,record,index,eOpts){
        var me = this,
            contentPanel = me.getContentPanel();
            moduleId = record.get('moduleId');

        //实例化组件
        //var widget = Ext.widget(record.get('paneXtype'));
        //反射得到组件
        var className = Ext.ClassManager.getByAlias('widget.'+moduleId);
        //console.log(className);
        //var viewClass = Ext.ClassManager.get(className);
        //console.log(viewClass);
        var module = new className();

        Ext.suspendLayouts();

        //删除panel中的其他东西
        contentPanel.removeAll(true);
        //添加进入panel
        contentPanel.add(module);
        //更新panel
        this.updateTitle(contentPanel,record);

        Ext.resumeLayouts(true);
    },
    updateTitle:function(contentPanel,record){
        var text = record.get('text');
        contentPanel.setTitle(text);
        document.title = text;
    },

    onMenuSelectForRout:function(tree, record,index,eOpts){
        this.redirectTo(record.get('moduleId'));
    }
});