
Ext.define("DataCart10.view.Header",{
    //1、从哪个组件继承
    extend: "Ext.Container",
	//2、取个别名 alias，或者是 xtype
    alias: 'widget.topheader',
    //3、给这个组件一个id(1:方便我们能够 根据 id去找到这个组件2：我们可以根据 id去写css样式 )
    id: 'app-header',
    //4、标题 title
    title:'Extjs5.北风信息系统框架',
    //5、高度 ， 宽度 
    height: 52,
    //6、布局
    layout:{
    	type:'hbox',
    	align:'middle'
    },
    //7、定义引用
    requires : [
		'DataCart10.view.HeaderMenu',
		'DataCart10.view.main.MainController'
	],
    
    //8、定义控制器
    
    controller: "main",
    //9、viewModel
    //模板方法
    initComponent :function(){
    	document.title = this.title;
    	
    	//定义自己的代码逻辑
    	this.items = [{
    		id: 'app-header-logo',
    		xtype: 'component'
    	},{
    		id :'app-header-title',
    		xtype: 'component',
    		html: this.title,
    		flex:1
    	},{
    		xtype:'headerGlobalMenu'
    	}];
    	
    	this.callParent();
    }

});
