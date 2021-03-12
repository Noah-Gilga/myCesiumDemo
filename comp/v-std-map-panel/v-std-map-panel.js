/**
 * @namespace vtron.comp.std.map
 */
$.namespace("vtron.comp.std.map");

/**
 * 地图浮动容器框
 * @module vtron.comp.std.map
 * @class vtron.comp.std.map.Panel
 */
vtron.comp.std.map.Panel = Polymer({
	is: "v-std-map-panel",
	behaviors: [
		vtron.comp.behavior.MapTagBehavior,
		vtron.comp.behavior.DragAndMoveBehavior,
    vtron.comp.behavior.PanelBehavior,
		vtron.comp.behavior.PanelResizeBehavior,
		vtron.comp.behavior.PanelButtonBehavior,
		vtron.comp.behavior.DialogArrowBehavior,  //对话框箭头
    	vtron.comp.behavior.StdLifecycleBehavior  //标准组件的生命周期扩展行为
	],
	properties: {
		/**
		 * 地图组件ID
		 * @property mapId
		 * @type String
		 */
		mapId: {
			type: String,
			reflectToAttribute: true
		},
		/**
		 * 是否可拖动
		 * @property draggable
		 * @type Boolean
		 */
		draggable: {
			type: Boolean,
			value: true,
			reflectToAttribute: true,
		},
		/**
		 * 是否可拉伸
		 * @property resizable
		 * @type Boolean
		 */
		resizable: {
			type: Boolean,
			value: true,
			reflectToAttribute: true,
		},
		/**
		 * 是否跟随目标移动
		 * @property moveActive
		 * @type Boolean
		 */
		moveActive:{
			type:Boolean,
			value: true
		},
	},

	attached: function() {
		var _this = this;
		var dragger = _this.$$(".content-wrapper");
		if(_this.draggable){
			//激活拖动行为
			_this._bindDragAndMove(dragger);
			$(_this.shadowRoot).find(".panel-arrow").hide();
		}
		//激活改变大小行为
		if(_this.resizable){
			_this._getMapPanelSize();
			_this._bindPanelResize(false, false, false, true);
		}else{
			$(_this.shadowRoot).find(".PanelResizeBehavior").remove();
		}
		//地图组件
		_this._map = _this._getMap();
        
		_this._mapMoveHandler = this._mapMoveEvent.bind(this);
		//关联map的move事件引用，地图移动时，对话框跟着移动
		$(_this._map).on("move", _this._mapMoveHandler);


	},

	detached: function() {
		$(this._map).off("move", this._mapMoveHandler);
		$(this).off("panelResize");
		if(this.$$(".content-wrapper")){
			$(this.$$(".content-wrapper")).off("mousedown");
		}
	},

	/**
	 * 获取地图组件
	 * @returns 地图组件的DOM对象
	 */
	_getMap: function(){
		var mapId = this.mapId;
		var map = vtron.util.extSelector(this, "#" + mapId); //父组件或文档中找DOM
		if(!map){
			throw new Error("找不到地图组件");
		}

		return map;
	},
	/**
	 * 判断箭头位置类型
	 */
	_getArrowDirection:function(x1,y1,x2,y2){
		var _this = this;
		var map = this._getMap();
		if($(_this).attr("move-type") != "alert"){return;}
		var panelX = parseInt((this.mapX - x1) * map.mapWidth / (x2 - x1));
		var panelY = parseInt((this.mapY - y1) * map.mapHeight / (y2 - y1));
		if(panelY < _this.offsetHeight + 50){
			$(_this.shadowRoot).find(".panel-arrow").addClass("arrowHidden");
			$(_this.$$(".topArrow")).removeClass("arrowHidden");
		}else{
			$(_this.shadowRoot).find(".panel-arrow").addClass("arrowHidden");
			$(_this.$$(".bottomArrow")).removeClass("arrowHidden");
		}
		if(panelX < _this.offsetWidth/2){
			$(_this.shadowRoot).find(".panel-arrow").addClass("arrowHidden");
			$(_this.$$(".leftArrow")).removeClass("arrowHidden");
		}
		if(panelX > $(window).width()-_this.offsetWidth/2){
			$(_this.shadowRoot).find(".panel-arrow").addClass("arrowHidden");
			$(_this.$$(".rightArrow")).removeClass("arrowHidden");
		}
	},
    
	_mapMoveEvent:function(event){
		var _this = this;
		if(!_this.moveActive)return;
		var detail = event.originalEvent.detail;
		_this._getArrowDirection(detail.left, detail.top, detail.right, detail.bottom);
		var panelArrow = $(_this.shadowRoot).find(".panel-arrow");
		var $panelArrow = "";
		panelArrow.each(function(e){
			if(!$(this).hasClass("arrowHidden")){
				$panelArrow = $(this);
			}
		});
		var arrowHeight = 0,arrowWidth = 0;
		if($(_this).attr("move-type") == "video"){
			_this._updatePositionEx(detail.left, detail.top, detail.right, detail.bottom,1.5,"video",1000);
		}else if($(_this).attr("move-type") == "alert"){
			if($panelArrow.hasClass("topArrow")){
				if($panelArrow.hasClass("alertArrow")){
					arrowHeight = -15;
				}else{
					$panelArrow.css("top","-10%");
					arrowHeight = -9;
				}
			}else if($panelArrow.hasClass("leftArrow")){
				if($panelArrow.hasClass("alertArrow")){
					arrowHeight = -4;
					arrowWidth = -13.5;
				}else{
					$panelArrow.css({"left":"-3%","width":"auto"});
					arrowHeight = -2.5;
					arrowWidth = -10;
				}
			}else if($panelArrow.hasClass("rightArrow")){
				if($panelArrow.hasClass("alertArrow")){
					arrowHeight = -4;
					arrowWidth = 13.5;
				}else{
					$panelArrow.css({"left":"103%","width":"auto","right":"-7%"});
					arrowHeight = -2.5;
					arrowWidth = 10;
				}
			}else{
				arrowWidth = 0;
				arrowHeight = 1.5;
			}
			_this._updatePositionEx(detail.left, detail.top, detail.right, detail.bottom,arrowHeight,"","",arrowWidth);
		}else{
			if($panelArrow.hasClass("alertArrow")){
				arrowHeight = 0;
			}else{
				arrowHeight = 1.5;
			}
			_this._updatePositionEx(detail.left, detail.top, detail.right, detail.bottom,arrowHeight,"","",arrowWidth);
		}
        //更新对话框箭头起始点
        _this.setArrowStartPoint(_this.windowLeft, _this.windowTop);
	},
	//返回面板缩放后宽高
	_getMapPanelSize:function(){
		var _this = this;
		$(_this).on("panelResize",function(event){
			var detail = event.originalEvent.detail;
			
			/*
			var resizeWidth = vtron.util.convertToEm(_this.clientWidth + "px");
			var resizeHeight = vtron.util.convertToEm(_this.clientHeight + "px");
			var resizeTop = vtron.util.convertToEm(_this.offsetTop + "px");
			var resizeLeft = vtron.util.convertToEm(_this.offsetLeft + "px");
			var videoId = $(_this).find(".mapVideo").attr("video-id");
			抛出缩放的原始宽高
			_this.fire("MapPanelResize",{videoId:videoId,mapPanelId:_this.id,resizeWidth:resizeWidth,resizeHeight:resizeHeight,resizeTop:resizeTop,resizeLeft:resizeLeft});
			*/
			var resizeWidth = vtron.util.convertToEm(_this.clientWidth + "px");
			var resizeHeight = vtron.util.convertToEm(_this.clientHeight + "px");
			var videoId = $(_this).find(".mapVideo").attr("video-id");
			var differenceLeft = detail.differenceLeft;
			var differenceTop = detail.differenceTop;
			var fontSize = parseInt(getComputedStyle($("#scene-base").get(0)).fontSize);
			_this.fire("MapPanelResize",{
				videoId:videoId,
				mapPanelId:_this.id,
				differenceLeft:differenceLeft,
				differenceTop:differenceTop,
				fontSize:fontSize,
				resizeWidth:resizeWidth,
				resizeHeight:resizeHeight
			});
		})
	},
});


/** 
  * 设定地理坐标并进行移动
  * @method goto
  * @parame x 与地图关联的地理坐标X
  * @parame y 与地图关联的地理坐标Y
  * @param moveType 移动变换类型
  */
vtron.comp.std.map.Panel.prototype.goto = function(x, y, moveType){
	var _this = this;
	var map = this._getMap();
	var region = map.getRegion();

	this.mapX = x || this.mapX;
	this.mapY = y || this.mapY;
	//根据
	_this._getArrowDirection(region.left, region.top, region.right, region.bottom);
	//缓存地图DOM节点 大小
	if(!this.mapWidth)this.mapWidth = $(map).width();
	if(!this.mapHeight)this.mapHeight = $(map).height();
	var panelArrow = $(_this.shadowRoot).find(".panel-arrow");
	var $panelArrow = "";
	var arrowHeight = 1.5,arrowWidth = 0;
	panelArrow.each(function(e){
		if(!$(this).hasClass("arrowHidden")){
			$panelArrow = $(this);
		}
	});
	if($panelArrow.hasClass("topArrow")){
		if($panelArrow.hasClass("alertArrow")){
			arrowHeight = -15;
		}else{
			$panelArrow.css("top","-10%");
			arrowHeight = -9;
		}
	}else if($panelArrow.hasClass("leftArrow")){
		if($panelArrow.hasClass("alertArrow")){
			arrowHeight = -4;
			arrowWidth = -13.5;
		}else{
			$panelArrow.css({"left":"-3%","width":"auto"});
			arrowHeight = -2.5;
			arrowWidth = -10;
		}
	}else if($panelArrow.hasClass("rightArrow")){
		if($panelArrow.hasClass("alertArrow")){
			arrowHeight = -4;
			arrowWidth = 13.5;
		}else{
			$panelArrow.css({"left":"103%","width":"auto","right":"-7%"});
			arrowHeight = -2.5;
			arrowWidth = 10;
		}
	}else{
		arrowWidth = 0;
		if($panelArrow.hasClass("alertArrow")){
			arrowHeight = 0;
		}else{
			arrowHeight = 1.5
		}
	}
	this._updatePositionEx(region.left, region.top, region.right, region.bottom,arrowHeight,moveType,"",arrowWidth);
};
/**
 * 根据状态更换底部箭头颜色
 * @method arrowChange
 * @param AlertStatus 警情状态
 */
vtron.comp.std.map.Panel.prototype.arrowChange = function(AlertStatus){
	var _this = this;
	var $panelArrow = $(_this.shadowRoot).find(".panel-arrow");
	$panelArrow.removeClass("defaultArrow").addClass("alertArrow");
	if(AlertStatus == "1"){
		$panelArrow.addClass("greenArrow");
	}
	if(AlertStatus == "2"){
		$panelArrow.addClass("yellowArrow");
	}
	if(AlertStatus == "3"){
		$panelArrow.addClass("redArrow");
	}
	if(AlertStatus == "normal"){
		$panelArrow.addClass("blueArrow");
	}
};
/**
 * 停止跟随移动并隐藏三角标注
 * @method stopMoving
 */
vtron.comp.std.map.Panel.prototype.stopMoving = function(gotoLeft,gotoTop){
	var _this = this;
	_this.moveActive = false;
	var panelArrow = $(_this.shadowRoot).find(".panel-arrow");
	var $panelArrow = "";
	panelArrow.each(function(e){
		if(!$(this).hasClass("arrowHidden")){
			$panelArrow = $(this);
		}
	});
	$panelArrow.removeClass("defaultArrow");
	$(_this).css({
		"left":0,
		"top":0,
		"transition": "transform 300ms",
		"transform":"translate("+ gotoLeft +"px,"+ gotoTop +"px)"
	});
};

vtron.comp.std.map.Panel.prototype.startMoving = function(){
	var _this = this;
	_this.moveActive = true;
	var panelArrow = $(_this.shadowRoot).find(".panel-arrow");
	var $panelArrow = "";
	panelArrow.each(function(e){
		if(!$(this).hasClass("arrowHidden")){
			$panelArrow = $(this);
		}
	});
	$panelArrow.addClass("defaultArrow");
};