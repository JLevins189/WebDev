$(document).ready(function() 
{
    checkLogin();

    //searches when enter is pressed in the textfield    
    $('#searchIn').keypress(function (e) {
        if(e.which == 13)
        {
            $('#search').click();
            return false; 
        }
    });  
    $('#search').click(function() { 
		let searchInput = $('#searchIn').val();
		let movieArray = [];
		movieArray.push('savingprivateryan');
		movieArray.push('thegodfather');
		movieArray.push('pawpatrol');
		movieArray.push('thelionking');
		movieArray.push('notimetodie');
		movieArray.push('deadlycuts');
		console.log('hello');
		console.log(searchInput);
		let searchInputCleaned = searchInput.replace(/[^A-Z0-9]/ig, '').toLowerCase();
		console.log(searchInputCleaned);

		if(jQuery.inArray(searchInputCleaned, movieArray) !== -1) {
			console.log("is in array");
			window.open("http://localhost:3000/" + searchInputCleaned, '_self');
		} else {
            window.open("http://localhost:3000/no-results",'_self');
		}

	});
});    









