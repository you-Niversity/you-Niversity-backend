# yoUniversity

Teaching and learning is a community endeavor, and we all have something to teach and learn. yoUniversity is an application that connects those who have some skill or expertise to share with those who are willing to pay for it. Users can create classes for others to take--and make a buck or two in the process--or they can simply sign up for others' classes and enjoy learning.

![screenshot](landing_img.png)

Node.js, ExpressJS, ReactJS and PostgreSQL were used to build yoUniversity. Check out the client-side code here: [yoUniversity Frontend] (https://github.com/you-Niversity/you-Niversity-frontend)

Feel free to install the yoUniversity API. Following are installation instructions:

1. Fork and clone the repository.
2. Run the following commands:

```
npm init
npm install
```

Following are the API endpoints with descriptions:

##Signup and Login

```
POST auth/signup
```
Validates password, checks if user already exists in database, encrypts password, and returns JWT token and user name, email and id.


```
POST auth/login
```
Checks if user exists in database and if email and password match, and returns JWT token and user name, email and id.

##Classes

```
GET '/classes'
```
Returns all classes in database in ascending order.


```
GET '/classes/:id'
```
Returns all information for a specific class including instructor information (joined with users resource).


```
POST '/classes'
```
Creates a new class, and returns the class id.


```
PUT '/classes/:id'
```
Updates information about a specific class.


```
PUT '/classes/:id/signup'
```
Updates the number of seats remaining in a specific class upon user signup for the class.


```
GET '/classes/:id/comments'
```
Returns all comments posted for a specific class.


```
POST '/classes/:id/comments'
```
Creates a new comment for a specific class.


```
DELETE '/classes/:id'
```
Deletes a specific class.
