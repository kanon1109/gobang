/**
 * 棋子
 * @author
 * Kanon
 */
var Chessman = (function () {
    function Chessman(color) {
        this.color = color;
    }
    var d = __define,c=Chessman,p=c.prototype;
    p.getColor = function () {
        return this.color;
    };
    //黑子
    Chessman.BLACK = 0;
    //白子
    Chessman.WHITE = 1;
    return Chessman;
})();
egret.registerClass(Chessman,'Chessman');
//# sourceMappingURL=Chessman.js.map