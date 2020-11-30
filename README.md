This is a project from ![YouTube](https://www.youtube.com/watch?v=ed8SzALpx1Q) by freeCodeCamp.org. In this project I learned how to use Apollo & GraphQL through creating a book viewer application.

**In the meantime creating this application I learned the following:**

- How to set up GraphQL.
- Queries.
- Nested queries.
- Mutations.
- That GraphQL can work with Primary Keys and Secondary Keys (Similar way to SQL, but primarykeys are IDs and secondary keys are just common IDs between objects they are not declared as keys...).
- Chaining queries (triggering a query immediately after running a query/mutation).
- Passing args into external query.js from React component.
- Including Apollo in React app.
- Using Apollo Provider to expose GraphQL endpoint to the Client via ApolloClient.
- Binding queries to React components.
- Binding multiple queries to a React component.
- Passing args in binded queries.

Sooo much! Can't believe how powerful these web technologies are together!

**To start the app:**

1. Clone the repository.
2. Run: npm install in ./Client folder and in ./Server folder
3. Add your DataBase Access in server/app.js to mongoose.connection. / create a .env file containing your database connection.
4. Starting dev server: In server folder run npm run dev

This should start nodemon and client hotreload in the same terminal.
Client signed by green color.
Server signed by red color.

For me to remember:
To deploy somewhere(eg. Heroku):

- Add in ./server/app.js: "app.use(express.static("../client/build")"
- Heroku does not require heroku-postbuild script anymore.
- Heroku preferably using empty port: const port = process.env.PORT || 8080;
