/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('DataCart10.Application', {
    extend: 'Ext.app.Application',
    
    name: 'DataCart10',

    stores: [
        // TODO: add global / shared stores here
    ],

    controllers:[
        'DataCart10.aap.controller.Root'
    ],
    //
    listen:{
        controller:{
            '#':{
                unmatchedroute:'onUnmatchedRoute'
            }
        }
    },

    onUnmatchedRoute:function(hash){
      console.log('Unmatched', hash);
    },
    
    //launch: function () {
    //    // TODO - Launch the application
    //
    //    Ext.create("DataCart10.view.main.Main")
    //
    //
    //},
    init:function(){
        var me = this;
        me.setDefaultToken('userManage');
        Ext.tip.QuickTipManager.init();
    },
    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
