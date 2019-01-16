/**
 * 遮罩层，通过jMask.init(options)即可展示一个遮罩层
 * @author zhaoxianlie
 */
var jMask = (function($, undefined){
    /**
     * 遮罩层
     * @param options 配置项
     */
    var MaskClass = function(options){
        var self = this;
        // 配置项
        this.cfg = $.extend({
            zIndex : 1024,
            resizable: true
        }, options);

        // 遮罩层节点
        this.element = $('<div class="j-dialog-mask ' + (this.cfg.className || '') + '"/>').appendTo(document.body)
            .css({
                'display': 'none',
                'zIndex' : this.cfg.zIndex,
                'width': this.width(),
                'height' : this.height()
            });

        // 显示遮罩
        if(this.cfg.show) {
            this.show();
        }

        // 尺寸重绘方法
        this.resizeFunc = function(){
            self.css("width", self.width());
            self.css("height", self.height());
            self.triggerHandler('resize');
        };

        //绑定resize事件
        if(this.cfg.resizable){
            $(window).bind('resize', this.resizeFunc);
        }

    };

    /**
     * 遮罩层的原型链方法
     * @type {Object}
     */
    MaskClass.prototype = {
        constructor: MaskClass,
        /**
         * 显示
         */
        show: function(){
            this.element.show.apply(this.element, arguments);
            this._processTages(1);
        },

        /**
         * 隐藏
         */
        hide: function(){
            this.element.hide.apply(this.element, arguments);
            this._processTages(0);
        },

        /**
         * 获取当前可视区域窗口的宽度
         */
        width: function() {
            return $('body').width();
        },

        /**
         * 获取当前可视区域窗口的高度
         */
        height: function() {
            return Math.max($('body').height(),$(window).height());
        },

        /**
         * 设置遮罩层的样式
         */
        css: function(){
            this.element.css.apply(this.element, arguments);
        },

        /**
         * 事件触发
         */
        triggerHandler: function(){
            this.element.triggerHandler.apply(this.element, arguments);
        },

        /**
         * 事件绑定
         */
        bind: function(){
            this.element.bind.apply(this.element, arguments);
        },

        /**
         * 析构方法
         */
        remove: function(){
            this._processTages(0);
            this.element && this.element.remove();
            $(window).unbind('resize', this.resizeFunc);
            for(var i in this)
                delete this[i];
        },

        _processTages: function(isHide){
            var self = this;

            var userAgent = navigator.userAgent.toLowerCase();
            var isMSIE = /msie/.test( userAgent ) && !/opera/.test( userAgent );
            if(!isMSIE) {
                return;
            }

            self.special = self.special || [];
            if(isHide){
                if(self.special.length > 0)
                    return;

                var doms = $("SELECT");

                if(this.cfg.safety){
                    doms = doms.filter(function(index){
                        return self.cfg.safety.find(this).length == 0;
                    });

                }
                doms.each(function(){
                    var obj = $(this);

                    self.special.push({dom: this, css: obj.css('visibility')});
                    obj.css('visibility', 'hidden');
                })
            }
            else{
                for(var i = 0, len = self.special.length; i < len; i++){
                    $(self.special[i].dom).css('visibility', self.special[i].css || '');
                    self.special[i].dom = null;
                }
            }
        }
    };

    /**
     * 创建一个遮罩
     * @param options
     * @return {*}
     * @private
     */
    var _init = function(options) {
        return new MaskClass(options);
    }

    return {
        init : _init
    };
})(jQuery);