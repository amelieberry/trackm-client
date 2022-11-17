# Track'M - Track'em movies
The client-side of a movie tracking app allowing users to create an account, access information about different movies and save them to their list of favorites. Users can also update their personal information, and delete their account.
The API for this application can be found on the [movie-api](https://github.com/amelieberry/movie-api) repo.

## Views and Features
#### Main View
* Returns a card list of all movies, each card contains the title, genre, release year, poster of the movie it features.
* Cards also contain a button to add a movie to the list of favorites and one to open the single movie view.
#### Single Movie View
* Returns information (description, genre, director, image) about a single movie to the user
#### Registration View
* Returns a registration form, allowing users to create an account with a username, password, email and birthday
#### Login View
* Returns a login form to allow existing users to log into the app
#### Genre View
* Returns a description of the selected genre as well as a list of matching movies
#### Director View
* Returns information about the selected director(bio, birth year, death year) as well as a list of matching movies
#### Profile View
* Returns the user's profile showing the user's information and allowing the users to take update and delete their account
* The favorite movies are displayed on card with the poster and title of the movie as well as a button to unfavorite the movie
* The user update form allows users to apdate their username, password and email.

## Links
* Live App: 

## Built with
* React
* Redux
* Bootstrap
