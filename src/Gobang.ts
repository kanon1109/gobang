/**
 * 五子棋算法类
 * @author Kanon
 */
class Gobang 
{
    private rows:number;
    private columns:number;
    private gridAry:any[];
	public constructor(rows:number, columns:number)
	{
        this.rows = rows;
        this.columns = columns;
        this.gridAry = [];
        for(var i:number = 0; i < rows; ++i)
        {
            this.gridAry[i] = [];
            for(var j:number = 0; j < columns; ++j)
            {
                var grid:Grid = new Grid();
                grid.r = i;
                grid.c = j;
                this.gridAry[i][j] = grid;
            }
        }
	}

    /**
     * 下子
     * @param r     行
     * @param c     列
     * @param color 颜色
     */
    public playChess(r:number, c:number, color:number):void
    {
        if(r < 0 || c < 0) return;
        if(r >= this.rows || c >= this.columns) return;
        var grid:Grid = this.gridAry[r][c];
        if(grid.chessman) return;
        grid.chessman = new Chessman();
        grid.chessman.color = color;
    }

    /**
     * 根据位置获取格子
     * @param posX          x位置
     * @param posY          y位置
     * @param gridWidth     格子宽度
     * @param gridHeight    格子高度
     */
    public getGridByPos(posX:number,
                        posY:number,
                        gridWidth:number,
                        gridHeight:number):Grid
    {
        var c:number = Math.floor(posX / gridWidth);
        var r:number = Math.floor(posY / gridHeight);
        var grid:Grid = this.gridAry[r][c];
        return grid;
    }

    /**
     * 重置棋盘
     */
    public reset():void
    {
        for(var i:number = 0; i < this.rows; ++i)
        {
            for(var j:number = 0; j < this.columns; ++j)
            {
                var grid:Grid = this.gridAry[i][j];
                grid.chessman = null;
            }
        }
    }

    /**
     * 判断棋子
     * @param r         行数
     * @param c         列数
     */
    public checkWin(r:number, c:number):boolean
    {
        if(r < 0 || c < 0) return false;
        if(r >= this.rows || c >= this.columns) return false;
        var grid:Grid = this.gridAry[r][c];
        if(!grid.chessman) return false;
        //判断8个方向上的相同颜色棋子
        //获取上下相同颜色的棋子
        var sameColorCount:number = this.checkSameChessByDir(grid.r, grid.c, 1) +
                                    this.checkSameChessByDir(grid.r, grid.c, 2);
        console.log("上下sameColorCount", sameColorCount);
        if(sameColorCount >= 4) return true;

        //获取左右相同颜色的棋子
        sameColorCount = this.checkSameChessByDir(grid.r, grid.c, 3) +
                         this.checkSameChessByDir(grid.r, grid.c, 4);
        console.log("左右sameColorCount", sameColorCount);
        if(sameColorCount >= 4) return true;

        //获取左上右下相同颜色的棋子
        sameColorCount = this.checkSameChessByDir(grid.r, grid.c, 5) +
                         this.checkSameChessByDir(grid.r, grid.c, 8);
        console.log("左上右下sameColorCount", sameColorCount);
        if(sameColorCount >= 4) return true;

        //获取左下右上相同颜色的棋子
        sameColorCount = this.checkSameChessByDir(grid.r, grid.c, 6) +
                         this.checkSameChessByDir(grid.r, grid.c, 7);
        console.log("左下右上sameColorCount", sameColorCount);
        if(sameColorCount >= 4) return true;

        return false;
    }


    /**
     * 根据方向判断相同颜色棋子的数量
     * @param r     行数
     * @param c     列数
     * @param dir   方向 1上 2下 3左 4右 5左上 6左下 7右上 8右下
     */
    private checkSameChessByDir(r:number, c:number, dir:number):number
    {
        if(dir < 1 || dir > 8) return 0;
        var grid:Grid = this.gridAry[r][c];
        if(!grid.chessman) return 0;
        var curGridColor:number = grid.chessman.color;
        var sameColorCount:number = 0;
        //判断8个方向的边界
        for(var i:number = 1; i <= 4; ++i)
        {
            var row:number = r;
            var column:number = c;
            if(dir == 1)
            {
                row = r - i;
            }
            else if(dir == 2)
            {
                row = r + i;
            }
            else if(dir == 3)
            {
                column = c - i;
            }
            else if(dir == 4)
            {
                column = c + i;
            }
            else if(dir == 5)
            {
                row = r - i;
                column = c - i;
            }
            else if(dir == 6)
            {
                row = r + i;
                column = c - i;
            }
            else if(dir == 7)
            {
                row = r - i;
                column = c + i;
            }
            else if(dir == 8)
            {
                row = r + i;
                column = c + i;
            }

            if(row < 0 ||
               row >= this.rows ||
               column < 0 ||
               column >= this.columns) continue;

            grid = this.gridAry[row][column];
            if(!grid ||
               !grid.chessman ||
               grid.chessman.color != curGridColor)
               break;
            sameColorCount++;
        }
        return sameColorCount;
    }
}
