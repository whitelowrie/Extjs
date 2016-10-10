
Ext.define("DataCart10.view.HeaderMenu",{
    extend: "Ext.Container",
	xtype: 'headerGlobalMenu',
	id: 'header-global-menu',

	controller: "main",
	
	initComponent: function(){
		
		//自己的逻辑
		
		var menu = Ext.create('Ext.menu.Menu',{
			items : [{
				text:'风格',
				menu:[{
					text:'crisp',
					group:'theme',  //同一组的用一个组名
					checked:true
				},{
					text:'neutral',
					group:'theme'
				},{
					text:'neptune',
					group:'theme'
				}]
			},'-',{
				text:'关于',
				handler: 'onClickAbout'
				
			},'-',{
				text:'退出',
				handler: 'onClickExit'
			}]
			
		});
		
		this.items = [{
			xtype : 'component',
			cls : 'app-header-menu',
			margin : '0 5 0 0',
			//添加事件， 1：我们有实例化的时候写事件， 2：on 动态的在实例化以后去设置
			listeners :{
				scope : this,
				click: function(e){
					menu.showBy(this);	
				},
				element : 'el' // body
			} 
		}]
		
		this.callParent();
	}
});
