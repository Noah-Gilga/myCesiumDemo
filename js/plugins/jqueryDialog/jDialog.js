/**
 * 自定义对话框
 * @author      zhaoxianlie
 */
(function ( /*importstart*/ ) {
    var scripts = document.getElementsByTagName('script'),
        length = scripts.length,
        src = scripts[length - 1].src,
        pos = src.indexOf('/static/'),
        //scriptPath = src.substr(0, pos) + 'js/jDialog/';
        scriptPath = src.substr(0, pos) + 'js/plugins/jqueryDialog/jDialog/';
    if (!window.importScriptList) window.importScriptList = {};
    window.importScript = function (filename) {
        if (!filename) return;
        if (filename.indexOf("http://") == -1 && filename.indexOf("https://") == -1) {
            if (filename.substr(0, 1) == '/') filename = filename.substr(1);
            filename = scriptPath + filename;
        }
        if (filename in importScriptList) return;
        importScriptList[filename] = true;
        document.write('<script src="' + filename + '" type="text/javascript"><\/' + 'script>');
        //document.write('<script src="' + getRootPath() + filename + '" type="text/javascript"><\/' + 'script>');
    }
})( /*importend*/ );

importScript(getRootPath()+'js/plugins/jqueryDialog/jDialog/jquery.drag.js');
importScript(getRootPath()+'js/plugins/jqueryDialog/jDialog/jquery.mask.js');
importScript(getRootPath()+'js/plugins/jqueryDialog/jDialog/jquery.dialog.js');
/**
 * js获取项目根路径，如： http://localhost/GGFW/
*/
function getRootPath() {
    //获取当前网址，如： http://localhost/GGFW/
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址
    var localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    if (projectName == "")
        projectName = pathName;
    return (localhostPaht + projectName + "/");
}
//document.write("<script src='http://localhost:8888/GZPMap/js/plugins/jqueryDialog/jDialog/jquery.drag.js' type='text/javascript'></script>");
//document.write("<script src='http://localhost:8888/GZPMap/js/plugins/jqueryDialog/jDialog/jquery.mask.js' type='text/javascript'></script>");
//document.write("<script src='http://localhost:8888/GZPMap/js/plugins/jqueryDialog/jDialog/jquery.dialog.js' type='text/javascript'></script>");
