ig.module(
	'game.entities.treasureBig'
	)
.requires(
	'impact.entity'
	)
.defines(function(){
		EntityTreasureBig = ig.Entity.extend({
		
		collides: ig.Entity.COLLIDES.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		
		size: {x: 22,y: 22},
		offset: {x: 4,y: 4},
		maxVel:{x: 0,y:0},
                                             name: "treasureChest",
		
	    itemTier: 1,		
	    item: null,		
			
		init: function(x,y,settings) 
		{
		    this.parent(x, y, settings);
		    this.animSheet = new ig.AnimationSheet('media/BiggerItems.png', 32, 32);
		    
		    this.addAnim('idle', 1, [0]);
		   
		    this.item = ig.game.spawnEntity('EntityRandomTreasure', -64, -64, {  _killed: true,itemTier: this.itemTier });
		   
		
			
			
			
		
			
		},
		
		
		update: function() 
		{
                                             
          
		
	
		},
		check: function(other)
		{

		   
		  
                                             if(other instanceof EntityPlayer)
                                             {
         
                                             ig.game.showPopUp = true;
                                             ig.game.currentX = this.pos.x;
                                             ig.game.currentY = this.pos.y;
                                             ig.game.typePopUp = "CHEST";
                                             if(ig.game.POPUP){
                                             
                                             ig.game.POPUP.anchor.left = (this.pos.x - ig.game.screen.x);
                                             ig.game.POPUP.anchor.top = (this.pos.y- ig.game.screen.y - 32);
                                             ig.game.POPUP.align(this.size.x,this.size.y);
                                             }
            //Pickup event
			if( ig.input.released("popup") && ig.game.menuOpen())
			{
    
                                        

			    //Add chest pickup event
			    other.chestEvents.chestPicked += 1;
			  

			    ig.game.player.use = false;
			    var Duplicate = false;
			    if (this.item.isSword) {
			        other.weaponArray.push(this.item);
			        /* var w_array_length = other.weaponArray.length;
			        for (var i = 0; i < w_array_length; i++) {
			            if (other.weaponArray[i].itemName == this.itemName) { Duplicate = true; }
                        
			        }
			        if (Duplicate == false) { other.weaponArray.push(this); }*/
			       
			        
			       
			       
			       
			    }
			    if (this.item.isShield) {
			        other.shieldArray.push(this.item);
			        /*  var s_array_length = other.shieldArray.length;
			        for (var i = 0; i < s_array_length; i++) {
			            if (other.shieldArray[i].itemName == this.itemName) { Duplicate = true; }
			        }
			        if (Duplicate == false) { other.shieldArray.push(this); }*/
			    }
			    if (this.item.isArmor) {
			        other.armorArray.push(this.item);
                    
			        /*  var a_array_length = other.armorArray.length;
			        for (var i = 0; i < a_array_length; i++) {
			            if (other.armorArray[i].itemName == this.itemName) { Duplicate = true; }
			        }
			        if (Duplicate == false) { other.armorArray.push(this); }*/
			    }
				//if(this.isAccessory){other.accessoryArray.push(this);}
				//if(this.isAmulet){other.amuletArray.push(this);}
			 
			    ig.game.lastItem = this.item.itemName;
			    ig.game.gotItem = true;
			    ig.game.lastItemQuality = this.item.QualityLevel;
			    other.delayTimer.set(0.5);
			    ig.game.saveGame(null, ig.game.player, ig.game.saveSlot, true);
				this.kill();
				//var display = ig.game.getEntitiesByType( EntityDisplay )[0];
				
				//display.currentTextDisplayLine1  = this.itemName;
				//display.gotItem = true;
				//kill();
				
			}
		}
                                             }
		});
		
	});