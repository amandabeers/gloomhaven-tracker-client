## Gloomhaven Character Tracker

### Description

This is a helper app used for tracking character stats for the game Gloomhaven. I play Gloomhaven with friends and have found the notebooks provided to be difficult to use and we always forget where we left off so I decided to make this app to help solve those problems.

### Links

- [Backend Repo](https://github.com/amandabeers/gloomhaven-tracker-backend)
- [Deployed Client](https://amandabeers.github.io/gloomhaven-tracker-client/)
- [Deployed API](https://gloomhaven-tracker-api.herokuapp.com)

### Setup Steps

1. Fork and clone this repository
2. Run `npm install` in the repo from the command line to install all dependencies
3. Run `npm start` to launch the development server

### Technologies

- JavaScript
- React
- Ruby on Rails
- HTML5
- CSS3
- Bootstrap

### Planning and Development

Prior to writing any code I started planning out my relationships and resources in the database. I decided to create a resource to contain the available classes from the game with set information that a user could then use to create their own character. This way the user wouldn't need to replicate any information themselves that is already provided in the game. Then I started documenting features that I would want to be available to me if I were using this app in the form of user stories. Finally I drew wireframes which I continued to do throughout my development process to help me build my components.

I built the backend first and tested the routes using curl scripts, then used seeds to populate the starter classes from the game into my roles resource before moving on to the front end. On the front end I started by creating index and show routes for both roles and characters then moved on to other CRUD actions. I spent a lot of time trying to decide how to provide the user with update actions for their character. I didn't want to have a single update feature that gave the user every possible field to update each time as this didn't really make sense to me in the context of the game. I settled on a system of giving the user different triggering events they could select that only gave them the possibly relevant forms to update.

### Unsolved Problems

- Add in player cards and modifier decks
- Add a resource to keep track of your party and the state of city
- Work on responsive design

### Images

  ![Wireframe Image](./public/20190829_screenshot.png)

### User Stories and Wireframes

User stories:
- As a user, I want to add a character.
- As a user, I want to be able to add and subtract gold from my character.
- As a user, I want to be able to keep track of my character's XP and know when I can level up.
- As a user, I want to be able to add notes so that I can keep track of past decisions easily set up my character the next time I play Gloomhaven.

Wireframes:

  ![Wireframe Image](./public/20190826_wireframe.jpg)
  ![Wireframe Image](./public/20190825_wireframe.jpg)
