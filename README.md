## How to us

* Download or clone the repo

```shell
git clone https://github.com/msalahz/resturant-de-pizza
```

* Install project dependencies

```shell
cd resturant-de-pizza
npm install -f 
```

> The `-f` flag is forcing the installation to avoid a temporary conflict of CRA dependency for craco library

* Run the project

```shell
npm start
```

* Open [http://localhost:3000](http://localhost:3000).
* The application can be tested online on the following link [http://pizzeria.com.s3-website.eu-central-1.amazonaws.com](http://pizzeria.com.s3-website.eu-central-1.amazonaws.com)

## Prerequisites

* [Git](https://git-scm.com/)
* React, Typescript
* Some storage of choice LocalStorage, [IndexDB](https://developers.google.com/web/ilt/pwa/lab-indexeddb), [SQLLite](https://www.sqlite.org/index.html), [Firebase](https://firebase.google.com/), [MongoDB](https://www.mongodb.com/), [MySQL](https://www.mysql.com/), [PostgresSQL](https://www.postgresql.org/) or any other suiting storage you find.

## Project description

The application serves the purpose of ordering pizza online.

The following should be possible:

* I can order a pizza of type X and price (e.g. Margherita $5, Pepperoni $6, ...)
* I have an order of items
* This item in an order has pizza type and the number of pizzaes of that type

The "Create Order" function should allow the user to select pizza types and amounts, add to the order, see current total, and place (save) the order.

Additionally, the following functions should be considered:

* List the different orders
* Details of an individual order.
* I can test the code somewhere easily accessible

---

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
