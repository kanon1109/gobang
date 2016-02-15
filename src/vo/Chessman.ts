/**
 * 棋子
 * @author 
 * Kanon
 */
class Chessman 
{
    //黑子
    public static BLACK:number = 0;
    //白子
    public static WHITE:number = 1;
    //棋子的颜色
    private color:number;
	public constructor(color:number)
	{
        this.color = color;
	}

    public getColor():number
    {
        return this.color;
    }
}
