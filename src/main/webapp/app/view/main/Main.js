/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('DataCart10.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'DataCart10.view.main.MainController',
        'DataCart10.view.main.MainModel',
        'DataCart10.view.main.Header',
        'DataCart10.view.main.MainMenu',
        'DataCart10.view.base.Depart',
        'DataCart10.view.base.User',
        'DataCart10.view.base.Role',
        'DataCart10.view.base.Menu'
    ],

    xtype: 'app-main',

    controller: 'main',
    viewModel: {
        type: 'main'
    },
    layout: {
        type: 'border'
    },

    initComponent:function(){
        Ext.setGlyphFontFamily('FontAwesome');
        //this.controller.authenticate()

       // console.log(this.getViewModel().get('dataSetList')())
        this.callParent();
    },

    items: [{
        xtype : 'topheader',
        region: 'north'

    },
        {
            region:'west',
            xtype:'mainmenu'
        },
        {
            region:'center',
            xtype:'content-tabpanel',
        },
        {
            title: {
                bind:"{dataDetail}"
            },
            region: 'south',     // position for region
            xtype: 'panel',
            height:'20%',
            split: true         // enable resizing
        }]
});
