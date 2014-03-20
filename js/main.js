//called when app is loaded to initialize
var objects = [];

function ajax(string, file, code){        
    var response;

    $.ajax({
        url: file,
        data: string,
        async: true,
        dataType: "html",
        type: "POST",
        error: function(xhr, status, error) {           
            alert(status+" "+error+"\n"+xhr.responseText);
            
            hideLoading();
        },
        complete: function(data, status){
            eval(code);
        }
    }); 

    return response;      
}

function ajaxNoAsync(string, file, code){
    
    var response;
    $.ajax({
        url: file,
        data: string,
        async: false,
        dataType: "html",
        type: "POST",
        success: function(data) {            
            response = data;
            
            eval(code);
        },
        error: function() {            
            response = 'error';
        }      
    }); 

    return response;      
}

function getJSON(path, code){
    var string = '';
    $.ajax({
        url: path,
        data: string,
        async: false,
        dataType: "json",
        success: function(data) {
            response = data;

            eval(code);            
        },
        error: function(xhr, status, error) {
            return 'undefined';
        }
    });
    
    return string;
}

function JSONP(string, file, callback){
    $.ajax({
        url: file,
        async: false,
        dataType: "JSONP",
        data: {q: string},
        contentType: "application/json",
        type: "GET",
        crossDomain: true,
        jsonpCallback: callback,
        success: function(data) {
        },
        error: function(xhr, status, error) { 
            //var err = eval("(" + xhr.responseText + ")");
            //alert(err.Message+" "+error);
            console.log("readyState: " + xhr.readyState);
            console.log("responseText: "+ xhr.responseText);
            console.log("status: " + xhr.status);
            console.log("text status: " + status);
            console.log("error: " + error);
        },
    });     
}

function startFunction(){
    //selectLevel("1");
    level = new Level1();
    levelObject = level.grid;
    buildLevel(levelObject);
}

function selectLevel(){

    $.getJSON('settings.json', function(data){
        levelObject = data['levels'][level];

        buildLevel(levelObject);
    });

}

function buildLevel(levelObject){
    var item = $('#itemTemplate').html();

    window.column = Object.keys(levelObject['rows']['1']['columns']).length;
    window.row = Object.keys(levelObject['rows']).length;

    var counter = 1;

    var r = 1;
    $.each( levelObject['rows'], function( key, val ) {
        $('#gameBoard').append("<div id='row"+r+"' class='divRow'></div>");

        var c = 1;
        $.each( val['columns'], function( key2, val2 ) {
            $('#row'+r).append("<div id='column"+c+"' class='divCell'></div>");

            var string = item;

            string = string.replace('{ID}',counter);
            string = string.replace('{type}',val2['type']);

            $('#row'+r+' #column'+c).append(string);

            var random = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

            if(random == 1){
                $('#'+counter).css('background-color', 'rgb(216, 216, 216)');
            }else if(random == 2){
                $('#'+counter).css('background-color', 'rgb(205, 205, 255)');
            }else if(random == 3){
                $('#'+counter).css('background-color', 'rgb(240, 176, 176)');
            }else if(random == 4){
                $('#'+counter).css('background-color', 'rgb(253, 208, 125)');
            }else if(random == 5){
                $('#'+counter).css('background-color', 'rgb(250, 250, 176)');
            }            

            var code = 'new '+ val2['type'] +'("'+counter+'","'+val2['color']+'", "'+val2['position']+'")';
            window.objects['item'+counter] = eval(code);

            var activators = window.objects['item'+counter].activators;
            for(i=0; i<activators.length; i++){

                activators[i] = activators[i] + ((window.objects['item'+counter].position - 1) * 2);

                if(activators[i] > 8){
                    activators[i] = activators[i] - 8;
                }
            }

            var listeners = window.objects['item'+counter].listeners;
            for(i=0; i<listeners.length; i++){

                listeners[i] = listeners[i] + ((window.objects['item'+counter].position - 1) * 2);

                if(listeners[i] > 8){
                    listeners[i] = listeners[i] -8;
                }
            }

            counter ++;

            c ++;
        });

        r ++;
    });

}

function rotate(e){    
    var id = $(e).attr('id');
    var degrees = window.objects['item'+id].rotate + 90;

    window.objects['item'+id].rotate = degrees;

    var position = parseInt(window.objects['item'+id].position);

    $(e).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});

    if(position == 4){
        window.objects['item'+id].position = 1;
    }else{
        window.objects['item'+id].position = parseInt(position) + 1;
    }

    var activators = window.objects['item'+id].activators;
    for(i=0; i<activators.length; i++){

        activators[i] = activators[i] + 2;

        if(activators[i] > 8){
            activators[i] = activators[i] - 8;
        }
    }

    var listeners = window.objects['item'+id].listeners;
    for(i=0; i<listeners.length; i++){

        listeners[i] = listeners[i] + 2;

        if(listeners[i] > 8){
            listeners[i] = listeners[i] -8;
        }
    }

    setTimeout(function(){
        checkCollision(e, id);
    }, 400 );
}

function checkCollision(e, id){
    var row = $(e).closest('.divRow').attr('id').replace('row', '');
    var column = $(e).closest('.divCell').attr('id').replace('column', '');

    if(row == '1'){
        var top = 1;
    }else{
        var top = 0;
    }

    if(parseInt(row) == window.row){
        var bottom = 1;
    }else{
        var bottom = 0;
    }

    if(column == '1'){
        var left = 1;
    }else{
        var left = 0;
    }

    if(parseInt(column) == window.column){
        var right = 1;
    }else{
        var right = 0;
    }

    var activators = window.objects['item'+id].activators;
    var position = window.objects['item'+id].position;
    for (a = 0; a < activators.length; a++) {

        if(top != 1 && activators[a] == 1){
            var newTopID = parseInt(id) - window.column;

            var listeners = window.objects['item'+newTopID].listeners;
            
            for (l = 0; l < listeners.length; l++) {             
                if(listeners[l] == 5){
                    $('#'+newTopID).click();
                    $('#'+newTopID).css('background-color', $('#'+id).css('background-color'));
                }
            }
        }

        if(right != 1 && activators[a] == 3){
            var newRightID = parseInt(id) + 1;

            var listeners = window.objects['item'+newRightID].listeners;
            
            for (l = 0; l < listeners.length; l++) {             
                if(listeners[l] == 7){
                    $('#'+newRightID).click();
                    $('#'+newRightID).css('background-color', $('#'+id).css('background-color'));
                }
            }
        }

        if(bottom != 1  && activators[a] == 5){
            var newBottomID = parseInt(id) + window.column;
            
            var listeners = window.objects['item'+newBottomID].listeners;

            for (l = 0; l < listeners.length; l++) {             
                if(listeners[l] == 1){
                    $('#'+newBottomID).click();
                    $('#'+newBottomID).css('background-color', $('#'+id).css('background-color'));
                }
            }
        }

        if(left != 1  && activators[a] == 7){
            var newLeftID = parseInt(id) - 1;
            
            var listeners = window.objects['item'+newLeftID].listeners;
            
            for (l = 0; l < listeners.length; l++) {             
                if(listeners[l] == 3){
                    $('#'+newLeftID).click();
                    $('#'+newLeftID).css('background-color', $('#'+id).css('background-color'));
                }
            }
        }
    };
}