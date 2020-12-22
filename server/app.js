const express = require('express');

const  graphqlserver  = require('express-graphql');

const cors = require('cors');

const schema = require('./schema/schema');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://graphql:MyPassword@cluster0.4n9ap.mongodb.net/test?retryWrites=true&w=majority')
mongoose.connection.once('open', ()=>{
	console.log("db connected");
})

const app = express();
app.use(cors());

app.use('/graphql', graphqlserver.graphqlHTTP({
	schema,
	graphiql:true
}));

app.listen(4000, () => {
	console.log("Listening to 4000 port");
})
