/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('DataCart10.view.base.ContentPanel', {
    extend: 'Ext.panel.Panel',

    xtype: 'content-panel',

    header:{
        //默认是ture
        hidden:false
    }
});
