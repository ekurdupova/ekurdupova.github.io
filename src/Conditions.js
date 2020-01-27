class Conditions extends EventTarget
{
	render(parent, document, game)
	{
		this.game = game;
		this.hConditionsCount = 0;
		this.vConditionsCount = 0;
		
		this.vConditionsTable = document.createElement('table');
		this.vConditionsTable.style.width = '100%';
		this.vConditionsTable.style.height = '20%';
		this.vConditionsTable.style.tableLayout = 'fixed';
		this.vConditionsTable.style.position = 'absolute';
		this.vConditionsTable.style.bottom = 0;
		this.vConditionsTable.style.left = 0;
		this.vConditionsTable.style.backgroundColor = 'ffffff';
		this.vConditionsTable.addEventListener("contextmenu", this.onContextMenu);

		this.tr = document.createElement('tr');
		this.tr.style.backgroundColor = '000000';
		this.vConditionsTable.appendChild(this.tr);
		
		parent.appendChild(this.vConditionsTable);
		
		this.hConditionsTable = document.createElement('table');
		this.hConditionsTable.style.width = '47%';
		this.hConditionsTable.style.tableLayout = 'fixed';
		this.hConditionsTable.style.backgroundColor = 'ffffff';
		this.hConditionsTable.addEventListener("contextmenu", this.onContextMenu);
		
		for (var i = 0; i < 7; ++i)
		{
			var tr = document.createElement('tr');
			this.hConditionsTable.appendChild(tr);
		}
		
		this.hConditionsTable.style.position = 'absolute';
		this.hConditionsTable.style.top = '0';
		this.hConditionsTable.style.right = '0';
		parent.appendChild(this.hConditionsTable);
		
		this.currentRow = 0;
		
		this.parent = parent;
		this.document = document;
	}
	
	onContextMenu(event)
	{
		event.preventDefault();
	}
	
	addVerticalCondition(isRegular, topImageNum, bottomImageNum)
	{
		var condition = this.document.createElement('div');
		condition.parent = this;
		condition.data = {isRegular: isRegular, topImageNum: topImageNum, bottomImageNum: bottomImageNum};
		condition.data.type = "vertical";
		condition.addEventListener("mousedown", this.onMouseDown);
		
		var div0 = this.document.createElement('div');
		var div1 = this.document.createElement('div');
		
		var topImage = this.document.createElement('img');
		var prefix = topImageNum < 10 ? "0" : "";
		var imageSrc = "images/" + prefix + topImageNum + ".jpg";
		topImage.src = imageSrc;
		topImage.style.maxWidth = '95%';
		topImage.addEventListener("contextmenu", this.onContextMenu);
		
		var bottomImage = this.document.createElement('img');
		var prefix = bottomImageNum < 10 ? "0" : "";
		imageSrc = "images/" + prefix + bottomImageNum + ".jpg";
		bottomImage.src = imageSrc;
		bottomImage.style.maxWidth = '95%';
		bottomImage.addEventListener("contextmenu", this.onContextMenu);
		
		div0.appendChild(topImage);
		condition.appendChild(div0);
		
		div1.appendChild(bottomImage);
		condition.appendChild(div1);
		
		var td = this.document.createElement('td');
		td.style.backgroundImage = "url('images/v_back.jpg')";
		td.style.backgroundSize = '100% 100%';
		td.appendChild(condition);
		
		if (!isRegular)
		{
			var noImage = this.document.createElement('img');
			noImage.src = "images/no.png";
			noImage.style.height = '50%';
			noImage.style.width = '100%';
			noImage.style.position = 'absolute';
			noImage.style.magrin = '0';
			noImage.style.top = '25%';
			noImage.style.left = 0;
			noImage.addEventListener("contextmenu", this.onContextMenu);
			condition.style.position = 'relative';
			condition.appendChild(noImage);
		}
		
		this.tr.insertBefore(td, this.tr.childNodes[this.vConditionsCount]);
		++this.vConditionsCount;
	}
	
	addEmptyVerticalCondition()
	{
		var td = this.document.createElement('td');
		td.style.backgroundImage = "url('images/v_back.jpg')";
		td.style.backgroundSize = '100% 100%';
		
		this.tr.appendChild(td);
	}
	
	getEmptyHorizontalCondition()
	{
		var td = this.document.createElement('td');
		td.style.backgroundImage = "url('images/h_back.jpg')";
		td.style.backgroundSize = "100% 100%";
		
		return td;
	}
	
	addEmptyHorizontalCondition()
	{
		var td = this.getEmptyHorizontalCondition();
		td.style.backgroundColor = '000000';
		this.hConditionsTable.rows[this.currentRow++].appendChild(td);
		this.currentRow = this.currentRow % 7;
	}
	
	onMouseDown(event)
	{
		event.currentTarget.style.visibility = 'hidden';
		event.currentTarget.parent.dispatchEvent(new CustomEvent('conditionHidden', {detail: event.currentTarget}));
	}
	
	addHorizontalCondition(hasArrow, middleImageType, leftImgNum, middleImgNum, rightImgNum)
	{
		var condition = this.document.createElement('table');
		condition.style.borderCollapse = 'collapsed';
		condition.parent = this;
		condition.data = {hasArrow: hasArrow, middleImageType: middleImageType,
							leftImgNum: leftImgNum, middleImgNum, rightImgNum: rightImgNum};
		condition.data.type = "horizontal";
		condition.addEventListener("mousedown", this.onMouseDown);
		
		var tr = this.document.createElement('tr');
		
		var leftImage = this.document.createElement('img');
		var prefix = leftImgNum < 10 ? "0" : "";
		var imageSrc = "images/" + prefix + leftImgNum + ".jpg";
		leftImage.src = imageSrc;
		leftImage.style.maxWidth = '100%';
		leftImage.addEventListener("contextmenu", this.onContextMenu);
		
		var rightImage = this.document.createElement('img');
		var prefix = rightImgNum < 10 ? "0" : "";
		var imageSrc = "images/" + prefix + rightImgNum + ".jpg";
		rightImage.src = imageSrc;
		rightImage.style.maxWidth = '100%';
		rightImage.addEventListener("contextmenu", this.onContextMenu);
		
		var middleImage = this.document.createElement('img');
		if (middleImageType == 2)
		{
			middleImage.src = "images/dots.jpg";
		}
		else
		{
			var prefix = middleImgNum < 10 ? "0" : "";
			var imageSrc = "images/" + prefix + middleImgNum + ".jpg";
			middleImage.src = imageSrc;
		}
		middleImage.style.maxWidth = '100%';
		middleImage.addEventListener("contextmenu", this.onContextMenu);
		
		var tdLeftImage = this.document.createElement('td');
		tdLeftImage.appendChild(leftImage);
		tr.appendChild(tdLeftImage);
		
		var td = this.document.createElement('td');
		td.appendChild(middleImage);
		if (middleImageType == 1)
		{
			var negativeImage = this.document.createElement('img');
			negativeImage.src = "images/no.png";
			td.style.position = "relative";
			negativeImage.style.position = 'absolute';
			negativeImage.style.width = '100%';
			negativeImage.style.left = 0;
			negativeImage.addEventListener("contextmenu", this.onContextMenu);
			td.appendChild(negativeImage);
		}
		tr.appendChild(td);
		
		td = this.document.createElement('td');
		td.appendChild(rightImage);
		tr.appendChild(td);
		
		condition.appendChild(tr);
		
		if (hasArrow)
		{
			var arrowImage = this.document.createElement('img');
			arrowImage.src = "images/arrow.png";
			condition.style.position = "relative";
			arrowImage.style.position = 'absolute';
			arrowImage.style.width = '100%';
			arrowImage.style.height = '25%';
			arrowImage.style.left = 0;
			arrowImage.style.top = 0;
			arrowImage.addEventListener("contextmenu", this.onContextMenu);
			condition.appendChild(arrowImage);
		}
		
		td = this.document.createElement('td');
		td.style.backgroundColor = '000000';
		td.style.backgroundImage = "url('images/h_back.jpg')";
		td.style.backgroundSize = "100% 100%";
		td.appendChild(condition);
		
		var column = Math.floor(this.hConditionsCount/7);
		if (column == 2)
		{
			this.hConditionsTable.rows[this.hConditionsCount%7].appendChild(td);
		}
		else
		{
			var firstEmptyNode = this.hConditionsTable.rows[this.hConditionsCount%7].childNodes[column];
			this.hConditionsTable.rows[this.hConditionsCount%7].insertBefore(td, firstEmptyNode);
		}

		++this.currentRow;
		this.currentRow %= 7;
		++this.hConditionsCount;
	}
}

class OtherClues extends Conditions
{
	addCondition(data)
	{
		if (data.type == "horizontal")
		{
			var lastNode = this.hConditionsTable.rows[this.hConditionsCount%7].lastChild;
			this.hConditionsTable.rows[this.hConditionsCount%7].removeChild(lastNode);

			this.addHorizontalCondition(data.hasArrow, data.middleImageType,
										data.leftImgNum, data.middleImgNum, data.rightImgNum);
		}
		else if (data.type == "vertical")
		{
			this.tr.removeChild(this.tr.lastChild);
			this.addVerticalCondition(data.isRegular, data.topImageNum, data.bottomImageNum);
		}
	}
	
	removeCondition(data)
	{
		if (data.type == "horizontal")
		{
			--this.hConditionsCount;
			var lastNode = this.hConditionsTable.rows[this.hConditionsCount%7].childNodes[Math.floor(this.hConditionsCount/7)];
			this.hConditionsTable.rows[this.hConditionsCount%7].removeChild(lastNode);
			this.hConditionsTable.rows[this.hConditionsCount%7].appendChild(this.getEmptyHorizontalCondition());
		}
		else if (data.type == "vertical")
		{
			this.tr.removeChild(this.tr.childNodes[this.vConditionsCount - 1]);
			--this.vConditionsCount;
			this.addEmptyVerticalCondition();
		}
	}
	
	onMouseDown(event)
	{
	}
}
