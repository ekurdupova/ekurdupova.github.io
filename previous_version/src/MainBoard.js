class MainBoard extends EventTarget
{
	render(parent, document, game)
	{
		this.game = game;
		this.cells = [[],[],[],[],[],[]];
		
		this.table = document.createElement('table');
		this.table.width = '53%';
		this.table.style.tableLayout = 'fixed';
		
		this.table.style.backgroundColor = 'fefefe';
		
		this.tr0 = document.createElement('tr');
		for (var i = 0; i < 6; ++i)
		{
			this.addPersonCell(this.tr0, document);
		}
		this.table.appendChild(this.tr0);
		
		this.tr1 = document.createElement('tr');
		for (var i = 0; i < 6; ++i)
		{
			this.addHouseCell(this.tr1, document);
		}
		this.table.appendChild(this.tr1);
		
		this.tr2 = document.createElement('tr');
		for (var i = 0; i < 6; ++i)
		{
			this.addNumberCell(this.tr2, document);
		}
		this.table.appendChild(this.tr2);
		
		this.tr3 = document.createElement('tr');
		for (var i = 0; i < 6; ++i)
		{
			this.addFruitCell(this.tr3, document);
		}
		this.table.appendChild(this.tr3);
		
		this.tr4 = document.createElement('tr');
		for (var i = 0; i < 6; ++i)
		{
			this.addTransportCell(this.tr4, document);
		}
		this.table.appendChild(this.tr4);
		
		this.tr5 = document.createElement('tr');
		for (var i = 0; i < 6; ++i)
		{
			this.addCharCell(this.tr5, document);
		}
		this.table.appendChild(this.tr5);
		
		parent.appendChild(this.table);
	}
	
	unselectImage(event)
	{
		for (var i = 0; i < event.hiddenImages.length; ++i)
		{
			this.cells[event.row][event.hiddenImages[i]].unremoveImage(event.imageSrc);
		}
		event.cell.unselectImage();
	}
	
	selectImage(imageNum, column)
	{
		var prefix = imageNum < 10 ? "0" : "";
		var imageSrc = "images/" + prefix + imageNum + ".jpg";
		var row = Math.floor(imageNum/10);
		imageSrc = this.cells[row][column].selectImage(imageSrc);
		this.onImageSelected(row, imageSrc, this.cells[row][column]);
	}

	onImageSelected(row, imageSrc, cell)
	{
		var hiddenImages = [];
		for(var i = 0; i < 6; ++i)
		{
			if (this.cells[row][i].removeImage(imageSrc))
			{
				hiddenImages.push(i);
			}
		}
		var event = new Event('imageSelected');
		event.hiddenImages = hiddenImages;
		event.row = row;
		event.imageSrc = imageSrc;
		event.cell = cell;
		this.dispatchEvent(event);
	}
	
	onImageHidden(event)
	{
		var newEvent = new Event(event.type);
		newEvent.detail = event.detail;
		this.dispatchEvent(newEvent);
	}
	
	getSelectedImageNum(row, column)
	{
		return this.cells[row][column].selectedImage.src.substr(-6).substr(0, 2);
	}

	addPersonCell(tr, document)
	{
		var personCell = new PersonCell();
		personCell.mainBoard = this;
		this.cells[0].push(personCell);
		
		var cell = document.createElement('td');
		
		personCell.render(cell, document);
		personCell.addEventListener('imageselected', function(event){
			event.target.mainBoard.onImageSelected(0, event.detail, this);
		});
		personCell.addEventListener('imageHidden', function(event){
			event.target.mainBoard.onImageHidden(event);
		});
		
		tr.appendChild(cell);
	}
	
	addHouseCell(tr, document)
	{
		var houseCell = new HouseCell();
		houseCell.mainBoard = this;
		this.cells[1].push(houseCell);
		
		var cell = document.createElement('td');
		
		houseCell.render(cell, document);
		houseCell.addEventListener('imageselected', function(event){
			event.target.mainBoard.onImageSelected(1, event.detail, this);
		});
		houseCell.addEventListener('imageHidden', function(event){
			event.target.mainBoard.onImageHidden(event);
		});
		
		tr.appendChild(cell);
	}

	addNumberCell(tr, document)
	{
		var numberCell = new NumberCell();
		numberCell.mainBoard = this;
		this.cells[2].push(numberCell);
		
		var cell = document.createElement('td');
		
		numberCell.render(cell, document);
		numberCell.addEventListener('imageselected', function(event){
			event.target.mainBoard.onImageSelected(2, event.detail, this);
		});
		numberCell.addEventListener('imageHidden', function(event){
			event.target.mainBoard.onImageHidden(event);
		});
		
		tr.appendChild(cell);
	}

	addFruitCell(tr, document)
	{
		var fruitCell = new FruitCell();
		fruitCell.mainBoard = this;
		this.cells[3].push(fruitCell);
		
		var cell = document.createElement('td');
		
		fruitCell.render(cell, document);
		fruitCell.addEventListener('imageselected', function(event){
			event.target.mainBoard.onImageSelected(3, event.detail, this);
		});
		fruitCell.addEventListener('imageHidden', function(event){
			event.target.mainBoard.onImageHidden(event);
		});
		
		tr.appendChild(cell);
	}

	addTransportCell(tr, document)
	{
		var transportCell = new TransportCell();
		transportCell.mainBoard = this;
		this.cells[4].push(transportCell);
		
		var cell = document.createElement('td');
		
		transportCell.render(cell, document);
		transportCell.addEventListener('imageselected', function(event){
			event.target.mainBoard.onImageSelected(4, event.detail, this);
		});
		transportCell.addEventListener('imageHidden', function(event){
			event.target.mainBoard.onImageHidden(event);
		});
		
		tr.appendChild(cell);
	}

	addCharCell(tr, document)
	{
		var charCell = new CharCell();
		charCell.mainBoard = this;
		this.cells[5].push(charCell);
		
		var cell = document.createElement('td');
		
		charCell.render(cell, document);
		charCell.addEventListener('imageselected', function(event){
			event.target.mainBoard.onImageSelected(5, event.detail, this);
		});
		charCell.addEventListener('imageHidden', function(event){
			event.target.mainBoard.onImageHidden(event);
		});
		
		tr.appendChild(cell);
	}

}
