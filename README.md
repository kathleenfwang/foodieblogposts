# The Foodie Blog :spaghetti: :curry: :doughnut:
RESTful Food Blog app following CRUD functionality. Allows a user to create, read, update, and delete their posts. 

## Live Demo [here](http://thefoodieblog.herokuapp.com/)! 

See the app in action 

## Features

* Authentication:
  
  * User login with username and password

* Authorization:

  * Cannot add new posts without being authenticated

  * Cannot edit or delete posts created by other users

* Manage food posts with CRUD functionalities:

  * Create, edit and delete posts

  * Upload food image url photos

* Responsive web design

### Clone or download this repository
> To protect confidentiality, this app contains usernames and passwords that have been stored in a secret module which have not been included in the source control. The app cannot be run with its features on your local machine unless you connect your own mongodb server; however, feel free to clone the repository if needed.  

```sh
git clone https://github.com/kathleenfwang/foodieblogposts.git
```
 
### Install dependencies

```sh
npm install
```

or

```sh
yarn install
```
 ## :sparkles: Future Additions :sparkles:

* Edit user sign-up page to include email verification or social media authorization 
* Include user profiles to include About sections, Food preferences, Locations, Posts, and Food recommendations
* Embed Instagram images using [Instagram's API](https://www.instagram.com/developer/embedding/) to include the Instagram account of poster 

## Built with

### Front-end

* [ejs](http://ejs.co/)
* [Semantic UI](https://semantic-ui.com)
* [Bootstrap](https://getbootstrap.com/)

### Back-end

* [express](https://expressjs.com/)
* [mongoDB](https://www.mongodb.com/)
* [mongoose](http://mongoosejs.com/)
* [passport](http://www.passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
* [express-session](https://github.com/expressjs/session#express-session)
* [method-override](https://github.com/expressjs/method-override#method-override)

### Platforms

* [Heroku](https://www.heroku.com/)
* [Cloud9](https://aws.amazon.com/cloud9/?origin=c9io)


 
