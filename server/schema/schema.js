const graphql = require('graphql');
const _ = require('lodash');
const Book = require("../models/book");
const Author = require("../models/author");

const {GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList
} = graphql;


////////////////////////
// Dummy Data
////////////////////////
var bookslist = [
    {name: 'Name of the Wind', genre: 'Fantasy', id:'1', authorid: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', id:'2', authorid: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id:'3', authorid: '3'}, 
    {name: 'Name of the Wind22', genre: 'Fantasy', id:'1', authorid: '1'},
    {name: 'The Final Empire22', genre: 'Fantasy', id:'2', authorid: '2'},
    {name: 'The Long Earth22', genre: 'Sci-Fi', id:'3', authorid: '3'}, 
   
]
var authorslist = [
    {name:'Patrick', age: 44, id: '1'},
    {name:'Brandon', age: 42, id: '2'},
    {name:'Terry', age:66, id:'3'},
]


////////////////////////
// Schema Objects
////////////////////////
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID },
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
               // return _.find(authorslist, {id: parent.authorid})
               return Author.findById(parent.authorid)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID },
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
               // return _.filter(bookslist, {authorid: parent.id})
               return Book.find({authorid: parent.id})

            }
        }
    })
})


////////////////////////
// Root Query
////////////////////////
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: { type: GraphQLID}},
            resolve(parent, args) {
                // get data from DB / source
               // return _.find(bookslist, {id: args.id});
               return Book.findById(args.id)
            }
        }, 
         author: {
            type: AuthorType,
            args: {id: { type: GraphQLID}},
            resolve(parent, args) {
                // get data from DB / source
               // return _.find(authorslist, {id: args.id});
               return Author.findById(args.id)

            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
               // return bookslist;
               return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
               // return authorslist;
               return Author.find({})

            }
        },
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorid: {type: GraphQLID}
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorid: args.authorid
                });
                return book.save();
            }
        }
    }
})



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
