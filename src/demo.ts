import $ from './jquery';

$('button.continue').html('Next Step...');

const hiddenBox = $('#banner-message');
$('#button-container button').on('click', () => {
	hiddenBox.show();
});

$.ajax({
	url: '/api/getWeather',
	method: 'POST',
	data: {
		zipcode: 97201,
	},
	success: function(result) {
		$('#weather-temp').html('<strong>' + result + '</strong> degrees');
	},
});

$.ajax({
	url: '/api/getWeather',
	data: {
		zipcode: 97201,
	},
	success: function(result) {
		$('#weather-temp').html('<strong>' + result + '</strong> degrees');
	},
});
