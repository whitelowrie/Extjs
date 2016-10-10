/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('DataCart10.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    stores:{

    },

    data: {
        datalist: '数据数据集市',
        dataDetail:'数据列表',

        //应用程序的标题，
        systemInfo:{
            appName:'北风信息管理框架'
        },
        //功能分组
        leftMenu:{
            menuName:'',
            menuGroup:[{
                text:'基础信息',
                glyph:0xf0f7,
                description:'',
                menuItems:[{
                    text:'菜单管理',
                    module:'menuManage'
                },{
                    text:'部门管理',
                    module:'departManage'
                },{
                    text:'角色管理',
                    module:'roleManage'
                },{
                    text:'用户管理',
                    module:'userManage'
                }]
            },{
                text:'业务管理',
                glyph:0xf0f7
            },{
                text:'常用工具',
                glyph:0xf0f7
            }]
        },
        //具体的功能模块项
        dataSetList:function(){
            return this.controller.getMyDataSetList();
        },

        loremIpsum: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }

    //TODO - add data, formulas and/or methods to support your view
});
