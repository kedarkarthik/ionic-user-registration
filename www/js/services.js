angular.module('starter.services', [])    
.factory('Friends', function() {

  return {
  }
})
.factory('Users1', function() {

  console.log('users service called on page load!!');
      var users =
          [];
        return {
            login : function(username, password){
                var success = false;

                angular.forEach(users,function(user,index){
                  if(success == false && user.email == username && user.password == password){
                        success = true;
                    }
                });
                
                return success;
                $http.post('http://localhost/videos/CamUser/login',
                    {
                        Username : username,
                        Password: password
                    }).
                    success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        return data;
                    }).
                    error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        return false;
                    });

                return false;
            },
            validateEmail : function(email){
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            update: function(email, password, firstName, lastName){
                var userService = this;
                users = userService.removeFromArray(users, 'email', email );
                users.push({
                    "email": email,
                    "password": password,
                    "firstName": firstName,
                    "lastName": lastName
                });
            },
            add: function(email, password, firstName, lastName){

                var found = false;
                angular.forEach(users,function(user,index){
                    if(found == false && user.email == email){
                        found = true;
                    }
                });

                if(found){
                    return false;
                }

                users.push({
                    "email": email,
                    "password": password,
                    "firstName": firstName,
                    "lastName": lastName
                });
                return true;
            },
            get: function(email){
                var found = false;
                var result = '';
                angular.forEach(users,function(user,index){
                    if(found == false && user.email == email){
                        found = true;
                        result = user;
                    }
                });

                if(found){
                    return result;
                }

                return '';
            },
            printAllEmails: function(){
                angular.forEach(users,function(user,index){
                    console.log(user.email  )
                });
            },
            removeFromArray: function (array, property, value) {
                angular.forEach(array, function(result, index) {
                    if(result[property] == value) {
                        //Remove from array
                        array.splice(index, 1);
                    }
                });

                return array;
            }

        };
    })
;
