/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('DataCart10.view.base.DepartForm', {
    extend: 'Ext.window.Window',

    xtype:'depart-form',

    layout:'fit',

    modal:true,

    height:400,

    width:600,

    style:{
        padding:'10px 50px'
    },

    bind:{
        title:'{title}'
    },
    items:{
        xtype:'form',
        reference:'form',
        bodyPadding:10,
        border:false,
        layout:{
            type:'vbox',
            align:'stretch'
        },
        items:[{
            xtype:'textfield',
            fieldLabel:'部门编号',
            reference:'code',
            msgTarget:'side',
            bind:'{theDepart.code}'
        },{
            xtype:'textfield',
            fieldLabel:'部门名称',
            reference:'name',
            msgTarget:'side',
            bind:'{theDepart.name}'
        },{
            xtype:'textarea',
            fieldLabel:'部门描述',
            reference:'describe',
            msgTarget:'side',
            bind:'{theDepart.describe}'
        },{
            xtype:'textarea',
            fieldLabel:'备注',
            reference:'note',
            msgTarget:'side',
            bind:'{theDepart.note}'
        }],
        buttons:[{
            text:'保存',
            handler:'onSaveClick'
        },{
            text:'取消',
            handler:'onCancelClick'
        }],
        //上角的关闭
        listeners:{
           close:'onCloseForm'
        }
    }
});
