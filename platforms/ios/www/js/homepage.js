function proceedToFirstLesson(){
	alert('first lesson');
}

$(document).ready(function(){
	$('#click-to-start').on('click', proceedToFirstLesson)
})