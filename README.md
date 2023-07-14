# udacity-capstone

Udacity capstone project to display understanding of the serverless technology in tandem with AWS resources.

The app I created is a "productivity" app. It contains two main pages.

1. Task List
2. Pomodoro Timer

### Task List

The idea is there's 2 main tasks. Daily tasks and longer term tasks. All tasks must have an associated goal attached to it which forces users to thing about the long term impact of what they're working on which may increase motivation and rewards working on possibly menial tasks.

### Pomodoro Timer

The pomodoro page also requires the user to have a task selected in order to use it. This, like the goal constraint for creating tasks will force users to be clear about what they're doing and why.

To run UI:

1. Change to the productivity-ui directory
2. Install node dependencies
3. Run command npm start with node v14.21.3

Back end code is deployed so no actions need to be taken on the back end

## Back end write up:

Developed API's using serverless framework and AWS.

REST endpoints served through AWS lambda functions.

Data persisted in DynamoDB.

Authorization using Auth0.

## Front end write up:

Developed front end using React and react-router-dom

Used redux for app-wide state management.
