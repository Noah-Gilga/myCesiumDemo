/**
 * jQuery drag plugin
 * @author jQuery / zhaoxianlie
 */
var jDrag = (function($, undefined){
    /**
     * 可拖拽的节点封装
     * @param options
     */
    var DraggableClass = function draggable(options){
        if(!options.handle)
            return;
        var s = $.extend({}, options);
        var handle = $(s.handle);
        var target = s.target && $(s.target);
        var currPos = null;
        var type = (s.type || '').toString().toUpperCase();
        handle[0].onselectstart = function() { return false; }
        handle.attr( "unselectable", "on" ).css( "MozUserSelect", "none" );

        var _onDrag = null, _dragging = null;
        var _mouseMove = function(evt){

            var x = evt.pageX - _dragging[0],
                y = evt.pageY - _dragging[1];

            if(target){
                var css = {};
                if(type !== 'Y')
                    css.left = currPos.left + x;
                if(type !== 'X')
                    css.top = currPos.top + y;
                if(!$.isEmptyObject(css))
                    target.css(css);
            }

            if($.isFunction(s.onMove))
                s.onMove(evt, x, y);
        };
        var _mouseUp = function(evt){
            $(document).unbind("mousemove", _mouseMove).unbind("mouseup", _mouseUp);
            _onDrag = false;
            if($.isFunction(s.onUp))
                s.onUp(evt);
        };
        var _mouseDown =  function(evt){
            if(_onDrag)
                _mouseUp();
            if($.isFunction(s.onDown))
                s.onDown(evt);
            if(target)
                currPos = {left: target[0].offsetLeft, top: target[0].offsetTop};
            _dragging = [evt.pageX, evt.pageY];
            $(document).bind("mousemove", _mouseMove).bind("mouseup", _mouseUp);
        };

        s.handle.bind('mousedown', _mouseDown);

        this.remove = function(){
            $(document).unbind("mousemove", _mouseMove);
            $(document).unbind("mousemove", _mouseUp);
            $(document).unbind("mousedown", _mouseDown);
        }

        this.destroy = function () {
            handle.unbind('mousedown', _mouseDown);
        }
    }

    /**
     * 初始化一个可拖拽的节点
     * @param options
     * @private
     */
    var _init = function(options){
        return new DraggableClass(options);
    };

    return {
        init : _init
    };
})(jQuery);