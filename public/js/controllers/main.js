angular.module('contactController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http', 'Contact', '$mdDialog', '$mdToast', function($scope, $http, Contact, $mdDialog, $mdToast) {
		$scope.validKey = false;
		$scope.api = {};

		// GET =====================================================================
		// Get all contacts when a valid API key is provided.
		$scope.getContactList = function() {
			$scope.loading = true;
			Contact.get($scope.api.key)
				.then(function(data) {
					$scope.loading = false;
					$scope.contacts = JSON.parse(data.data);
					$scope.validKey = true;
				})
				.catch(function(response) {
	        if (response.status === 401) {
						$scope.loading = false;
	          $mdToast.show(
							$mdToast.simple()
											.content('Invalid API key!')
											.position('bottom right')
											.hideDelay(3000)
						);
						$scope.validKey = false;
	        }
	      });
		};

		// CREATE ==================================================================
		// when submitting the contact form, send the text to the node API
		$scope.createContact = function() {
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			console.log($scope.contact.text);
			$scope.loading = true;

			console.log($scope.contact);
			Contact.create($scope.api.key, $scope.contact)
				.then(function(data) {
					console.log(data);
					$scope.loading = false;
					$scope.validKey = true;
					$mdToast.show(
						$mdToast.simple()
										.content('Contact created!')
										.position('bottom right')
										.hideDelay(3000)
					);

					$scope.getContactList();
					$scope.resetContact();
				})
				.catch(function(response) {
					$scope.loading = false;
					if (response.status === 401) {
						$mdToast.show(
							$mdToast.simple()
											.content('Invalid API key!')
											.position('bottom right')
											.hideDelay(3000)
						);
						$scope.validKey = false;
					}
				});
		};

		$scope.resetContact = function() {
			$scope.contact = {};
			$scope.contact.CONTACTINFOS = [
				{
					"TYPE": "EMAIL",
					"DETAIL": ""
				},
				{
					"TYPE": "PHONE",
					"DETAIL": ""
				}
			];
		};

		$scope.resetContact();
	}]);
