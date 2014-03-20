function Type1(id, color, position){
	this.type = 'type1';

	if(position == 'random'){
		var random = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
		var rotate = ((random - 1) * 90);
		position = random;

	}else{
		var rotate = (parseInt(position) * 90);
	}
	
	$('#'+id).css({'-webkit-transform' : 'rotate('+ rotate +'deg)',
                 '-moz-transform' : 'rotate('+ rotate +'deg)',
                 '-ms-transform' : 'rotate('+ rotate +'deg)',
                 'transform' : 'rotate('+ rotate +'deg)'});

	this.rotate = rotate;
	this.position = parseInt(position);

	this.listeners = [1];
	this.activators = [1];
}

function Type2(id, color, position){
	this.type = 'type2';

	if(position == 'random'){
		var random = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
		var rotate = ((random - 1) * 90);
		position = random;

	}else{
		var rotate = (parseInt(position) * 90);
	}
	
	$('#'+id).css({'-webkit-transform' : 'rotate('+ rotate +'deg)',
                 '-moz-transform' : 'rotate('+ rotate +'deg)',
                 '-ms-transform' : 'rotate('+ rotate +'deg)',
                 'transform' : 'rotate('+ rotate +'deg)'});

	this.rotate = rotate;
	this.position = parseInt(position);

	this.listeners = [1,3];
	this.activators = [1,3];
}

function Type3(id, color, position){
	this.type = 'type3';

	if(position == 'random'){
		var random = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
		var rotate = ((random - 1) * 90);
		position = random;

	}else{
		var rotate = (parseInt(position) * 90);
	}
	
	$('#'+id).css({'-webkit-transform' : 'rotate('+ rotate +'deg)',
                 '-moz-transform' : 'rotate('+ rotate +'deg)',
                 '-ms-transform' : 'rotate('+ rotate +'deg)',
                 'transform' : 'rotate('+ rotate +'deg)'});

	this.rotate = rotate;
	this.position = parseInt(position);

	this.listeners = [1,5];
	this.activators = [1,5];
}

function Type4(id, color, position){
	this.type = 'type4';

	if(position == 'random'){
		var random = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
		var rotate = ((random - 1) * 90);
		position = random;

	}else{
		var rotate = (parseInt(position) * 90);
	}
	
	$('#'+id).css({'-webkit-transform' : 'rotate('+ rotate +'deg)',
                 '-moz-transform' : 'rotate('+ rotate +'deg)',
                 '-ms-transform' : 'rotate('+ rotate +'deg)',
                 'transform' : 'rotate('+ rotate +'deg)'});

	this.rotate = rotate;
	this.position = parseInt(position);

	this.listeners = [1,3,5];
	this.activators = [1,3,5];
}

function Type5(id, color, position){
	this.type = 'type5';

	if(position == 'random'){
		var random = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
		var rotate = ((random - 1) * 90);
		position = random;

	}else{
		var rotate = (parseInt(position) * 90);
	}
	
	$('#'+id).css({'-webkit-transform' : 'rotate('+ rotate +'deg)',
                 '-moz-transform' : 'rotate('+ rotate +'deg)',
                 '-ms-transform' : 'rotate('+ rotate +'deg)',
                 'transform' : 'rotate('+ rotate +'deg)'});

	this.rotate = rotate;
	this.position = parseInt(position);

	this.listeners = [1,3,5,7];
	this.activators = [1,3,5,7];
}

function Box(id, color, position){
	this.type = 'box';

	if(position == 'random'){
		var random = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
		var rotate = ((random - 1) * 90);
		position = random;

	}else{
		var rotate = (parseInt(position) * 90);
	}
	
	$('#'+id).css({'-webkit-transform' : 'rotate('+ rotate +'deg)',
                 '-moz-transform' : 'rotate('+ rotate +'deg)',
                 '-ms-transform' : 'rotate('+ rotate +'deg)',
                 'transform' : 'rotate('+ rotate +'deg)'});

	this.rotate = rotate;
	this.position = parseInt(position);

	this.listeners = [0];
	this.activators = [0];
}