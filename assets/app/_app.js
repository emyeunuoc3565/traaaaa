var myApp;
(function () {
	myApp = angular.module('myApp',['ui.bootstrap','trumbowyg-ng','ngSanitize']);
	myApp.filter('datetime', function() {
		return function(input) {
			x = new Date(input)
			dd= x.getDate();
			MM = x.getMonth() + 1;
			yyyy = x.getFullYear();
			HH = x.getHours();
			mm = x.getMinutes();
			return dd + ', tháng ' + MM + ', ' + yyyy + ' lúc ' + HH + ':' + mm;
		};
	});
	myApp.filter('startFrom', function() {
	    return function(input, start) {
	        start = +start; //parse to int
	        return input.slice(start);
	    }
	});
})();