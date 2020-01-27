class MathUtil
{
	seedRandom(value)
	{
		this.seed = value;
	}
	
	random(max)
	{
		this.seed = (this.seed*9301 + 49297) % 233280;
		
		var rand = this.seed / 233280;
		
		return rand*max;
	}
}
