angular.module('starter.controllers', [])

    .controller('DevicesCtrl', function ($scope) {
    })

    .controller('VideosCtrl', function ($scope) {

    })

    .controller('AccountCtrl', function ($scope, $location, $cookieStore, $rootScope, Users1) {
        $scope.updated = false;
        Users1.printAllEmails();
        $scope.doLogout = function(){
            $cookieStore.remove('user');
            $location.path("/login");
            $rootScope.loggedInUser = null;
        };
        var userCookie = $cookieStore.get('user');
        if(userCookie && userCookie.email.length > 0){
            //get user object from data store
            $scope.user = Users1.get(userCookie.email);
            console.log('this is user in Accounts Controller');
            console.log($scope.user);
        }else{

        }

        $scope.doUpdate = function () {
            $scope.updated = true;
            return Users1.update($scope.user.email, $scope.user.password,
                $scope.user.firstName, $scope.user.lastName)

        };
    })
    .controller('User1Ctrl', function ($scope, $ionicModal, $location, $cookieStore, Users1, $rootScope) {

        var userCookie = $cookieStore.get('user');
        if(userCookie && userCookie.email.length > 0){
            $location.path('/tab/devices');

        }else {
            $scope.user = {
                "username": '',
                "password": '',
                "firstName": '',
                "lastName": '',
                "email": ''
            };

            $scope.registerUser = {
                "password": '',
                "firstName": '',
                "lastName": '',
                "email": ''
            };


            $scope.showInvalid = false;
            $scope.showInvalidUsername = false;
            $scope.showInvalidPassword = false;
            $scope.showUserExists = false;

            $scope.login = function () {


                // try logging in using service
                if (!$scope.user.password) {
                    $scope.showInvalidPassword = true;
                    return;
                }

                $scope.showInvalidPassword = false;

                if (!Users1.validateEmail($scope.user.username)) {
                    $scope.showInvalidUsername = true;
                    return;
                }


                if (!Users1.login($scope.user.username, $scope.user.password)) {
                    $scope.showInvalid = true;
                    return;
                }

                $scope.showInvalidUsername = false;
                $scope.showInvalid = false;


                //set the cookie
                var loggedInUser = {email: $scope.user.username, firstName: $scope.user.firstName, lastName: $scope.user.lastName};
                $cookieStore.put('user', loggedInUser);
                $rootScope.loggedInUser = loggedInUser;

                Users1.printAllEmails();

                // continue to home page
                $location.path("/tab/devices");
            };
            $scope.doRegister = function () {
                if (Users1.add($scope.registerUser.email, $scope.registerUser.password,
                    $scope.registerUser.firstName, $scope.registerUser.lastName)) {
                    $location.path("/login");
                } else {
                    $scope.showUserExists = true;
                }

            };
            $scope.$watch(function () {
                return $scope.registerUser.email;
            }, function (newvalue, oldvalue) {
                $scope.showUserExists = false;
            }, true);

        }
    });
