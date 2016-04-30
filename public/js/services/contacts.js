angular.module('contactService', [])
	.factory('Contact', ['$http',function($http) {
		return {
			get : function(apikey) {
				return $http.get('/api/' + apikey + '/contacts/');
			},
			create : function(apikey, contactData) {
				return $http.post('/api/' + apikey + '/contacts/', contactData);
			}
		};
	}]);
