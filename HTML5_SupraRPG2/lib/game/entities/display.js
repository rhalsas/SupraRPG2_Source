ig.module(
	'game.entities.display'
	)
.requires(
	'impact.entity'
	)
.defines(function(){
		EntityDisplay = ig.Entity.extend({
		
		name: 'notNPC',
		currentTextDisplayLine1: '',
		currentTextDisplayLine2: '',
		currentTextDisplayLine3: '',
		gotItem: false,
			
		init: function( x, y, settings ) 
		{
			this.parent(x, y, settings );
		},
		
		update: function() 
		{
			this.parent();
			
		}
		
		});
		
	});


