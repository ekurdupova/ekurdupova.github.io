class GameData
{
	constructor(solution, itemsOpenedOnStart, verticalConditions, horizontalConditions)
	{
		this._matrix = solution;
		this._imagesOpenedOnStart = itemsOpenedOnStart;			// contains arrays with 2 values - row and column of selected image
		this._verticalConditions = verticalConditions;			// contains arrays with 3 values.
																// first number is 0 or 1; 0 means posititve condition.
																// next 2 numbers point to image numbers.
		this._horizontalConditions = horizontalConditions;		// contains arrays with 5 itema.
																// first number says should there be an arrow or not; 0 means no arrow.
																// second number says should there be a negative image, dots or usual image in the middle: 0 means no negative image; 1 means negative image; 2 means dots. 
																// next 3 numbers point to image numbers.
		
//			_matrix = new Array(6);
//			
//			// person
//			_matrix[0] = new Array(6);
//			_matrix[0][0] = 5;
//			_matrix[0][1] = 0;
//			_matrix[0][2] = 3;
//			_matrix[0][3] = 2;
//			_matrix[0][4] = 4;
//			_matrix[0][5] = 1;
//			
//			// house
//			_matrix[1] = new Array(6);
//			_matrix[1][0] = 13;
//			_matrix[1][1] = 15;
//			_matrix[1][2] = 11;
//			_matrix[1][3] = 14;
//			_matrix[1][4] = 10;
//			_matrix[1][5] = 12;
//			
//			// number
//			_matrix[2] = new Array(6);
//			_matrix[2][0] = 21;
//			_matrix[2][1] = 22;
//			_matrix[2][2] = 24;
//			_matrix[2][3] = 23;
//			_matrix[2][4] = 20;
//			_matrix[2][5] = 25;
//			
//			// fruit
//			_matrix[3] = new Array(6);
//			_matrix[3][0] = 35;
//			_matrix[3][1] = 31;
//			_matrix[3][2] = 33;
//			_matrix[3][3] = 32;
//			_matrix[3][4] = 34;
//			_matrix[3][5] = 30;
//			
//			// transport
//			_matrix[4] = new Array(6);
//			_matrix[4][0] = 43;
//			_matrix[4][1] = 40;
//			_matrix[4][2] = 42;
//			_matrix[4][3] = 44;
//			_matrix[4][4] = 41;
//			_matrix[4][5] = 45;
//			
//			// character
//			_matrix[5] = new Array(6);
//			_matrix[5][0] = 54;
//			_matrix[5][1] = 51;
//			_matrix[5][2] = 52;
//			_matrix[5][3] = 53;
//			_matrix[5][4] = 50;
//			_matrix[5][5] = 55;
//			
//			// set images opened on start
//			_imagesOpenedOnStart = new Array();
//			_imagesOpenedOnStart.push([2,3], [4,0], [5,5]);
//			
//			// set vertical conditions
//			_verticalConditions = new Array();
//			_verticalConditions.push([0, 14, 53]);
//			_verticalConditions.push([0, 31, 51]);
//			
//			// set horizontal conditions
//			_horizontalConditions = new Array();
//			_horizontalConditions.push([1, 0, 4, 44, 11]);
//			_horizontalConditions.push([1, 1, 20, 35, 3]);
//			_horizontalConditions.push([0, 0, 30, 4, 30]);
//			_horizontalConditions.push([1, 1, 50, 1, 11]);
//			_horizontalConditions.push([0, 2, 52, -1, 50]);
//			_horizontalConditions.push([0, 0, 40, 5, 40]);
//			_horizontalConditions.push([1, 0, 33, 51, 43]);
//			_horizontalConditions.push([0, 0, 0, 54, 0]);
//			_horizontalConditions.push([0, 0, 12, 20, 12]);
//			_horizontalConditions.push([0, 0, 22, 52, 22]);
//			_horizontalConditions.push([1, 0, 42, 32, 20]);
//			_horizontalConditions.push([1, 0, 3, 15, 54]);
//			_horizontalConditions.push([0, 0, 21, 15, 21]);
//			_horizontalConditions.push([0, 2, 24, -1, 34]);
//			_horizontalConditions.push([0, 0, 31, 13, 31]);
//			_horizontalConditions.push([0, 0, 41, 55, 41]);
//			_horizontalConditions.push([0, 2, 54, -1, 24]);
	}
	
	getItemsOpenedOnStart()
	{
		return this._imagesOpenedOnStart;
	}
	
	getSolution()
	{
		return this._matrix;
	}
	
	getVerticalConditions()
	{
		return this._verticalConditions;
	}
	
	getHorizontalCondition()
	{
		return this._horizontalConditions;
	}
}