class GameCalculator
{
	
	constructor()
	{
		this._openedItems = 0;
		this._unhandledItems = 6*36;
	}
	
	canBeGameSolved(verticalConditions, horizontalConditions, openedImages)
	{
		this.getSolution(verticalConditions, horizontalConditions, openedImages);
		
		return this._openedItems == 36;
	}
	
	getOpenedItemsCount()
	{
		return this._openedItems;
	}
	
	getIntermediateResult()
	{
		return this._result;
	}
	
	getSolution(verticalConditions, horizontalConditions, openedImages)
	{
		this.resetResult();
		
		for (var i = 0; i < openedImages.length; ++i)
		{
			this._result[openedImages[i][0]][openedImages[i][1]] = openedImages[i][2];
		}
		
		this.calculateOpenedAndUnhandledItems();
		
		var oldOpenedItems = -1;
		var oldUnhandledItems = -1;
		
		while (!(this._openedItems == 36 || (oldOpenedItems == this._openedItems && oldUnhandledItems == this._unhandledItems)))
		{
			oldOpenedItems = this._openedItems;
			oldUnhandledItems = this._unhandledItems;
			
			this.handleResult();
			this.calculateByVConditions(verticalConditions);
			this.calculateByHConditions(horizontalConditions);
			
			this.calculateOpenedAndUnhandledItems();
		}
		
		return this._result;
	}
	
	resetResult()
	{
		this._result = [];
		for (var i = 0; i < 6; ++i)
		{
			this._result[i] = [];
			for (var j = 0; j < 6; ++j)
			{
				this._result[i][j] = [0,1,2,3,4,5];
			}
		}
	}
	
	calculateOpenedAndUnhandledItems()
	{
		this._openedItems = 0;
		this._unhandledItems = 0;
		
		for (var i = 0; i < 6; ++i)
		{
			for (var j = 0; j < 6; ++j)
			{
				if (Array.isArray(this._result[i][j]))
				{
					this._unhandledItems += this._result[i][j].length;
				}
				else
				{
					++this._openedItems;
				}
			}
		}
	}
	
	handleResult()
	{
		this.hideOpenedImages();
		this.openUniqueInRow();
		this.openSingle();
	}
	
	hideOpenedImages()
	{
		for (var i = 0; i < 6; ++i)
		{
			for (var j = 0; j < 6; ++j)
			{
				if (!(Array.isArray(this._result[i][j])))
				{
					var itemForSearch = this.getColumn(this._result[i][j]);
					for (var k = 0; k < 6; ++k)
					{
						this.removeItemfromObject(itemForSearch, this._result[i][k]);
					}
				}
			}
		}
	}
	
	openUniqueInRow()
	{
		for (var i = 0; i < 6; ++i)
		{
			var countOf0 = 0;
			var countOf1 = 0;
			var countOf2 = 0;
			var countOf3 = 0;
			var countOf4 = 0;
			var countOf5 = 0;
			
			var lastPositionOf0 = -1;
			var lastPositionOf1 = -1;
			var lastPositionOf2 = -1;
			var lastPositionOf3 = -1;
			var lastPositionOf4 = -1;
			var lastPositionOf5 = -1;

			for (var j = 0; j < 6; ++j)
			{
				if (Array.isArray(this._result[i][j]))
				{
					if (this._result[i][j].indexOf(0) != -1)
					{
						++countOf0;
						lastPositionOf0 = j;
					}
					if (this._result[i][j].indexOf(1) != -1)
					{
						++countOf1;
						lastPositionOf1 = j;
					}
					if (this._result[i][j].indexOf(2) != -1)
					{
						++countOf2;
						lastPositionOf2 = j;
					}
					if (this._result[i][j].indexOf(3) != -1)
					{
						++countOf3;
						lastPositionOf3 = j;
					}
					if (this._result[i][j].indexOf(4) != -1)
					{
						++countOf4;
						lastPositionOf4 = j;
					}
					if (this._result[i][j].indexOf(5) != -1)
					{
						++countOf5;
						lastPositionOf5 = j;
					}
				}
			}
			
			if (countOf0 == 1)
			{
				this._result[i][lastPositionOf0] = i*10;
			}
			
			if (countOf1 == 1)
			{
				this._result[i][lastPositionOf1] = i*10 + 1;
			}
			
			if (countOf2 == 1)
			{
				this._result[i][lastPositionOf2] = i*10 + 2;
			}
			
			if (countOf3 == 1)
			{
				this._result[i][lastPositionOf3] = i*10 + 3;
			}
			
			if (countOf4 == 1)
			{
				this._result[i][lastPositionOf4] = i*10 + 4;
			}
			
			if (countOf5 == 1)
			{
				this._result[i][lastPositionOf5] = i*10 + 5;
			}
		}
	}
	
	openSingle()
	{
		for (var i = 0; i < 6; ++i)
		{
			for (var j = 0; j < 6; ++j)
			{
				if (Array.isArray(this._result[i][j]) && this._result[i][j].length == 1)
				{
					this._result[i][j] = i*10 + this._result[i][j][0];
				}
			}
		}
	}
	
	calculateByVConditions(verticalConditions)
	{
		for (var i = 0; i < verticalConditions.length; ++i)
		{
			this.handleVCondition(verticalConditions[i]);
		}
	}
	
	handleVCondition(verticalCondition)
	{
		if (0 == verticalCondition[0])
		{
			this.handlePositiveVerticalCondition(verticalCondition[1], verticalCondition[2]);
			this.handlePositiveVerticalCondition(verticalCondition[2], verticalCondition[1]);
		}
		else
		{
			this.handleNegariveVCondition(verticalCondition[1], verticalCondition[2]);
			this.handleNegariveVCondition(verticalCondition[2], verticalCondition[1]);
		}
	}
	
	handlePositiveVerticalCondition(item1, item2)
	{
		var row1 = this.getRow(item1);
		var row2 = this.getRow(item2);
		
		var indexOfItem1 = this._result[row1].indexOf(item1);
		
		var itemForSearch1 = this.getColumn(item1);
		var itemForSearch2 = this.getColumn(item2);
		
		if (indexOfItem1 != -1)
		{
			this._result[row2][indexOfItem1] = item2;
		}
		else
		{
			for (var i = 0; i < 6; ++i)
			{
				if (!this.objectContainsItem(this._result[row1][i], item1))
				{
					this.removeItemfromObject(itemForSearch2, this._result[row2][i]);
				}
			}
		}
	}
	
	handleNegariveVCondition(item1, item2)
	{
		var row1 = this.getRow(item1);
		var row2 = this.getRow(item2);
		
		var itemForSearch2 =this. getColumn(item2);
		
		var indexOfItem1 = this._result[row1].indexOf(item1);
		
		if (indexOfItem1 != -1)
		{
			this.removeItemfromObject(itemForSearch2, this._result[row2][indexOfItem1]);
		}
	}
	
	calculateByHConditions(horizontalConditions)
	{
		for (var i = 0; i < horizontalConditions.length; ++i)
		{
			this.handleHCondition(horizontalConditions[i]);
		}
	}
	
	handleHCondition(hCondition)
	{
		if (hCondition[0] == 0 && hCondition[1] == 0)
		{
			this.handlePositiveHConditionWithoutArrow(hCondition[2], hCondition[3]);
		}
		
		if (hCondition[0] == 0 && hCondition[1] == 1)
		{
			this.handleNegativeHConditionWothoutArrow(hCondition[2], hCondition[3]);
			this.handleNegativeHConditionWothoutArrow(hCondition[3], hCondition[2]);
		}
		
		if (hCondition[0] == 1)
		{
			this.handleHConditionWithArrow(hCondition[1] == 0, hCondition[2], hCondition[3], hCondition[4]);
			this.handleHConditionWithArrow(hCondition[1] == 0, hCondition[4], hCondition[3], hCondition[2]);
			
			if (hCondition[1] == 0)
			{
				this.handlehHConditionWithArrowAndPositiveCenter(hCondition[2], hCondition[3], hCondition[4]);
			}
			else if (hCondition[1] == 1)
			{
				this.handleHConditionWithArrowAndNegativeCenter(hCondition[2], hCondition[3], hCondition[4]);
			}
		}
		
		if (hCondition[1] == 2)
		{
			this.handleHConditionWithDots(hCondition[2], hCondition[4]);
		}
	}
	
	handleHConditionWithArrow(positiveCondition, item1, item2, item3)
	{
		var row1 = this.getRow(item1);
		var row2 = this.getRow(item2);
		var row3 = this.getRow(item3);
		
		var itemForSearch1 = this.getColumn(item1);
		var itemForSearch2 = this.getColumn(item2);
		var itemForSearch3 = this.getColumn(item3);
		
		var indexOfItem1 = this._result[row1].indexOf(item1);
		var indexOfItem2;
		
		if (indexOfItem1 != -1)
		{
			if (indexOfItem1 < 2)
			{
				if (positiveCondition)
				{
					this._result[row2][indexOfItem1+1] = item2;
				}
				else
				{
					this.removeItemfromObject(itemForSearch2, this._result[row2][indexOfItem1+1]);
				}
				
				this._result[row3][indexOfItem1+2] = item3;
			}
			else if (indexOfItem1 > 3)
			{
				if (positiveCondition)
				{
					this._result[row2][indexOfItem1-1] = item2;
				}
				else
				{
					this.removeItemfromObject(itemForSearch2, this._result[row2][indexOfItem1-1]);
				}
				
				this._result[row3][indexOfItem1-2] = item3;
			}
			else
			{
//					if (positiveCondition)
//					{
//						if (_result[row2][indexOfItem1-1] == item2)
//						{
//							_result[row3][indexOfItem1-2] = item3;
//						}
//						else if (_result[row2][indexOfItem1+1] == item2)
//						{
//							_result[row3][indexOfItem1+2] = item3;
//						}
//					}
			}
		}
		else
		{
			for (var i = 0; i < 6; ++i)
			{
				var conditionCanRight = true;
				var conditionCanBeLeft = true;
				
				if (i < 4)
				{
					if (positiveCondition && !this.objectContainsItem(this._result[row2][i+1], item2))
					{
						conditionCanRight = false;
					}
					if (!positiveCondition && this._result[row2][i+1] == item2)
					{
						conditionCanRight = false;
					}
					if (!this.objectContainsItem(this._result[row3][i+2], item3))
					{
						conditionCanRight = false;
					}
				}
				else
				{
					conditionCanRight = false;
				}
				
				if (i > 1)
				{
					if (positiveCondition && !this.objectContainsItem(this._result[row2][i-1], item2))
					{
						conditionCanBeLeft = false;
					}
					if (!positiveCondition && this._result[row2][i-1] == item2)
					{
						conditionCanBeLeft = false;
					}
					if (!this.objectContainsItem(this._result[row3][i-2], item3))
					{
						conditionCanBeLeft = false;
					}
				}
				else
				{
					conditionCanBeLeft = false;
				}
				
				if (!conditionCanBeLeft && !conditionCanRight)
				{
					this.removeItemfromObject(itemForSearch1, this._result[row1][i]);
				}
			}
		}
	}
	
	handlehHConditionWithArrowAndPositiveCenter(item1, item2, item3)
	{
		var row1 = this.getRow(item1);
		var row2 = this.getRow(item2);
		var row3 = this.getRow(item3);
		
		var itemForSearch1 = this.getColumn(item1);
		var itemForSearch2 = this.getColumn(item2);
		var itemForSearch3 = this.getColumn(item3);
		
		var indexOfItem2 = this._result[row2].indexOf(item2);
		if (indexOfItem2 != -1)
		{
			for (var i = 0; i < 6; ++i)
			{
				if (i != indexOfItem2 - 1 && i != indexOfItem2 + 1)
				{
					this.removeItemfromObject(itemForSearch1, this._result[row1][i]);
					this.removeItemfromObject(itemForSearch3, this._result[row3][i]);
				}
			}
		}
		else
		{
			this.removeItemfromObject(itemForSearch2, this._result[row2][0]);
			this.removeItemfromObject(itemForSearch2, this._result[row2][5]);
			
			for (var j = 1; j < 5; ++j)
			{
				if ((!this.objectContainsItem(this._result[row1][j-1], item1) && !this.objectContainsItem(this._result[row3][j-1], item3)) ||
					(!this.objectContainsItem(this._result[row1][j+1], item1) && !this.objectContainsItem(this._result[row3][j+1], item3)))
				{
					this.removeItemfromObject(itemForSearch2, this._result[row2][j]);
				}
			}
		}
	}
	
	handleHConditionWithArrowAndNegativeCenter(item1, item2, item3)
	{
		var row1 = this.getRow(item1);
		var row2 = this.getRow(item2);
		var row3 = this.getRow(item3);
		
		var itemForSearch1 = this.getColumn(item1);
		var itemForSearch3 = this.getColumn(item3);
		
		var indexOfItem2 = this._result[row2].indexOf(item2);
		if (indexOfItem2 != -1)
		{
			if (indexOfItem2 == 1 || indexOfItem2 == 2)
			{
				this.removeItemfromObject(itemForSearch1, this._result[row1][indexOfItem2-1]);
				this.removeItemfromObject(itemForSearch3, this._result[row3][indexOfItem2-1]);
			}
			else if (indexOfItem2 == 3 || indexOfItem2 == 4)
			{
				this.removeItemfromObject(itemForSearch1, this._result[row1][indexOfItem2+1]);
				this.removeItemfromObject(itemForSearch3, this._result[row3][indexOfItem2+1]);
			}
		}
	}
	
	handlePositiveHConditionWithoutArrow(item1, item2)
	{
		this.handleFirstItemNearOther(item1, item2);
		this.handleFirstItemNearOther(item2, item1);
	}
	
	handleFirstItemNearOther(item1, item2)
	{
		var row1 = this.getRow(item1);
		var row2 = this.getRow(item2);
		
		var itemForSearch1 = this.getColumn(item1);
		var itemForSearch2 = this.getColumn(item2);
		
		var index = this._result[row1].indexOf(item1);
		if (index != -1)
		{
			for (var i = 0; i < 6; ++i)
			{
				if (i != index - 1 && i != index + 1)
				{
					this.removeItemfromObject(itemForSearch2, this._result[row2][i]);
				}
			}
		}
		else
		{
			var item1Index;
			if ((Array.isArray(this._result[row2][1]) && this._result[row2][1].indexOf(itemForSearch2) == -1) ||
				(!(Array.isArray(this._result[row2][1])) && this._result[row2][1] != item2))
			{
				this.removeItemfromObject(itemForSearch1, this._result[row1][0]);
			}
			
			if ((Array.isArray(this._result[row2][4]) && this._result[row2][4].indexOf(itemForSearch2) == -1) ||
				(!(Array.isArray(this._result[row2][4])) && this._result[row2][4] != item2))
			{
				this.removeItemfromObject(itemForSearch1, this._result[row1][5]);
			}
			
			for (var j = 1; j < 5; ++j)
			{
				if (((Array.isArray(this._result[row2][j-1]) && this._result[row2][j-1].indexOf(itemForSearch2) == -1) || (!(Array.isArray(this._result[row2][j-1])) && this._result[row2][j-1] != item2)) &&
					((Array.isArray(this._result[row2][j+1]) && this._result[row2][j+1].indexOf(itemForSearch2) == -1) || (!(Array.isArray(this._result[row2][j+1])) && this._result[row2][j+1] != item2)))
				{
					this.removeItemfromObject(itemForSearch1, this._result[row1][j]);
				}
			}
		}
	}
	
	handleHConditionWithDots(item1, item2)
	{
		var item1FirstColumn = this.findFirsColumnWithItem(item1);
		var item2LastColumn = this.findLastColumnWithItem(item2);
		
		var itemForSearch1 = this.getColumn(item1);
		var itemForSearch2 = this.getColumn(item2);
		
		var row1 = this.getRow(item1);
		var row2 = this.getRow(item2);
		
		for (var i = 0; i <= item1FirstColumn; ++i)
		{
			this.removeItemfromObject(itemForSearch2, this._result[row2][i]);
		}
		
		for (var j = 5; j >= item2LastColumn; --j)
		{
			this.removeItemfromObject(itemForSearch1, this._result[row1][j]);
		}
	}
	
	handleNegativeHConditionWothoutArrow(item1, item2)
	{
		var row1 = this.getRow(item1);
		var row2 = this.getRow(item2);
		
		var itemForSearch = this.getColumn(item2);
		
		var index = this._result[row1].indexOf(item1);
		if (index != -1)
		{
			if (index > 0)
			{
				this.removeItemfromObject(itemForSearch, this._result[row2][index-1]);
			}
			
			if (index < 5)
			{
				this.removeItemfromObject(itemForSearch, this._result[row2][index+1]);
			}
		}
	}
	
	findFirsColumnWithItem(item)
	{
		var row = this.getRow(item);
		
		for (var i = 0; i < 6; ++i)
		{
			if (this.objectContainsItem(this._result[row][i], item))
			{
				return i;
			}
		}
		
		return -1;
	}
	
	findLastColumnWithItem(item)
	{
		var row = this.getRow(item);
		
		for (var i = 5; i >= 0; --i)
		{
			if (this.objectContainsItem(this._result[row][i], item))
			{
				return i;
			}
		}
		
		return -1;
	}
	
	removeItemfromObject(item, object)
	{
		if (!(Array.isArray(object)))
			return;
		
		var index = object.indexOf(item);
		if (index != -1)
		{
			object.splice(index, 1);
		}
	}
	
	objectContainsItem(object, item)
	{
		if (Array.isArray(object))
		{
			return object.indexOf(this.getColumn(item)) != -1;
		}
		else
		{
			return object == item;
		}
	}
	
	getRow(num)
	{
		return Math.floor(num/10);
	}
	
	getColumn(num)
	{
		return num - this.getRow(num)*10;
	}
}
