ig.module(
	'game.entities.textBox'
	)
.requires(
	'impact.entity','impact.game'
	)
.defines(function(){
	WordWrap = ig.Class.extend({

    text:'',
    maxWidth:300,
    cut: false,

    init:function (text,maxWidth) {
        this.text = text;
		
        this.maxWidth = maxWidth;
        this.cut = false;
    },
	
    wrap:function(){
        
		return this.text;
		}
    }),
	EntityTextBox = ig.Entity.extend({
		
		
		pos:{x:0,y:0},
		size:{x:256,y:64},
		
		font: new ig.Font('media/04b03.font.png'),
		
		wrapper : null,
		Text: '',
		init: function(x,y,settings){
		    this.zIndex = 1000;
		    this.animSheet = new ig.AnimationSheet('media/displayPopup.png', 256, 64);
			this.addAnim('idle',1,[0]);
			this.currentAnim = this.anims.idle;
			this.parent(x,y,settings);
			this.Text = ig.game.currentInfoText;
			this.wrapper = new WordWrap(this.Text,20);
			},
		
		
		
		draw:function(){
		this.parent();
		this.font.draw(this.wrapper.wrap(),this.pos.x - ig.game.screen.x + 75,this.pos.y - ig.game.screen.y +25,ig.Font.ALIGN.LEFT);
		},
		update: function() 
		{	
this.parent();		
		}
		
		
		
		
		});
		
	});