/**
 * 基于jQuery类库的自定义对话框：jDialog
 *
 * @type {*}
 */

var jDialog = (function($, undefined){
    /**
     * 浏览器相关信息
     * @type {*}
     */
    var browserInfo = (function(){
        var userAgent = navigator.userAgent.toLowerCase();
        return {
            version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1],
            safari: /webkit/.test( userAgent ),
            opera: /opera/.test( userAgent ),
            msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
            mozilla: /mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)
        };
    })();

    /**
     * 判断是否为IE6
     * @type {*|Boolean}
     */
    var isIE6 = browserInfo.msie && parseInt(browserInfo.version,10) == 6;

    /**
     * dialog支持的事件列表
     * @type {Array}
     */
    var eventName = ['show','close', 'resize', 'hide', 'enterKey', 'escKey'];

    /**
     * dialog实例群
     * @type {Array}
     * @private
     */
    var dialogInstances = [];

    /**
     * 对话框的默认配置项目
     * @type {Object}
     */
    var defaultOptions = {
    	divid           :'',        //弹出窗口div的ID，默认为空
        modal           : true,     //是否模态窗口
        title           : null,     //窗口标题
        content         : null,     //内容
        width           : 300,      //对话框默认宽度：300px
        height          : null,     //自适应
        minWidth        : 200,      //窗口最小宽度
        minHeight       : 60,       //窗口最小高度
        maxWidth        : null,     //窗口最大宽度：默认无限大
        maxHeight       : null,     //窗口最大高度：默认无限大
        padding         : '10px',   //内边距，默认10px，可以配置上右下左四个值
        fixed           : true ,    //是否使用fix属性定位窗口
        left            : null,     //初始显示位置
        top             : null,     //初始显示位置
        closeable       : true,     //是否可关闭
        hideOnClose     : false,    //关闭时是否只隐藏窗口，而不是删除，可通过show方法再次显示
        draggable       : true,     //是否可拖拽
        contentType     : null,     //如果是iframe,请指定url
        zIndex          : 1024,     //默认z-index为1024
        resizable       : false,    //是否可以通过拖拽改变大小
        autoShow        : true,     //是否自动显示
        autoMiddle      : true,     //窗口大小改变时，保持居中
        autoClose       : 0,        //自动关闭，单位毫秒，0表示不自动关闭
        showShadow      : true,     //是否显示阴影
        showTitle       : true,     //是否显示标题
        textAlign       : 'inherit',//内容对其方式，默认：inherit
        buttonAlign     : 'right',  //按钮对齐方式，可选值：left / right / center，默认：right
        dialogClassName : null,     //对话框的自定义class
        maskClassName   : null,     //遮罩层的自定义class
        wobbleEnable    : false,    //模态下，点击空白处，是否允许对话框呈现动画摆动
        closeOnBodyClick: false,    //点击对话框之外的地方自动关闭
        buttons         : [],       //对话框中包含的按钮
        iframeId        :'jDialogFrame',//对话框iframe的ID
        events          : {}        //事件集合，可选项有：show / close / hide / resize / enterKey / escKey
    };

    /**
     * Dialog类
     * @param s
     */
    var DialogClass = function(s) {
        // 对象管理
        dialogInstances.push(this);
        // 用户自定义配置
        this.cfg = $.extend({}, defaultOptions, s);

        // 相关DOM节点,element表示对话框节点，buttons表示按钮
        this.dom = {
            element : null,
            buttons : []
        };

        // 初始化
        this._init();
    };

    /**
     * Dialog类方法定义
     * @type {Object}
     */
    DialogClass.prototype = {
        constructor: DialogClass,


        /**
         * 临时变量
         * @type {Object}
         * @private
         */
        _tempVars : {},

        /**
         * 设置 / 获取 窗口标题
         * @param   {String}  title    需要设置的标题；不设置参数时，表示获取窗口标题
         * @return  {Object/String}   设置标题时，返回窗口对象；获取窗口标题时，返回标题
         */
        title: function(title){
            if((title || '').length) {
                // setter
                this.dom.element.find('.j-dialog-title>span.j-dialog-txt').html(title || "");
                return this;
            }else{
                // getter
                return this.dom.element.find(".j-dialog-title>span.j-dialog-txt").html();
            }
        },

        /**
         * 设置 / 获取 窗口内容
         * @param   {String}  html    需要设置的内容；不设置参数时，表示获取窗口内容
         * @return  {Object/String}   设置内容时，返回窗口对象；获取窗口内容时，返回内容
         */
        content: function(html) {
            if((html || '').length) {
                // setter
                this.dom.element.find(".j-dialog-body").html(html).css({
                    'text-align' : this.cfg.textAlign
                });
                return this;
            }else{
                // getter
                return $(".j-dialog-body", this.dom.element).html();
            }
        },

        /**
         * 设置 / 获取 窗口宽度
         * @param   {String}  width    需要设置的宽度；不设置参数时，表示获取窗口宽度
         * @return  {Object/Integer}   设置宽度时，返回窗口对象；获取窗口宽度时，返回宽度
         */
        width: function(width){
            if(parseInt(width,10) >= 0) {
                // setter
                this.dom.element.css("width", width);
                return this;
            }else{
                // getter
                return parseInt(this.dom.element.css('width'),10);
            }
        },

        /**
         * 设置 / 获取 窗口高度
         * @param   {String}  height    需要设置的高度；不设置参数时，表示获取窗口高度
         * @return  {Object/Integer}    设置高度时，返回窗口对象；获取窗口高度时，返回高度
         */
        height: function(height){
            height = parseInt(height,10) || 0;
            if(height) {
                // setter
                var shellHeight = 0;

                // 真正的弹层壳高度=titleHeight + bodyPadding
                var bodyPaddings = (this.cfg.padding || '').split(/\s+/);
                switch (bodyPaddings.length) {
                    case 4:
                    case 3:
                        shellHeight += (parseInt(bodyPaddings[0],10) || 0)
                            + (parseInt(bodyPaddings[2],10) || 0);
                        break;
                    case 2:
                    case 1:
                        shellHeight += 2 * (parseInt(bodyPaddings[0],10) || 0);
                        break;
                }
                shellHeight += 35;

                if(this.cfg.minHeight) {
                    height = Math.max(height,this.cfg.minHeight);
                }
                if(this.cfg.maxHeight) {
                    height = Math.min(height,this.cfg.maxHeight);
                }
                height -= shellHeight;
                $(".j-dialog-body", this.dom.element).css("height", height);
                return this;
            }else{
                // getter
                return parseInt(this.dom.element.css('height'),10);
            }
        },

        /**
         * 设置窗口在浏览器中垂直水平居中对其
         * @return {Object} 当前窗口对象
         */
        middle : function(){
            //居中显示
            var doc = $(document);
            var win = $(window);
            var o = this.cfg.fixed && !isIE6 ? [0, 0] : [doc.scrollLeft(), doc.scrollTop()];
            var left = o[0] + (win.width() - this.dom.element.outerWidth()) / 2;
            //考虑用户体验，top不能小于0
            var top =  o[1] + (win.height() - this.dom.element.outerHeight()) /2;
            top = (top >= 0) ? top : 0;

            // 更新位置
            return this.position({
                left : left,
                top : top
            });
        },

        /**
         * 设置/获取 对话框的位置
         * @param       {Object}  pos    需要设置的位置；不设置参数时，表示获取窗口位置
         * @p-config    {Integer} left   窗口位置left坐标
         * @p-config    {Integer} top    窗口位置top坐标
         * @return      {Object}         设置位置时，返回窗口对象；获取窗口位置时，返回位置
         */
        position: function(pos){
            if((!pos.left || isNaN(parseInt(pos.left,10))) && (!pos.top || isNaN(parseInt(pos.top,10)))) {
                // getter
                return this.dom.element.offset();
            }else{
                // setter
                if(!pos.left || isNaN(parseInt(pos.left,10))){
                    // setter for top
                    this.dom.element.css({"top" : pos.top});
                }else if(!pos.top || isNaN(parseInt(pos.top,10))){
                    // setter for left
                    this.dom.element.css({"left" : pos.left});
                }else{
                    // setter for left & top
                    this.dom.element.css({"left" : pos.left, "top" : pos.top});
                }
                this.triggerHandler('resize');
                return this;
            }
        },

        /**
         * 显示对话框
         * @return {Object} 返回当前窗口对象
         */
        show: function(){
            this.dom.element.show.apply(this.dom.element, arguments);
            if(this.mask){
                this.mask.cfg.safety = this.dom.element;
                this.mask.show.apply(this.mask, arguments);
            }

            // 配置了自动关闭
            if(this.cfg.autoClose) {
                var self = this;
                setTimeout(function(){
                    self.close();
                },parseInt(this.cfg.autoClose,10) || 3000)
            }
            this.triggerHandler('show');
            return this;
        },

        /**
         * 隐藏对话框
         * @return {Boolean}
         */
        hide: function(){
            this.dom.element.hide();
            if(this.mask){
                this.mask.hide.apply(this.mask, arguments);
            }
            return this;
        },


        /**
         * 关闭对话框
         * @return {Boolean}
         */
        close : function(){
            var self = this;
            if(!self.dom.element[0]) {
                return this;
            }
            self.triggerHandler('close');
            $(window).unbind("resize", this._tempVars.onResize);
            self.mask && self.mask.remove();
            this._tempVars.dragObj && this._tempVars.dragObj.remove();

            self.dom.element.remove();
            for(var i = 0, len = dialogInstances.length; i < len ; i++){
                if(dialogInstances[i] == self){
                    dialogInstances.splice(i, 1);
                    break;
                }
            }

            return this;
        },

        /**
         * 自定义对话框
         * @param  buttons   对话框按钮
         *         [{
         *               type : 'normal',    // normal 或者 highlight
         *               text : '确定',      // 按钮的显示文本
         *               handler : function(button,dialog){ // 按钮点击事件
         *                    // TODO ...
         *               }
         *         }]
         * @return  {Object} 设置按钮时，返回窗口对象；获取窗口按钮时，返回按钮
         */
        buttons: function(buttons){
            var self = this;
            if(buttons && buttons.length > 0) {
                // setter
                this.cfg.buttons = buttons;

                // 把按钮append到dialog中
                var htmlBtns = [];
                $.each(buttons,function(i,btn){
                    var v,cls = 'j-dialog-btn';
                    if(btn.type == 'highlight') {
                        cls += ' x-highlight';
                    }
                    v = btn.text || '确定';
                    htmlBtns.push('<input type="button" class="' + cls + '" value="' + v + '" />');
                });
                var btnContainer = $('<div class="j-dialog-buttons"></div>').appendTo(this.dom.element).html(htmlBtns.join(''));

                // 按钮对其方式
                btnContainer.css('text-align',this.cfg.buttonAlign || 'right');

                // 给每个按钮绑定点击事件
                var selfBtns = this.dom.buttons = $('input[type=button]', btnContainer);
                $.each(buttons,function(i,btn){
                    var thisBtn = $(selfBtns[i]);
                    thisBtn.click(function(e){
                        if(btn.handler && typeof btn.handler == 'function') {
                            btn.handler.call(thisBtn[0],thisBtn,self);
                        }
                    });
                    if(!isIE6) {
                        thisBtn.hover(function(e){
                            var cls_h = 'x-hover';
                            if(thisBtn.hasClass('x-highlight')) {
                                cls_h = 'x-hlhover';
                            }
                            thisBtn.addClass(cls_h);
                        },function(e){
                            thisBtn.removeClass('x-hover').removeClass('x-hlhover');
                        });
                    }
                });

                return this;
            }else{
                // getter
                return this.dom.buttons;
            }
        },

        /**
         * 给对话框绑定事件
         * @return {*}
         */
        bind: function(){
            this.dom.element.bind.apply(this.dom.element, arguments);
            return this;
        },

        /**
         * 触发对话框的事件
         */
        triggerHandler: function(){
            this.dom.element.trigger.apply(this.dom.element, arguments);
            return this;
        },

        /**
         * 对话框初始化
         * @private
         */
        _init : function(){
            var self = this;
            // 如果未设置标题，则强制设置窗口不可拖拽
            if(!this.cfg.showTitle){
                this.cfg.draggable = false;
            }
            // 如果设置了窗口的位置，无论是top还是left，都强制设置自动居中对其属性为false
            if(!isNaN(parseInt(this.cfg.top)) || !isNaN(parseInt(this.cfg.left))
                || this.cfg.anchor){
                this.cfg.autoMiddle = false;
            }

            // 对话框的css class name
            var className = 'j-dialog ' + (this.cfg.dialogClassName ? this.cfg.dialogClassName : '');
            // 如果配置了fixed
            if (!isIE6 && this.cfg.fixed){
                className += ' j-dialog-fix';
            }
            // 显示阴影
            if (this.cfg.showShadow){
                className += ' j-dialog-shadow';
            }

            // 遮罩层控制
            this._addMask();

            // dialog节点
            this.dom.element = $('<div class="' + className + '" id="' + this.cfg.divid + '"></div>')
                .css({
                    "zIndex" : this.cfg.zIndex,
                    "display" : "none"
                }).appendTo(document.body).focus();

            // 拼装dialog并初始化其位置
            this._setupTitleBar().title(this.cfg.title);
            this._setupContent().content(this.cfg.content);
            this.buttons(this.cfg.buttons);
            this.width(this.cfg.width);
            this.height(this.cfg.height);

            // 设置padding
            $('#j-dialog-body',this.dom.element).css('padding',this.cfg.padding);

            //事件绑定
            $.each(eventName, function(i, evt){
                if(self.cfg.events[evt]){
                    self.dom.element.bind(evt, {
                        dialog : self     // 在每个事件参数中，可以通过event.data.dialog获取到窗口对象
                    }, self.cfg.events[evt]);
                }
            });

            //响应Esc键关闭窗口，Enter键确认提交，其他地方点击，关闭窗口
            this._setupEscKey()._setupEnterKey()._setupBodyClick();

            // 是否初始化即显示
            this.cfg.autoShow && this.show();

            // 设置anchor：锚点
            if(this.cfg.anchor) {
                this._tempVars.domAnchor = $(this.cfg.anchor.target);
                // 设置位置
                if(!this._tempVars.domAnchor[0]) {
                    throw new Error('The "anchor.target" must be a HTMLElement instance!');
                    return this;
                }

                this._setupTriangle();
            }else if(this.cfg.autoMiddle){
                // 是否垂直水平居中对齐
                this.middle();
            }else{
                this.position({
                    left : this.cfg.left,
                    top : this.cfg.top
                });
            }

            /**
             * 窗口的Resize
             */
            this._tempVars.onResize = function(){
                // resize事件是一个非常特殊的东西，必须采取 解绑->执行->再次绑定 的过程
                $(window).unbind("resize", self._tempVars.onResize);
                // 窗口resize时候，自动居中对其
                if(self.cfg.autoMiddle) {
                    self.middle();
                }
                self.triggerHandler('resize');
                self.sizeTimer = setTimeout(function(){
                    $(window).bind("resize", self._tempVars.onResize);
                }, 10);
            }

            $(window).bind("resize", this._tempVars.onResize);
        },

        /**
         * 添加遮罩层
         * @private
         */
        _addMask : function(){
            var self = this;
            if(this.cfg.modal){
                var maskCfg = {};
                // 是否单独配置了遮罩层的class name
                if(this.cfg.maskClassName){
                    maskCfg.className = this.cfg.maskClassName;
                }
                this.mask = jMask.init(maskCfg);

                // 模态情况下，点击空白处，支持窗口摆动，默认：false
                if(this.cfg.wobbleEnable) {
                    this._tempVars.cssAnimationGoing = false;
                    this.mask.element.click(function(e){
                        if(self._tempVars.cssAnimationGoing) return false;
                        self.dom.element.addClass('j-ani-wobble');
                        self._tempVars.cssAnimationGoing = true;
                        setTimeout(function(){
                            self.dom.element.removeClass('j-ani-wobble');
                            self._tempVars.cssAnimationGoing = false;
                        },1100); // 因为动画需要执行1s，所以这里延迟一点时间
                    });
                }
            }
            return self;
        },

        /**
         * 当其他地方被点击时，关闭窗口
         * @return {*}
         * @private
         */
        _setupBodyClick: function(){
            var self = this;
            if(!self.cfg.closeOnBodyClick) {
                return this;
            }
            var func = function(evt){
                if(!$.contains(self.dom.element[0],evt.target)) {
                    self.close();
                }
            };

            self.bind('show', function(evt){
                $(document).bind("mousedown", func);
            });
            $.each(['hide','close'],function(i,eventName){
                self.bind(eventName, function(evt){
                    $(document).unbind('mousedown', func);
                });
            });
            return self;
        },

        /**
         * 设置对话框的标题栏
         * @private
         */
        _setupTitleBar: function() {
            var self = this;

            // 是否支持：关闭
            if (this.cfg.closeable) {
                var btnClose = $('<a href="#" class="j-dialog-close" title="关闭">&nbsp;</a>')
                    .appendTo(this.dom.element)
                    .bind({
                        click : function(evt){
                            self.cfg.hideOnClose ? self.hide() : self.close();
                            evt.preventDefault();
                            evt.stopPropagation();
                        },
                        mousedown : function(evt){
                            evt.preventDefault();
                            evt.stopPropagation();
                        }
                    });
                // 不显示标题的情况下，调整关闭按钮的位置到右上角处
                if (!this.cfg.showTitle) {
                    btnClose.addClass('btn-without-title');
                }
            }

            // 配置标题栏
            if (!this.cfg.showTitle) {
                return self;
            }

            // titleBar 设置
            this._tempVars.titleBar = $('<div class="j-dialog-title"><span class="j-dialog-txt"></span></div>')
                .appendTo(this.dom.element);

            // 是否支持： 拖拽
            if (this.cfg.draggable) {
                this._tempVars.titleBar.addClass('j-draggable');
                var offset = null;
                this._tempVars.dragObj = jDrag.init({
                    handle: self._tempVars.titleBar,
                    target: self.dom.element,
                    onDown: function(){
                        self._setupHackDiv(1);
                        self.dom.element.addClass('j-user-select');
                    },
                    onUp: function(){
                        self._setupHackDiv(0);
                        self.dom.element.removeClass('j-user-select');
                    }
                });
            }
            return self;
        },

        /**
         * 处理内部有iframe页面会卡的情况
         * @param display
         * @private
         */
        _setupHackDiv: function(display){
            var self = this;
            if(display){
                if($("IFRAME", self.dom.element).length > 0){
                    //当内部有iframe的时候，需要特殊处理，要不然页面会卡
                    var con = $(".j-dialog-content", self.dom.element);
                    self.hack_div = (self.hack_div || $("<div></div>")).appendTo(con).css({
                        position:"absolute",
                        "left" : 0,
                        "top" : 0,
                        "cursor" : "move",
                        "display": "block",
                        "width": self.dom.element.outerWidth(),
                        "height" : self.dom.element.outerHeight()
                    });
                }
            } else {
                if(self.hack_div) {
                    self.hack_div.css("display", "none");
                }
            }
            return self;
        },

        /**
         * 响应Esc键关闭窗口
         * @private
         */
        _setupEscKey: function(){
            var self = this;
            var func =  function(event){
                if(event.keyCode == 27){
                    self.triggerHandler('escKey');
                }
            };

            $(self.dom.element).bind('show', function(evt){
                $(document).bind("keydown", func);
            });
            $.each(['hide','close'],function(i,eventName){
                $(self.dom.element).bind(eventName, function(evt){
                    $(document).unbind('keydown', func);
                });
            });
            return self;
        },

        /**
         * 响应回车键
         * @private
         */
        _setupEnterKey: function(){
            var self = this;
            var func = function(event){
                if(event.keyCode == 13 || event.keyCode == 10){
                    self.triggerHandler("enterKey");
                }
            };

            $(self.dom.element).bind('show', function(evt){
                $(document).bind("keydown", func);
            });
            $.each(['hide','close'],function(i,eventName){
                $(self.dom.element).bind(eventName, function(evt){
                    $(document).unbind('keydown', func);
                });
            });

            return self;
        },

        /**
         * 创建小三角
         * @return {*}
         * @private
         */
        _setupTriangle : function(){
            this._tempVars.triangle = $([
                '<div class="j-triangle">',
                '<div class="t-border"></div>',
                '<div class="t-inset"></div>',
                '</div>'
            ].join('')).appendTo(this.dom.element).addClass('anchor-' + {
                left : 'right',
                right : 'left',
                top : 'bottom',
                bottom : 'top'
            }[{
                'left':'left',
                'left-top':'left',
                'left-bottom':'left',

                'top':'top',
                'top-left':'top',
                'top-right':'top',

                'right':'right',
                'right-top':'right',
                'right-bottom':'right',

                'bottom':'bottom',
                'bottom-left':'bottom',
                'bottom-right':'bottom'
            }[this.cfg.anchor.position || 'right']]);

            // 确定小三角的位置
            var posTriangle = {},posDialog = {};
            var domAnchorOffset = this._tempVars.domAnchor.offset();
            var domAnchorSize = {
                width : parseInt(this._tempVars.domAnchor.width(),10),
                height : parseInt(this._tempVars.domAnchor.height(),10)
            };
            var domDialogSize = {
                width : parseInt(this.width(),10),
                height : parseInt(this.height(),10)
            };
            var offset = $.extend({
                top:0,
                left:0,
                right:0,
                bottom:0
            },this.cfg.anchor.offset || {});
            var tpfs = parseInt(this.cfg.anchor.trianglePosFromStart,10) || 0;

            switch ((this.cfg.anchor.position || 'right').toLowerCase()){
                // 顶部居中对齐
                case 'top':
                    posTriangle = {
                        top : 0,
                        left : tpfs ? tpfs : (domDialogSize.width - 24) / 2
                    };
                    posDialog = {
                        top : domAnchorOffset.top - domDialogSize.height - 12 - offset.top,
                        left : domAnchorOffset.left + (domAnchorSize.width - domDialogSize.width) / 2 + offset.left
                    };
                    break;

                // 左上角对齐
                case 'top-left':
                    posTriangle = {
                        top : 0,
                        left : tpfs ? tpfs : (domDialogSize.width - 24) / 2
                    };
                    posDialog = {
                        top : domAnchorOffset.top - domDialogSize.height - 12 - offset.top,
                        left : domAnchorOffset.left + offset.left
                    };
                    break;

                // 右上角对齐
                case 'top-right':
                    posTriangle = {
                        top : 0,
                        left : tpfs ? domDialogSize.width - 24 - tpfs : (domDialogSize.width - 24) / 2
                    };
                    posDialog = {
                        top : domAnchorOffset.top - domDialogSize.height - 12 - offset.top,
                        left : (domAnchorOffset.left + domAnchorSize.width) - domDialogSize.width + offset.right
                    };
                    break;

                // 右，居中对齐
                case 'right':
                    posTriangle = {
                        top : tpfs ? tpfs-domDialogSize.height : -(domDialogSize.height + 24) / 2,
                        left : -24
                    };
                    posDialog = {
                        top : domAnchorOffset.top + (domAnchorSize.height - domDialogSize.height) / 2 + offset.top,
                        left : domAnchorOffset.left + domAnchorSize.width + 12 + offset.right
                    };
                    break;

                // 右上角对齐
                case 'right-top':
                    posTriangle = {
                        top : tpfs ? tpfs-domDialogSize.height : -(domDialogSize.height + 24) / 2,
                        left : -24
                    };
                    posDialog = {
                        top : domAnchorOffset.top + offset.top,
                        left : domAnchorOffset.left + domAnchorSize.width + 12 + offset.right
                    };
                    break;

                // 右下角对齐
                case 'right-bottom':
                    posTriangle = {
                        top : tpfs ? -24-tpfs : -(domDialogSize.height + 24) / 2,
                        left : -24
                    };
                    posDialog = {
                        top : domAnchorOffset.top + domAnchorSize.height - domDialogSize.height - offset.bottom,
                        left : domAnchorOffset.left + domAnchorSize.width + 12 + offset.right
                    };
                    break;

                // 下对齐
                case 'bottom':
                    posTriangle = {
                        top : -(domDialogSize.height + 24),
                        left : tpfs ? tpfs : (domDialogSize.width - 24) / 2
                    };
                    posDialog = {
                        top : domAnchorOffset.top + domAnchorSize.height + 12 + offset.bottom,
                        left : domAnchorOffset.left + (domAnchorSize.width - domDialogSize.width) / 2 + offset.left
                    };
                    break;

                // 下左角对齐
                case 'bottom-left':
                    posTriangle = {
                        top : -(domDialogSize.height + 24),
                        left : tpfs ? tpfs : (domDialogSize.width - 24) / 2
                    };
                    posDialog = {
                        top : domAnchorOffset.top + domAnchorSize.height + 12 + offset.bottom,
                        left : domAnchorOffset.left + offset.left
                    };
                    break;

                // 下右角对齐
                case 'bottom-right':
                    posTriangle = {
                        top : -(domDialogSize.height + 24),
                        left : tpfs ? domDialogSize.width - 24 - tpfs : (domDialogSize.width - 24) / 2
                    };
                    posDialog = {
                        top : domAnchorOffset.top + domAnchorSize.height + 12 + offset.bottom,
                        left : (domAnchorOffset.left + domAnchorSize.width) - domDialogSize.width + offset.right
                    };
                    break;

                // 左居中对齐
                case 'left':
                    posTriangle = {
                        top : tpfs ? tpfs-domDialogSize.height : -(domDialogSize.height + 24) / 2,
                        left : domDialogSize.width
                    };
                    posDialog = {
                        top : domAnchorOffset.top + (domAnchorSize.height - domDialogSize.height) / 2 + offset.top,
                        left : domAnchorOffset.left - domDialogSize.width - 12 - offset.left
                    };
                    break;

                // 左上对齐
                case 'left-top':
                    posTriangle = {
                        top : tpfs ? tpfs-domDialogSize.height : -(domDialogSize.height + 24) / 2,
                        left : domDialogSize.width
                    };
                    posDialog = {
                        top : domAnchorOffset.top + offset.top,
                        left : domAnchorOffset.left - domDialogSize.width - 12 - offset.left
                    };
                    break;

                // 左下对齐
                case 'left-bottom':
                    posTriangle = {
                        top : tpfs ? -24-tpfs : -(domDialogSize.height + 24) / 2,
                        left : domDialogSize.width
                    };
                    posDialog = {
                        top : domAnchorOffset.top + domAnchorSize.height - domDialogSize.height - offset.bottom,
                        left : domAnchorOffset.left - domDialogSize.width - 12 - offset.left
                    };
                    break;

            }

            this._tempVars.triangle.css(posTriangle);

            this.position(posDialog);

            this.dom.element.css('overflow','visible');

            return this;
        },

        /**
         * 安装Content-layout
         * @private
         */
        _setupContent: function(){
            if(this.cfg.contentType === 'iframe'){
                this.cfg.content = $("<iframe></iframe>")
                    .css({
                        width: "100%",
                        height : "100%",
                        border : "none"
                    }).attr({
                        "src": this.cfg.content,
                        "id":this.cfg.iframeId,
                        "frameBorder" : 0
                        
                    });
            }

            var wrap = $([
                '<div class="j-dialog-content">',
                '<div class="j-dialog-body" id="j-dialog-body"></div>',
                '</div>'].join(''));
            var self= this;

            this.dom.element.append(wrap);

            // 是否支持：resize
            if(this.cfg.resizable){
                var con = $(".j-dialog-content", self.dom.element);
                this.cfg.minWidth = this.cfg.minWidth || 0;
                this.cfg.minHeight = this.cfg.minHeight || 0;
                $.each(['es'], function(k, v){
                    var ele = $('<div class="resizable-' + v + '"><div></div></div>');
                    self.dom.element.append(ele);
                    var val_W = null, val_H = null;
                    jDrag.init({
                        handle: ele,
                        onDown: function(event){
                            self._setupHackDiv(1);
                            val_W = parseInt(self.dom.element.width());val_H = parseInt(con.height());
                            self.dom.element.addClass('j-user-select');
                        },
                        onMove: function(event, x, y){
                            var width = val_W + x;
                            var height = val_H + y;
                            if(!((self.cfg.minWidth && width < self.cfg.minWidth && x < 0)
                                || (self.cfg.maxWidth && (width > self.cfg.maxWidth) && x >0)))
                                self.dom.element.width(width);
                            if(!( (self.cfg.minHeight  && (height < self.cfg.minHeight) && y < 0)
                                || ((self.cfg.maxHeight) && (height > self.cfg.maxHeight) && y >0 )))
                                con.height(height);
                            var w = self.dom.element.outerWidth(),
                                h = self.dom.element.outerHeight();
                            if(self.hack_div)
                                self.hack_div.css({"width": w, "height" : h});
                        },
                        onUp: function(event){
                            self._setupHackDiv(0);
                            self.dom.element.removeClass('j-user-select');
                        }
                    });
                });
            }

            return self;
        }
    };


    /**
     * 自定义对话框，最通用最基础的一个API接口
     * @param       {Object}  options dialog的其他配置项
     * @return      {Object}  当前dialog对象
     */
    var _dialog = function(options){
        var cfg = $.extend({},  options || {});
        return new DialogClass(cfg);
    };

    /**
     * 普通alert框
     * @param       {String}  content 提示框的内容
     *
     * @param       {Object}  button  确定按钮，最多只有一个按钮
     * @p-config    {String}  text    按钮文字，默认：确定
     * @p-config    {String}  type    按钮类型，默认：normal，可选：highlight（高亮）
     * @p-config    {String}  handler 按钮点击后的执行动作，默认：关闭当前对话框
     *
     * @param       {Object}  options dialog的其他配置项
     *
     * @return      {Object}  当前dialog对象
     */
    var _alert = function(content,button,options){
        options = options || {};
        button = $.extend({
            type : 'highlight',
            handler : function(btn,dlg){
                dlg.close();
            }
        },button || {});
        options = $.extend({
            wobbleEnable:true
        },options,{
            content : content,
            buttons : [].concat(button),
            title : options.title ? options.title : '提示'
        });
        return _dialog(options);
    };

    /**
     * 确认对话框
     * @param       {String}  content       提示框的内容
     *
     * @param       {Object}  acceptButton  确认按钮
     * @p-config    {String}  text          按钮文字，默认：确定
     * @p-config    {String}  type          按钮类型，默认：normal，可选：highlight（高亮）
     * @p-config    {String}  handler       按钮点击后的执行动作，默认：关闭当前对话框
     *
     * @param       {Object}  cancelButton  取消按钮
     * @p-config    {String}  text          按钮文字，默认：取消
     * @p-config    {String}  type          按钮类型，默认：normal，可选：highlight（高亮）
     * @p-config    {String}  handler       按钮点击后的执行动作，默认：关闭当前对话框
     *
     * @param       {Object}  options       dialog的其他配置项
     *
     * @return      {Object}  当前dialog对象
     */
    var _confirm = function(content,acceptButton,cancelButton,options){
        options = options || {};

        // 确认按钮
        acceptButton = $.extend({
            type : 'highlight',
            handler : function(btn,dlg){
                dlg.close();
            }
        },acceptButton || {});

        // 取消按钮
        cancelButton = $.extend({
            text : '取消',
            handler : function(btn,dlg){
                dlg.close();
            }
        },cancelButton || {});

        options = $.extend({
            wobbleEnable : true
        },options,{
            content : content,
            buttons : [].concat([acceptButton,cancelButton]),
            title : options.title ? options.title : '确认'
        });
        return _dialog(options);
    };


    /**
     * 普通消息框，无title
     * @param       {String}  content 消息的内容
     *
     * @param       {Object}  options dialog的其他配置项
     *
     * @return      {Object}  当前dialog对象
     */
    var _message = function(content,options){
        options = options || {};
        options = $.extend({
            content : content,
            padding : '20px 10px 20px 10px',
            textAlign : 'center'
        },options,{
            showTitle : false
        });
        return _dialog(options);
    };


    /**
     * 一个带有小三角箭头的tip消息框，无title，非模态
     *
     * @param       {String}  content 消息的内容
     *
     * @param       {Object}  anchor 小三角箭头的相关配置
     *
     * @p-config    {jQ-Elm}  target    小箭头需要指向的HTML节点，且用jQuery封装的对象
     * @p-config    {String}  position  tip消息框出现的位置（相对于target），可选：
     *                                  top / top-left / top-right
     *                                  right / right-top / right-bottom
     *                                  bottom / bottom-left / bottom-right
     *                                  left / left-top / left-bottom
     * @p-config    {Object}  offset    消息框与target之间的位置偏移
     * @p-c-item    {Integer} top       dialog与target之间顶部偏移，position中含top时生效
     * @p-c-item    {Integer} right     dialog与target之间右侧偏移，position中含right时生效
     * @p-c-item    {Integer} bottom    dialog与target之间底部偏移，position中含bottom时生效
     * @p-c-item    {Integer} left      dialog与target之间左侧偏移，position中含left时生效
     * @p-config    {Integer} trianglePosFromStart 小三角距离弹窗边缘的距离
     *
     * @param       {Object}  options dialog的其他配置项
     *
     * @return      {Object}  当前dialog对象
     */
    var _tip = function(content,anchor,options){
        options = options || {};
        options = $.extend({
            padding : '20px 10px 20px 10px',
            textAlign : 'center',
            width : 'auto',
            anchor : {
                target : null,
                position : 'right'
            }
        },options,{
            content : content,
            anchor : anchor,
            showTitle : false,
            showShadow: false,
            modal : false,
            fixed : false
        });
        return _dialog(options);
    };

    /**
     * 在对话框中显示一个iframe页面
     * @param       {String}  url     消息的内容
     *
     * @param       {Object}  options dialog的其他配置项
     *
     * @return      {Object}  当前dialog对象
     */
    var _iframe = function(url,options){
        options = options || {};
        options = $.extend({
            content : url,
            title : '窗口',
            width:600,
            height:300
        },options,{
            contentType : 'iframe'
        });
        return _dialog(options);

    };


    return {
        version : '1.3',
        dialog  : _dialog,
        alert   : _alert,
        confirm : _confirm,
        message : _message,
        tip     : _tip,
        iframe  : _iframe
    };

})(jQuery);