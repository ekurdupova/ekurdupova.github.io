class Game
{
	constructor()
	{
		var gameGenerator = new GameGenerator();
		this.puzzleNumber = Math.random()*10000;
		this.gameData = gameGenerator.generateGame(this.puzzleNumber);
		this.VERTICAL_CONDITIONS_COUNT = 18;
		this.HORIZONTAL_CONDITIONS_COUNT = 21;
	}
	
	render(parent, document)
	{
		this.parent = parent;
		this.actions = [];
		this.selectedImagesCount = 0;
	
		document.body.style.backgroundColor = '01aaff';
		
		var mainDiv = document.createElement('div');
		mainDiv.style.position = 'absolute';
		mainDiv.style.left = 0;
		mainDiv.style.top = 0;

		this.mainBoard = new MainBoard();
		this.mainBoard.render(mainDiv, document, this);

		var buttonsDiv = document.createElement('div');
		buttonsDiv.style.maxWidth = '50%';
		buttonsDiv.style.padding = '5px 0px';

		
		var fullScreenButton = document.createElement('button');
		fullScreenButton.innerHTML = "Full Screen";
		fullScreenButton.addEventListener("click", this.onFullScreenClick);
		buttonsDiv.appendChild(fullScreenButton);
		
		var undoButton = document.createElement('button');
		undoButton.innerHTML = "Undo";
		undoButton.game = this;
		undoButton.addEventListener("click", this.onUndoClick);
		buttonsDiv.appendChild(undoButton);
		
		var otherCluesButton = document.createElement('button');
		otherCluesButton.innerHTML = "Other clues";
		otherCluesButton.game = this;
		otherCluesButton.addEventListener("click", this.onOtherCluesClick);
		buttonsDiv.appendChild(otherCluesButton);

		this.timerDiv = document.createElement('button');
		this.timerDiv.style.cssFloat = 'right';
		this.timerDiv.id = 'timerDiv';
		this.timerDiv.innerHTML = "TIME: 00:00:00";
		buttonsDiv.appendChild(this.timerDiv);

		this.timerDiv.startTime = new Date();
		this.timer = setInterval(this.timerHandler, 1000);

		mainDiv.appendChild(buttonsDiv);
		parent.appendChild(mainDiv);
		
		this.conditionsDiv = document.createElement('div');
		this.conditions = new Conditions();
		this.conditions.render(this.conditionsDiv, document, this);
		this.conditions.addEventListener('conditionHidden', this.onConditionHidden);
		parent.appendChild(this.conditionsDiv);
		
		this.otherCluesDiv = document.createElement('div');
		this.otherClues = new OtherClues();
		this.otherClues.render(this.otherCluesDiv, document, this);
		this.otherCluesDiv.style.visibility = 'hidden';
		parent.appendChild(this.otherCluesDiv);
		
		var imagesOpenedOnStart = this.gameData.getItemsOpenedOnStart();
		this.selectedImagesCount = imagesOpenedOnStart.length;
		var gameSolution = this.gameData.getSolution();
	
		for (var i = 0; i < imagesOpenedOnStart.length; ++i)
		{
			var row = imagesOpenedOnStart[i][0];
			var column = imagesOpenedOnStart[i][1];
			
			this.mainBoard.selectImage(gameSolution[row][column], column);
		}
		this.mainBoard.addEventListener('imageSelected', this.onImageSelected);
		this.mainBoard.addEventListener('imageHidden', this.addAction);
		
		this.addVerticalConditions();
		this.addHorizontalConditions();
	}
	
	onFullScreenClick()
	{
		/* Get the documentElement (<html>) to display the page in fullscreen */
		var elem = document.documentElement;

		/* View in fullscreen */
		if (elem.requestFullscreen)
		{
			elem.requestFullscreen();
		}
		else if (elem.mozRequestFullScreen)
		{
			/* Firefox */
			elem.mozRequestFullScreen();
		}
		else if (elem.webkitRequestFullscreen)
		{
			/* Chrome, Safari and Opera */
			elem.webkitRequestFullscreen();
		}
		else if (elem.msRequestFullscreen)
		{
			/* IE/Edge */
			elem.msRequestFullscreen();
		}
	}
	
	onImageSelected(event)
	{
		this.game.actions.push(event);
		++this.game.selectedImagesCount;
		this.game.checkSolution();
	}
	
	onConditionHidden(event)
	{
		this.game.actions.push(event);
		this.game.otherClues.addCondition(event.detail.data);
	}
	
	onUndoClick()
	{
		if (this.game.actions.length > 0)
		{
			var action = this.game.actions.pop();
			switch (action.type)
			{
				case 'imageSelected':
				this.game.mainBoard.unselectImage(action);
				--this.game.selectedImagesCount;
				break;
				
				case 'imageHidden':
				action.detail.style.visibility = 'visible';
				break;
				
				case 'conditionHidden':
				this.game.otherClues.removeCondition(action.detail.data);
				action.detail.style.visibility = 'inherit';
				break;
			}
		}
	}
	
	addAction(event)
	{
		this.game.actions.push(event);
	}
	
	onOtherCluesClick()
	{
		if (this.game.otherCluesDiv.style.visibility == 'hidden')
		{
			this.game.conditionsDiv.style.visibility = 'hidden';
			this.game.otherCluesDiv.style.visibility = 'visible';
		}
		else
		{
			this.game.conditionsDiv.style.visibility = 'visible';
			this.game.otherCluesDiv.style.visibility = 'hidden';
		}
	}
	
	addVerticalConditions()
	{
		var verticalConditions = this.gameData.getVerticalConditions();
		
		for (var i = 0; i < verticalConditions.length; ++i)
		{
			var vItem = verticalConditions[i];
			this.conditions.addVerticalCondition(vItem[0] == 0, vItem[1], vItem[2]);
			this.otherClues.addEmptyVerticalCondition();
		}
		
		for (var j = verticalConditions.length; j < this.VERTICAL_CONDITIONS_COUNT; ++j)
		{
			this.conditions.addEmptyVerticalCondition();
			this.otherClues.addEmptyVerticalCondition();
		}
	}
	
	addHorizontalConditions()
	{
		var horizontalConditions = this.gameData.getHorizontalCondition();
		
		for (var i = 0; i < horizontalConditions.length; ++i)
		{
			var hItem = horizontalConditions[i];
			this.conditions.addHorizontalCondition(hItem[0] == 1, hItem[1], hItem[2], hItem[3], hItem[4], i);
			this.otherClues.addEmptyHorizontalCondition();
		}
		
		for (var j = horizontalConditions.length; j < this.HORIZONTAL_CONDITIONS_COUNT; ++j)
		{
			this.conditions.addEmptyHorizontalCondition();
			this.otherClues.addEmptyHorizontalCondition();
		}
	}
	
	checkSolution()
	{
		if (this.selectedImagesCount < 36)
			return;
		
		var result = true;
		
		for (var i = 0; i < 6; ++i)
		{
			for (var j = 0; j < 6; ++j)
			{
				if (this.gameData.getSolution()[i][j] != this.mainBoard.getSelectedImageNum(i, j))
				{
					result = false;
					break;
				}
			}
		}
		
		if (result)
		{
			clearInterval(this.timer);
			alert("Elementary, Watson!");
		}
		else
		{
			alert("Not reall. Try again.");
		}
	}

	timerHandler()
	{
		var now = new Date();
		var timerDiv = document.getElementById('timerDiv');
		var difference = (now - timerDiv.startTime)/1000;
		var hours = Math.floor(difference/3600);
		var minutes = Math.floor(difference/60);
		var seconds = Math.floor(difference%60);

		if (hours < 10)
		{
			hours = "0" + hours;
		}
		if (minutes < 10)
		{
			minutes = "0" + minutes;
		}
		if (seconds < 10)
		{
			seconds = "0" + seconds;
		}

		this.timerDiv.innerHTML = "TIME: " + hours + ":" + minutes + ":" +seconds;
	}
}
