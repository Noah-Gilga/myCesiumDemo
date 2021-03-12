
/**
 * @namespace vtron.comp.std.map
 */
$.namespace("vtron.comp.std.map");
/**
 * 
 * @module vtron.comp.std.map
 * @class vtron.comp.std.map.legend
 */

vtron.comp.std.map.Legend = Polymer({
  is: "v-std-map-legend",
  behaviors: [
    vtron.comp.behavior.PositionBehavior,
    vtron.comp.behavior.SizeBehavior,
    vtron.comp.behavior.PanelBehavior,
    vtron.comp.behavior.LoadBehavior,
    vtron.comp.behavior.StdLifecycleBehavior,  //标准组件的生命周期扩展行为
    vtron.comp.behavior.StdLoadBehavior,  //标准组件加载数据的公共行为
  ],
  properties:{
    //数据源URL
    dsUrl: {
        type: String,
        value: "/prj-nbgj/test/map-legends.json",
        reflectToAttribute: true
    },
  },
  attached:function(){
    var _this = this;
  },
  detached:function(){
    var container = this.$$(".legend-container");
    $(container).off("click");
  },
  
  
    /**
   * 组件内部数据源加载数据的处理函数
   */
  _internal_load:function(config){
    var _this = this;
    var adapter = this.$$("#adapter");
    var ds = this.$$("#ds");

    config = config || {};
    config.parameters = config.parameters || {};

    //设置适配器URL
    if(this.adapterUrl)adapter.url = this.adapterUrl;

    //设置数据源URL
    if(this.dsUrl)ds.url = this.dsUrl;

    //请求完成时，进行渲染
    config.success = function(data){
      _this.loaded = true;
      _this._internal_render(data); 
    };
    
    //加载数据
    ds.load(config);
  },
  
  /**
   * 数据加载
   */
  _internal_render:function(data){
    if(!data || !data.data || !data.data.length) return;

    var returnData = data.data;
    returnData.forEach(function(item,i){
      item.iconHidden ? item.filter = 'filter' : item.filter = '';
    })
    
    this._legendList = returnData;

    this._initEvent();
  },

  _initEvent: function(){
    var _this = this;
    var container = _this.$$(".legend-container");
    $(container).off("click").on("click", ".list-item", function(event){
      var data = this.dataset;
      _this.fire('legend', data);
    })
  },
});

/**
 * 改变指定图例的状态（图标变化）
 */
vtron.comp.std.map.Legend.prototype.changeState = function(name, state){
  var _this = this;

  var item = this.$$(".list-item[data-name='" + name + "']");
  if(!item){
    console.warn("未找到指定图例：" + name);
    return;
  }

  var data = item.dataset;
  if(!state){
    if(data.icon)$(item).find(".icon img")[0].classList.remove("filter");
  } else if(state == "hidden"){
    $(item).find(".icon img")[0].classList.add("filter");
  }
}