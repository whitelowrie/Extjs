/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('DataCart10.view.base.DepartController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.base-depart',
    //controller:'base-user',

    //viewModel:{
    //    type:'base-user'
    //},

    required:[
        'Ext.window.Window',
        ''
    ],

    onAfterLayout:function(){
        this.getViewModel().getStore('departStore').load();
    },

    onNew:function(){
        this.dispalyForm(null);
    },

    onEdit:function(button){
      //从widgetRecord里面得到记录
      this.dispalyForm(button.getWidgetRecord());
    },

    onCancelClick:function(){
        if(this.dialog){
            this.dialog.hide();
        }
    },
    onDel:function(button){

    },

    onSaveClick:function(){
        var me = this;
        var dialog = me.dialog,
        form = this.lookupReference('form'),
        isEdit = this.isEdit,
            id = null;

        dialog.getSession().save();
        if(!isEdit){
            //动态生成的theDepart
            id = dialog.getViewModel().get('theDepart').id;
            //得到的是一条幻影记录，没有新增到数据库
            var record = this.getSession().getRecord('Depart',id);
            me.getView().getStore().add(record);
        }

        this.dialog = Ext.destory(me.dialog);
    },

    dispalyForm:function(record){
        //var view = this.getView();
        //
        //view.add({
        //    xtype:'window',
        //    modal:true,
        //    width:500,
        //    height:200
        //}).show();
        //////转换有值还是没有值
        ////this.isEdit = !!record;
        ////console.log(view)
        ////this.dialog = view.add({
        ////    xtype:'depart-form',
        ////    //会作为前面的那个子回话用
        ////    session:true,
        ////    viewModel:{
        ////        data:{
        ////            title:record ? '修改数据' : '添加数据'
        ////        },
        ////        links:{
        ////            theDepart:record || {
        ////                create: true,
        ////                type:'Depart'
        ////            }
        ////        }
        ////    }
        ////});
        ////
        ////this.dialog.show();
        var view = this.getView(); //得到列表页
        this.isEdit = !!record;
        this.dialog = view.add({
            xtype : 'depart-form',
            session : true,
            viewModel : {
                data :{
                    title: record ? '修改数据':'添加数据'
                },
                links:{
                    theDepart : record || {
                        create : true,
                        type : 'Depart'
                    }
                }
            }
        });
        this.dialog.show();
    }
});
