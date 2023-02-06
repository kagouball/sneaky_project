# sneaky_project

## __Introduction__

Don't you think **SNAKE** games are incredible? In the "*snake games series*", this is a multiplayer snake game using web technologies.

- Language : [**JavaScript**](https://www.javascript.com/)
- Framework : [**React js**](https://fr.reactjs.org/)
- Librairies :
    - *Client<->Server* : [socket.io](https://socket.io/)
    - *Runtime* : [Node.js](https://nodejs.org/en/)

## Prerequistes

Before cloning the project, you need to install a few modules : 
- [**Git**](https://git-scm.com/downloads)
- [**Node.js**](https://nodejs.org/en/)

## First Installation  

First of all, **clone the repository** on your computer either with
- ssh  
```
git clone git@github.com:kagouball/sneaky_project.git
```
- https
```
git clone https://github.com/kagouball/sneaky_project.git
```
Once you clone the project, check you have all your node modules up-to-date by going both on `.\server` and `.\client` folder and install all modules needed  

```npm
cd .\server\
npm install

cd ..\client\
npm install
```

In `.\client` folder, build the react application with 
```
npm run build
``` 

Everything is set-upto run this beautiful app!

## Work Flow

### Server-Side
In `.\server`, lauch the `server.js` with 
```
node server
```

### Client-Side
To launch the React application, run it in `.\client` with 
```
npm start
```

## Sources

Global logic inspiration with **socket.io** and **javascript** : https://github.com/HungryTurtleCode/multiplayerSnake
