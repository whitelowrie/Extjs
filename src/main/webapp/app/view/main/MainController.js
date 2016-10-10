/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('DataCart10.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    //requires:[
    //    'DataCart10.view.base.Depart',
    //    'DataCart10.view.base.User',
    //    'DataCart10.view.base.Role'
    //],

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            Ext.Msg.alert('已经确定退出');
        }
    },

    authenticate:function(){
        console.log("go go go !");

        Sbi.sdk.services.setBaseUrl({
            protocol: 'http',
            host: '192.168.2.241',
            port: '8080',
            contextPath: 'SpagoBI',
            controllerPath: 'servlet/AdapterHTTP'
        });

        Sbi.sdk.jsonp.timeout = 5000;
        var user = 'biadmin';
        var password = 'biadmin';

        var cb = function(result, args, success) {
            console.log("authenticate:" + success);
            if (success === true) {
                alert("logged in");
                console.log("authenticate:" + success);
            } else {
                alert('ERROR: Wrong username or password');
                console.log("authenticate:" + success);
            }
        };

		Sbi.sdk.api.authenticate({
			params: {
				user: user,
				password: password
			},
			callback: {
				fn: cb,
				scope: this
			}
		});
    },

    getMyDataSetList:function(){
        Sbi.sdk.api.getDataSetList({
            callback: function(json, args, success) {
                console.log("login:" + success);
                if (success) {
                    console.log(json);
                    return json;
                }else{

                }
                return null;
            }
        });
    },

    onMenuItemSelect:function(tree,record,index,eOpts){
        //var moduleId = record.get('moduleId');
        ////得到panel
        //var contentPanel = Ext.getCmp('content-panel');
        ////实例化组件
        ////var widget = Ext.widget(record.get('paneXtype'));
        ////反射得到组件
        //var className = Ext.ClassManager.getByAlias('widget.'+moduleId);
        ////console.log(className);
        ////var viewClass = Ext.ClassManager.get(className);
        ////console.log(viewClass);
        //var module = new className();
        //
        //Ext.suspendLayouts();
        //
        ////删除panel中的其他东西
        //contentPanel.removeAll(true);
        ////添加进入panel
        //contentPanel.add(module);
        ////更新panel
        //this.updateTitle(contentPanel,record);
        //
        //Ext.resumeLayouts(true);
        //if(moduleId == 'userManage'){
        //    //用户管理视图
        //    //1,找到contentPanel 这个组件
        //        /*
        //            查找组件的方法：
        //                A:Ext.getCmp(id);
        //         */
        //    var contentPanel = Ext.getCmp('content-panel');
        //    //2.动态的创建User视图
        //    var user = Ext.create('DataCart10.view.base.User');
        //    //还可以使用Ext.widget('user-manage);来创建
        //    //3.装配创建的user视图
        //    contentPanel.removeAll(true);
        //    //4.添加动态user视图到contentPanel
        //    contentPanel.add(user);
        //
        //    //修改模板模块的名称
        //
        //    this.updateTitle(contentPanel,record);
        //}else if(moduleId == 'roleManage'){
        //    //角色管理视图
        //    //用户管理视图
        //    //1,找到contentPanel 这个组件
        //    /*
        //     查找组件的方法：
        //     A:Ext.getCmp(id);
        //     */
        //    var contentPanel = Ext.getCmp('content-panel');
        //    //2.动态的创建User视图
        //    var role = Ext.create('DataCart10.view.base.Role');
        //    //还可以使用Ext.widget('user-manage);来创建
        //    //3.装配创建的user视图
        //    contentPanel.removeAll(true);
        //    //4.添加动态user视图到contentPanel
        //    contentPanel.add(role);
        //
        //    //修改模板模块的名称
        //
        //    this.updateTitle(contentPanel,record);
        //}else if(moduleId == 'departManage'){
        //    //部分管理视图
        //    var depart = Ext.widget('role-manage');
        //    var panel = Ext.getCmp('content-panel');
        //    panel.removeAll(true);
        //    panel.add(depart);
        //
        //}else if(moduleId == 'menuManage'){
        //    //菜单管理视图
        //}
    },
    updateTitle:function(contentPanel,node){
        var text = node.get('text');
        contentPanel.setTitle(text);
        document.title = text;
    },

    onClickAbout:function(){
        Ext.Msg.alert('信息管理系统');
    },

    onClickExit: function () {
        Ext.Msg.confirm('Confirm','Are you sore', 'onConfirm', this)
    },
    oVisitWeb:function(){
        window.open('http://www.ibeifeng.com');
    },
    onDockedclick:function(item,event,name){
        console.log(item.getText());
    }
});
