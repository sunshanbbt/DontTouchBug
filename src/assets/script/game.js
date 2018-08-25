cc.Class({
    extends: cc.Component,

    properties: {
        bgsprite1: {
            default: null,
            type: cc.Node
                 },
		bgsprite2: {
            default: null,
            type: cc.Node
                 },
		one: {
            default: null,
            type: cc.Node
                 },
        two: {
            default: null,
            type: cc.Node
                 },
        tree: {
            default: null,
            type: cc.Node
                 },
        four: {
            default: null,
            type: cc.Node
                 },
		five: {
			default: null,
			type:cc.Node
			},
		lu1:{
			default:null,
			type:cc.Node
			},
		lu2:{
			default:null,
			type:cc.Node
			},
		lu3:{
			default:null,
			type:cc.Node
			}

    },

  
    onLoad: function(){
		
		//获取背景的坐标
    	var bgxy = this.bgsprite1.convertToWorldSpaceAR(this.bgsprite1.getPosition());
		var bgxy1 = this.bgsprite2.convertToWorldSpaceAR(this.bgsprite2.getPosition());
		//获取背景的宽度 
		var bgwidth = this.bgsprite1.getContentSize().width;
		//获取屏幕的宽度
		var pwidth = cc.view.getVisibleSize().width;
		//得到除屏幕之外右半部分背景的宽度
		var zwidth = bgxy.x - bgxy1.x;
    	this.bgsprite1.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var delta = event.touch.getDelta();
			    
       		this.x += delta.x;
			
       		if ( this.x >= zwidth ) {
       			this.x = zwidth;
       		}
			if (this.x <= -zwidth ) {
				this.x = -zwidth;
			}
			console.log(this.x );
			console.log(bgxy);
			console.log(bgxy1 + "bgxy1")
        }, this.bgsprite1);

console.log();
		this.one.runAction(cc.fadeIn(5,5))
    },



    start () {

    },

    // update (dt) {},
});
