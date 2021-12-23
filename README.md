API details to check on postman

https://nodejs-signup-api.herokuapp.com/testing -> This can be used to test if get works or not
https://nodejs-signup-api.herokuapp.com/register -> This link is used to register user using post method in postman
Enter data in body section , click on the raw radio button and from the dropdown change text to JSON(application/json)
Format to enter data:-
{	
	"firstname":"Jim",
	"lastname":"Halpert",
	"username":"Jim",
	"email":"jim@abc.com",
	"password1":"12345678",
	"password2" :"12345678"
}

https://nodejs-signup-api.herokuapp.com/login -> This link is used to login user using post method in postman
Enter data in body section , click on the raw radio button and from the dropdown change text to JSON(application/json)
Format to enter data:-
{
	"username":"Jim",
	"password":"12345678"
}

https://nodejs-signup-api.herokuapp.com/alldata -> This link can be used to check all the users who have registered themselves.

Code for the api :- https://github.com/bpratik-aiml/sign-in-api