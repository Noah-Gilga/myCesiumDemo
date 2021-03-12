/**
 * @namespace vtron.comp.cesium.map
 */
$.namespace("vtron.comp.cesium.map");

/**
 * 地图底图调色板
 * @module vtron.comp.cesium.map
 * @class vtron.comp.cesium.map.ColorPalette
 */
vtron.comp.cesium.map.Compass = Polymer({
	is: "v-cesium-map-color-palette",
	behaviors: [
		vtron.comp.behavior.PositionBehavior,
		vtron.comp.behavior.SizeBehavior,
    vtron.comp.behavior.PanelBehavior,
		vtron.comp.behavior.PanelButtonBehavior,
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
		autoRender:{
			type:Boolean,
			reflectToAttribute: true
		}
	},

	attached: function() {
		this._initEvent();
		this.renderList = [];
	},

	detached: function() {
		
	},

	_initEvent:function(){
		var _this = this;
		var $menu = $(_this.$$(".menu"));
		var $shade = $(_this.$$(".panel-shade"));
		//菜单显隐
		$(_this.$$("#btnAdd")).on("click",function(){
			if($menu.hasClass("hidden")){
				$menu.removeClass("hidden")
			}else{
				$menu.addClass("hidden");
			}
		});
		$(_this.$$("#btnSet")).on("click",function(){
			_this.setMapColor();
		});
		$(_this.$$("#btnReset")).on("click",function(){
			_this.resetMapColor();
		});
		$(_this.$$("#btnSave")).on("click",function(){
			_this.saveMapColorConfig();
		});
		//菜单点击
		$(_this.$$(".menu")).on("click","li",function(){
			var panelId = $(this).attr("panel-id");
			var name = $(this).attr("data-name");
			var type = $(this).attr("data-type");
			$menu.addClass("hidden");

			var newConfig = {
				name:name,
				type:type,
				status:true,
				panelId:panelId
			}
			
			_this.renderList.push(newConfig);
			_this.renderStyleList();
			_this.addNewStyle(newConfig);
		});

		$(_this.$$('#style-list')).on("click",".btn-visiable",function(){
			//调色效果状态开启\关闭
			var index = $(this).parent().index();
			var styleConfig = _this.renderList[index];
			styleConfig.status = !styleConfig.status;
			_this.setMapColor();
			_this.renderStyleList();
		}).on("click",".btn-edit",function(){
			//编辑调色效果
			var index = $(this).parent().index();
			var styleConfig = _this.renderList[index];
			_this.renderStylePanel(styleConfig);
		}).on("click",".btn-delete",function(){
			//删除调色效果
			var index = $(this).parent().index();
			_this.renderList.splice(index,1);
			_this.renderStyleList();
			_this.setMapColor();
		})

		//调色面板 ——【取消】按钮
		$(_this.$$(".fixWrap")).on("click",".panel-style .btnCancel",function(){
			var $parentPanel = $(this).parents(".panel-style");
			$parentPanel.addClass("hidden");
			$shade.addClass("hidden");
			_this.currentConfig = null;
			_this.currentConfigData = null;
		}).on("click",".panel-style .btnSave",function(){
			var $parentPanel = $(this).parents(".panel-style");
			$parentPanel.addClass("hidden");
			$shade.addClass("hidden");
			if(_this.currentConfigData){
				_this.currentConfig.data = _this.currentConfigData;
			}
			_this.currentConfig = null;
			_this.currentConfigData = null;
			_this.setMapColor();
		});
		//【灰度】调色板 修正值
		$(_this.$$(".value-reference")).on("change",function(event){
      var value = parseFloat(this.value);
      if(value>0.1){
	    	_this.reference = 0.1;
	    	this.value = 0.1;
	    }else if(value<-0.1){
	    	_this.reference = -0.1;
	    	this.value = -0.1;
	    }else{
	    	_this.reference = value;
	    }
	    _this.currentConfigData = {
				reference:_this.reference,
			}
			if(_this.autoRender){
				_this.currentConfig.data = _this.currentConfigData;
				_this.setMapColor();
			}
	  });
		//【色阶】调色板 阴影
		$(_this.$$(".value-black")).on("change",function(event){
      var value = parseInt(this.value);
      if(value<0){
	    	_this.black = 0;
	    	this.value = 0;
	    }else if(value>_this.white - 2){
	    	_this.black = _this.white - 2;
	    	this.value = _this.white - 2;
	    }else{
	    	_this.black = value;
	    }
	    _this.currentConfigData = {
				black:_this.black,
				grayRotaio:_this.gray,
				white:_this.white
			}
	    _this._resetMarkBlackPosition();
	    _this._resetMarkGrayPosition();

	    if(_this.autoRender){
				_this.currentConfig.data = _this.currentConfigData;
				_this.setMapColor();
			}
	  });
	  //【色阶】调色板 高亮
	  $(_this.$$(".value-white")).on("change",function(event){
      var value = parseInt(this.value);
      if(value>255){
	    	_this.white = 255;
	    	this.value = 255;
	    }else if(value<_this.black + 2){
	    	_this.white = _this.black + 2;
	    	this.value = _this.black + 2;
	    }else{
	    	_this.white = value;
	    }
	    _this.currentConfigData = {
				black:_this.black,
				grayRotaio:_this.gray,
				white:_this.white
			}
	    _this._resetMarkWhitePosition();
	    _this._resetMarkGrayPosition();

	    if(_this.autoRender){
				_this.currentConfig.data = _this.currentConfigData;
				_this.setMapColor();
			}
	  });
	  //【色阶】调色板 中间调
	  $(_this.$$(".value-gray")).on("change",function(event){
      var value = parseFloat(this.value); 
      if(value<0.01){
	    	_this.gray = 0.01;
	    	this.value = 0.01;
	    }else if(value>9.99){
	    	_this.gray = 9.99;
	    	this.value = 9.99;
	    }else{
	    	_this.gray = value;
	    }
	    _this.currentConfigData = {
				black:_this.black,
				grayRotaio:_this.gray,
				white:_this.white
			}
	    _this._resetMarkGrayPosition();

	    if(_this.autoRender){
				_this.currentConfig.data = _this.currentConfigData;
				_this.setMapColor();
			}
	  });
	  //【颜色】调色板 - rgb 
	  $(_this.$$(".fixWrap")).on("change",".color-box .value-rgb",function(){
  	 	var value = parseInt(this.value);
      if(value>255){
	    	this.value = 255;
	    }else if(value<0){
	    	this.value = 0;
	    }else{
	    	this.value = value;
	    }
	    var $panel = $(this).parents(".panel-style");
	  	var $colorBox = $(this).parents(".color-box");
	  	var $colorBg = $panel.find(".color-value");
	  	var r = $colorBox.find(".value-red")[0].value;
			var g = $colorBox.find(".value-green")[0].value;
			var b = $colorBox.find(".value-blue")[0].value;
			var a = $colorBox.find(".value-alpha")[0].value;
			_this.currentConfigData = {
				r:r,
				g:g,
				b:b,
				a:a
			}
			var rgba = "rgba("+r+","+g+","+b+","+a+")";
			$colorBg.css("backgroundColor",rgba);

			if(_this.autoRender){
				_this.currentConfig.data = _this.currentConfigData;
				_this.setMapColor();
			}
	  });
	  //【颜色】调色板 - alpha 
	  $(_this.$$(".fixWrap")).on("change",".color-box .value-alpha",function(){
  	 	var value = parseFloat(this.value); 
      if(value>1){
	    	this.value = 1;
	    }else if(value<0){
	    	this.value = 0;
	    }else{
	    	this.value = value;
	    }
	    var $panel = $(this).parents(".panel-style");
	  	var $colorBox = $(this).parents(".color-box");
	  	var $colorBg = $panel.find(".color-value");
	  	var r = $colorBox.find(".value-red")[0].value;
			var g = $colorBox.find(".value-green")[0].value;
			var b = $colorBox.find(".value-blue")[0].value;
			var a = $colorBox.find(".value-alpha")[0].value;
			_this.currentConfigData = {
				r:r,
				g:g,
				b:b,
				a:a
			}
			var rgba = "rgba("+r+","+g+","+b+","+a+")";
			$colorBg.css("backgroundColor",rgba);

			if(_this.autoRender){
				_this.currentConfig.data = _this.currentConfigData;
				_this.setMapColor();
			}
	  });

	},

	//【色阶】调色板 阴影浮标移动
	_resetMarkBlackPosition:function(){
		this.pos_left = parseFloat((this.black / 255 * 100).toFixed(2))
    var percent = this.pos_left+"%";
    $(this.$$(".mark-black")).css("left",percent);
	},
	//【色阶】调色板 高亮浮标移动
	_resetMarkWhitePosition:function(){
		this.pos_right = parseFloat((this.white / 255 * 100).toFixed(2))
    var percent = this.pos_right+"%";
    $(this.$$(".mark-white")).css("left",percent);
	},
	//【色阶】调色板 中间调浮标移动
	_resetMarkGrayPosition:function(){
		var percent = parseFloat((0.1679*Math.log(this.gray)/Math.log(Math.E)+0.4865).toFixed(2));
    var left = this.pos_left||0;
    var right = this.pos_right||100;
    if(percent<0){
    	percent = 0
    }else if(percent>1){
    	percent = 1;
    }
    this.pos_middle = (this.pos_right - this.pos_left) * percent + this.pos_left;
    $(this.$$(".mark-gray")).css("left",this.pos_middle+"%");
	},
	//渲染效果列表
	renderStyleList:function(){
		var _this = this;
		var $styleList = $(_this.$$("#style-list"));
		if(!this.renderList||!this.renderList.length){
			$styleList.empty();
			return;
		}
		var lis = "";
		for(var item of _this.renderList){
			var statusClass = item.status?"status-true":"status-false";
			lis+= '<li class="'+statusClass+'"><span class="btn-visiable icon icon-media-stop-03"></span><span>'+item.name+'</span><span class="btn-edit icon icon-edit-02-fill"></span><span class="btn-delete icon icon-recycle-bin-01-fill"></span></li>'
		}

		$styleList.html(lis);

	},
	//添加新的调色效果
	addNewStyle:function(newConfig){
		if(!newConfig)return;
		var panelId = newConfig.panelId;
		if(!panelId||panelId=="")return;
		var _this = this;
		if(panelId=="panel-gray"){
			newConfig.data = {
				reference:0.00
			}
		}else if(panelId=="panel-levels"){
			newConfig.data = {
				black:0,
				grayRotaio:1.0,
				white:255
			}
		}else if(panelId=="panel-linear"){
			newConfig.data = {
				r:0,
				g:0,
				b:0,
				a:0
			}
		}else if(panelId=="panel-multiply"){
			newConfig.data = {
				r:0,
				g:0,
				b:0,
				a:0
			}
		}else if(panelId=="panel-screen"){
			newConfig.data = {
				r:0,
				g:0,
				b:0,
				a:0
			}
		}
		this.renderStylePanel(newConfig);
		this.setMapColor();
	},
	renderStylePanel:function(config){
		if(!config||!config.panelId||config.panelId=="")return;
		var panelId = config.panelId;
		var data = config.data;

		$(this.$$(".fixWrap")).find(".panel-style").addClass("hidden");
		$(this.$$("."+panelId)).removeClass("hidden");
		$(this.$$(".panel-shade")).removeClass("hidden");
		this.currentConfig = config;
		if(panelId=="panel-gray"){
			this.renderGrayPanel(data);
		}else if(panelId=="panel-levels"){
			this.renderLevelsPanel(data);
		}else if(panelId=="panel-linear"){
			this.renderColorPanel(panelId,data);
		}else if(panelId=="panel-multiply"){
			this.renderColorPanel(panelId,data);
		}else if(panelId=="panel-screen"){
			this.renderColorPanel(panelId,data);
		}
	},
	//渲染灰度调色板
	renderGrayPanel:function(data){
		data = data || {reference:0};
		this.reference = data.reference||0;
		var $panel = $(this.$$(".panel-gray"));
		var value_reference = $panel.find(".value-reference")[0];
		value_reference.value = this.reference;
	},
	//渲染色阶调色板
	renderLevelsPanel:function(data){
		data = data || {black:0,gray:1.0,white:255};
		this.black = data.black||0;
		this.gray = data.grayRotaio||1.0;
		this.white = data.white||255;
		var $panel = $(this.$$(".panel-levels"));
		var value_black = $panel.find(".value-black")[0];
		var value_gray = $panel.find(".value-gray")[0];
		var value_white = $panel.find(".value-white")[0];
		value_black.value = this.black;
		value_gray.value = this.gray;
		value_white.value = this.white;
		this._resetMarkBlackPosition();
		this._resetMarkWhitePosition();
		this._resetMarkGrayPosition();
	},
	//渲染线性减淡调色板
	renderColorPanel:function(panelId,data){
		var _this = this;
		if(!panelId||panelId=="")return;
		data = data || {r:0,g:0,b:0,a:0};
		var $panel = $(_this.$$("."+panelId));
		var $colorValue = $panel.find(".color-value");
		var value_r = $panel.find(".value-red")[0];
		var value_g = $panel.find(".value-green")[0];
		var value_b = $panel.find(".value-blue")[0];
		var value_a = $panel.find(".value-alpha")[0];
		value_r.value = data.r;
		value_g.value = data.g;
		value_b.value = data.b;
		value_a.value = data.a;
		var rgba = "rgba("+data.r+","+data.g+","+data.b+","+data.a+")";
		$colorValue.css("backgroundColor",rgba);

	},
	setStyleList:function(data,isSetToMap,isNotFire){
		this.renderList = data||[];
		this.renderStyleList();
		if(isSetToMap){
			this.setMapColor(isNotFire);
		}
	},
	getStyleList:function(){
		return vtron.util.clone(this.renderList)||[];
	},
	setMapColor:function(isNotFire){
		var _this = this;
		var map = $("#"+this.mapId).get(0);
		if(!map){
			throw new Error("地图组件未定义");
		}
		
		if(!this.renderList||!this.renderList.length){
			this.resetMapColor(isNotFire);
			return;
		}
		map.waitMapInit(()=>{
			var check =false;
			for(var styleConfig of this.renderList){
				var type = styleConfig.type;
				var data = styleConfig.data;
				var status = styleConfig.status;
				if(status){
					check = true;
					if(type=="gray"){
						map.baseMapColor_gray(data);
					}else if(type=="invert"){
						map.baseMapColor_inverse();
					}else if(type=="levels"){
						map.baseMapColor_level(data);
					}else if(type=="linear"){
						map.baseMapColor_linear(data);
					}else if(type=="multiply"){
						map.baseMapColor_multiply(data);
					}else if(type=="screen"){
						map.baseMapColor_screen(data);
					}
				}
			}
			if(check){
				map.baseMapColor_execute();
				if(!isNotFire){
					_this.fire("setMapColor",vtron.util.clone(_this.renderList));
				}
			}else{
				this.resetMapColor(isNotFire);
			}
		})
	},

	resetMapColor:function(isNotFire){
		var _this = this;
		var map = $("#"+this.mapId).get(0);
		if(!map){
			throw new Error("地图组件未定义");
		}
		map.waitMapInit(()=>{
			var invertType = _this.invertType||0;
			map.invertMapColor(invertType);
			if(!isNotFire){
				_this.fire("resetMapColor");
			}
			
		})
		
	},

	saveMapColorConfig:function(){
		var config = vtron.util.clone(this.renderList)||[];
		this.fire("save",config);
	}

});

