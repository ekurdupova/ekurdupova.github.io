class GameGenerator
{
	constructor()
	{
	}
	
	generateGame(num)
	{
		window.MathUtil.seedRandom(num);
		
		this._itemsOpenedOnStart = new Array();
		this._verticalConditions = new Array();
		this._horizontalConditions = new Array();
		
		this._gameSolution = this.generateGameSolution();
		
		var gameCalculator = new GameCalculator();
		gameCalculator.getSolution(this._verticalConditions, this._horizontalConditions, this._itemsOpenedOnStart);
		this._intermedaiteResult = gameCalculator.getIntermediateResult();
		
		this.openRandomItems();
		
		while(!gameCalculator.canBeGameSolved(this._verticalConditions, this._horizontalConditions, this._itemsOpenedOnStart))
		{
			this.generateCondition();
		}
		
		this.removeUnnecessaryConditions(this._verticalConditions);
		this.removeUnnecessaryConditions(this._horizontalConditions);
		
		while (this._verticalConditions.length > 18 || this._horizontalConditions.length > 21)
		{
			if (this._verticalConditions.length > 18)
			{
				this._verticalConditions.splice(this.getRandom(this._verticalConditions.length - 1), 1);
			}
			
			if (this._horizontalConditions.length > 21)
			{
				this._horizontalConditions.splice(this.getRandom(this._horizontalConditions.length - 1), 1);
			}
			
			while (!gameCalculator.canBeGameSolved(this._verticalConditions, this._horizontalConditions, this._itemsOpenedOnStart))
			{
				this._intermedaiteResult = gameCalculator.getIntermediateResult();
				this.openItem();
			}
		}
		
		this.removeUnnecessaryConditions(this._verticalConditions);
		this.removeUnnecessaryConditions(this._horizontalConditions);
		
		return new GameData(this._gameSolution, this._itemsOpenedOnStart, this._verticalConditions, this._horizontalConditions);
	}
	
	openRandomItems()
	{
		this.openItem(this.getRandom(3));
	}
	
	removeUnnecessaryConditions(conditions)
	{
		var gameCalculator = new GameCalculator();

		for (var i = 0; i < conditions.length; ++i)
		{
			var items = conditions.splice(i, 1);
			if (gameCalculator.canBeGameSolved(this._verticalConditions, this._horizontalConditions, this._itemsOpenedOnStart))
			{
				--i;
			}
			else
			{
				conditions.splice(i, 0, items[0]);
			}
		}
	}
	
	generateGameSolution()
	{
		var result = new Array(6);
		
		for (var i = 0; i < 6; ++i)
		{
			result[i] = new Array(6);
			var hash = [0,1,2,3,4,5];
			for (var j = 0; j < 6; ++j)
			{
				var index = this.getRandom(hash.length - 1);
				result[i][j] = i*10 + hash[index];
				hash.splice(index, 1);
			}
		}
		
		return result;
	}
	
	generateCondition()
	{
		var randomValue = this.getRandom(2);
		if (randomValue == 0)
		{
			this.generateVerticalCondition();
		}
		else
		{
			this.generateHorizontalCondition();
		}
	}
	
	generateVerticalCondition()
	{
		const NEGATIVE_CONDITION_QUANTITY = 6;
		var condition = new Array(3);
		
		var randomValue = this.getRandom(NEGATIVE_CONDITION_QUANTITY);
		
		var row1 = this.getRandom(5);
		var hash = [0,1,2,3,4,5];
		
		hash.splice(row1, 1);
		var row2 = hash[this.getRandom(4)];
		var column = this.getRandom(5);
		
		condition[1] = this._gameSolution[Math.min(row1, row2)][column];

		if (randomValue > 0)
		{
			condition[0] = 0;
			condition[2] = this._gameSolution[Math.max(row1, row2)][column];
		}
		else
		{
			condition[0] = 1;
			hash = [0,1,2,3,4,5];
			
			var item = this._gameSolution[Math.max(row1, row2)][column] % 10;
			hash.splice(item, 1);
			
			condition[2] = Math.max(row1, row2)*10 + hash[this.getRandom(4)];
		}
		
		this._verticalConditions.push(condition);
	}
	
	generateHorizontalCondition()
	{
		var randomValue = this.getRandom(9);
		
		if (randomValue == 0)
		{
			this.generatehConditionWithDots();
		}
		else if (randomValue < 4)
		{
			this.generateHConditionWithArrow();
		}
		else
		{
			this.generateHConditionWithoutArrow()
		}
	}
	
	generateHConditionWithArrow()
	{
		var condition = new Array(5);
		condition[0] = 1;
		condition[1] = this.getRandom(1);
		
		var row1 = this.getRandom(5);
		var row2 = this.getRandom(5);
		var row3 = this.getRandom(5);
		var column1 = this.getRandom(5);
		var column2;
		
		condition[2] = this._gameSolution[row1][column1];
		
		var hash = [];
		if (column1 >= 2)
		{
			hash.push("left");
		}
		if (column1 <= 3)
		{
			hash.push("right");
		}
		
		var direction = hash[this.getRandom(hash.length - 1)];
		
		if (direction == "left")
		{
			condition[4] = this._gameSolution[row3][column1-2];
			column2 = column1 - 1;
		}
		else
		{
			condition[4] = this._gameSolution[row3][column1+2];
			column2 = column1 + 1;
		}
		
		if (condition[1] == 0)
		{
			condition[3] = this._gameSolution[row2][column2];
		}
		else
		{
			hash = [];
			for (var i = 0; i < 6; ++i)
			{
				if (i != column2)
				{
					hash.push(this._gameSolution[row2][i]);
				}
			}
			
			condition[3] = hash[this.getRandom(hash.length - 1)];
		}
		
		this._horizontalConditions.push(condition);
	}
	
	generateHConditionWithoutArrow()
	{
		var row1 = this.getRandom(5);
		var row2 = this.getRandom(5);
		var column = this.getRandom(5);
		
		var randomValue = this.getRandom(2);
		
		var condition = new Array(5);
		condition[0] = 0;
		condition[2] = condition[4] = this._gameSolution[row1][column];
		
		var hash = [];
		
		if (randomValue == 0)
		{
			condition[1] = 1;
			
			for (var i = 0; i < 6; ++i)
			{
				if ((i != column - 1) && (i != column +1))
				{
					hash.push(this._gameSolution[row2][i]);
				}
			}
			condition[3] = hash[this.getRandom(hash.length - 1)];
		}
		else
		{
			condition[1] = 0;
			
			if (column > 0)
			{
				hash.push(this._gameSolution[row2][column-1]);
			}
			if (column < 5)
			{
				hash.push(this._gameSolution[row2][column+1]);
			}
			
			if (hash.length == 1)
			{
				condition[3] = hash[0];
			}
			else
			{
				condition[3] = hash[this.getRandom(1)];
			}
		}
		
		this._horizontalConditions.push(condition);
	}
	
	generatehConditionWithDots()
	{
		var row1 = this.getRandom(5);
		var row2 = this.getRandom(5);
		var column = this.getRandom(4);
		
		var condition = new Array(5);
		condition[0] = 0;
		condition[1] = 2;
		condition[2] = this._gameSolution[row1][column];
		condition[3] = -1;
		
		var hash = [];
		for (var i = column + 1; i < 6; ++i)
		{
			hash.push(this._gameSolution[row2][i]);
		}
		
		condition[4] = hash[this.getRandom(hash.length - 1)];
		
		this._horizontalConditions.push(condition);
	}
	
	openItem(count)
	{
		if (count == null)
		{
			count = 1;
		}
		
		var hash = [];
		
		for (var i = 0; i < 6; ++i)
		{
			for (var j = 0; j < 6; ++j)
			{
				if (Array.isArray(this._intermedaiteResult[i][j]))
				{
					hash.push([i,j,this._gameSolution[i][j]]);
				}
			}
		}
		
		for (var k = 0; k < count; ++k)
		{
			var randomValue = this.getRandom(hash.length - 1);
			this._itemsOpenedOnStart.push(hash[randomValue]);
			hash.splice(randomValue, 1);
		}
	}
	
	getRandom(val)
	{
		return Math.round(window.MathUtil.random(val));
	}
}