# social_network_API
A command line social network api

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [Questions](#questions)
- [Sources](#sources)

## Description
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

## Acceptance Criteria
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

## Installation
1. Clone repo
2. Command `npm i`
5. Command `npm start`

## Usage
Users can use this app to connect to a front end so that you are able to add a user to a database created in Mongodb. From there, you can update and delete the user. There are also routes so that you can search to find one single user.

You can also add friends and thoughts to the user. And reactions to those thoughts. You will be able to add/update/delete all of these.

The following videos shows the functionality of the program:
[Link to Video](ADD VIDEOs)

## Tests
For testing, make sure to seed users/thoughts/friends/reactions to the database using the example data given in the controllers.

## Questions?

Contact Info:

Github profile: emmareimer

Email: emma@beinproximity.com

## Sources, Libraries, and Languages
Nodejs, Javascript, Mongodb, Mongoose