class Cell extends EventTarget
{
	constructor()
	{
		super();
	}
	
	render(parent, document)
	{
		this.parent = parent;
		this.images = [];
		
		this.table = document.createElement('div');
		this.table.addEventListener("contextmenu", this.onContextMenu);
		
		this.parent.style.backgroundColor = '000000';
		this.table.style.backgroundColor = '000000';
		
		this.tr1 = document.createElement('div');
		
		this.selectedImage = document.createElement('img');
		
		this.image0 = document.createElement('img');
		this.image0.src = this.getImage0Src();
		this.styleImage(this.image0);

		this.image1 = document.createElement('img');
		this.image1.src = this.getImage1Src();
		this.styleImage(this.image1);

		this.image2 = document.createElement('img');
		this.image2.src = this.getImage2Src();
		this.styleImage(this.image2);
		
		this.tr1.appendChild(this.image0);
		this.tr1.appendChild(this.image1);
		this.tr1.appendChild(this.image2);

		this.table.appendChild(this.tr1);
		
		this.tr2 = document.createElement('div');
		
		this.image3 = document.createElement('img');
		this.image3.src = this.getImage3Src();
		this.styleImage(this.image3);

		this.image4 = document.createElement('img');
		this.image4.src = this.getImage4Src();
		this.styleImage(this.image4);

		this.image5 = document.createElement('img');
		this.image5.src = this.getImage5Src();
		this.styleImage(this.image5);
		
		this.tr2.appendChild(this.image3);
		this.tr2.appendChild(this.image4);
		this.tr2.appendChild(this.image5);

		this.table.appendChild(this.tr2);

		parent.appendChild(this.table);
	}
	
	selectImage(imageSrc)
	{
		this.parent.removeChild(this.table);
		this.selectedImage.src = imageSrc;
		this.selectedImage.style.width = '65%';
		this.parent.appendChild(this.selectedImage);
		return this.selectedImage.src;
	}
	
	unselectImage()
	{
		this.parent.removeChild(this.selectedImage);
		this.parent.appendChild(this.table);
	}
	
	removeImage(imageSrc)
	{
		var result = false;
		for (var i = 0; i < 6; ++i)
		{
			if (this.images[i].src == imageSrc)
			{
				if (this.images[i].style.visibility != 'hidden')
				{
					result = true;
				}
				this.images[i].style.visibility = 'hidden';
			}
		}
		return result;
	}
	
	unremoveImage(imageSrc)
	{
		for (var i = 0; i < 6; ++i)
		{
			if (this.images[i].src == imageSrc)
			{
				this.images[i].style.visibility = 'visible';
			}
		}
	}
	
	styleImage(image)
	{
		image.style.width = '33%';
		image.parentCell = this;
		this.images.push(image);
		image.addEventListener("contextmenu", this.onContextMenu);
		image.addEventListener("mousedown", function(event){
			if(event.which == 1)
			{
				event.target.parentCell.selectImage(event.target.src);
				event.target.parentCell.dispatchEvent(new CustomEvent('imageselected', {detail: event.target.src}));
			}
			if(event.which == 3)
			{
				event.target.style.visibility = 'hidden';
				event.target.parentCell.dispatchEvent(new CustomEvent('imageHidden', {detail: event.target}));
			}
		});
	}
	
	onContextMenu(event)
	{
		event.preventDefault();
	}
}

class PersonCell extends Cell
{
	constructor()
	{
		super();
	}
	
	getImage0Src()
	{
		return "images/00.jpg";
	}

	getImage1Src()
	{
		return "images/01.jpg";
	}

	getImage2Src()
	{
		return "images/02.jpg";
	}

	getImage3Src()
	{
		return "images/03.jpg";
	}

	getImage4Src()
	{
		return "images/04.jpg";
	}

	getImage5Src()
	{
		return "images/05.jpg";
	}
}

class HouseCell extends Cell
{
	constructor()
	{
		super();
	}
	
	getImage0Src()
	{
		return "images/10.jpg";
	}

	getImage1Src()
	{
		return "images/11.jpg";
	}

	getImage2Src()
	{
		return "images/12.jpg";
	}

	getImage3Src()
	{
		return "images/13.jpg";
	}

	getImage4Src()
	{
		return "images/14.jpg";
	}

	getImage5Src()
	{
		return "images/15.jpg";
	}
}

class NumberCell extends Cell
{
	constructor()
	{
		super();
	}
	
	getImage0Src()
	{
		return "images/20.jpg";
	}

	getImage1Src()
	{
		return "images/21.jpg";
	}

	getImage2Src()
	{
		return "images/22.jpg";
	}

	getImage3Src()
	{
		return "images/23.jpg";
	}

	getImage4Src()
	{
		return "images/24.jpg";
	}

	getImage5Src()
	{
		return "images/25.jpg";
	}
}

class FruitCell extends Cell
{
	constructor()
	{
		super();
	}
	
	getImage0Src()
	{
		return "images/30.jpg";
	}

	getImage1Src()
	{
		return "images/31.jpg";
	}

	getImage2Src()
	{
		return "images/32.jpg";
	}

	getImage3Src()
	{
		return "images/33.jpg";
	}

	getImage4Src()
	{
		return "images/34.jpg";
	}

	getImage5Src()
	{
		return "images/35.jpg";
	}
}

class TransportCell extends Cell
{
	constructor()
	{
		super();
	}
	
	getImage0Src()
	{
		return "images/40.jpg";
	}

	getImage1Src()
	{
		return "images/41.jpg";
	}

	getImage2Src()
	{
		return "images/42.jpg";
	}

	getImage3Src()
	{
		return "images/43.jpg";
	}

	getImage4Src()
	{
		return "images/44.jpg";
	}

	getImage5Src()
	{
		return "images/45.jpg";
	}
}

class CharCell extends Cell
{
	constructor()
	{
		super();
	}
	
	getImage0Src()
	{
		return "images/50.jpg";
	}

	getImage1Src()
	{
		return "images/51.jpg";
	}

	getImage2Src()
	{
		return "images/52.jpg";
	}

	getImage3Src()
	{
		return "images/53.jpg";
	}

	getImage4Src()
	{
		return "images/54.jpg";
	}

	getImage5Src()
	{
		return "images/55.jpg";
	}
}
