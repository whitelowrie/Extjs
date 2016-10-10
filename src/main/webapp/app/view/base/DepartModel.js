/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('DataCart10.view.base.DepartModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.base-depart',
    //controller:'base-user',

    //viewModel:{
    //    type:'base-user'
    //},

    stores:{
        departStore:{
            model:'Depart',
            pageSize:1,
            autoLoad:true,
            remoteFilter:true,
            remoteSort:true,
            //会将session加入列表页
            session:true
        }
    }
});
