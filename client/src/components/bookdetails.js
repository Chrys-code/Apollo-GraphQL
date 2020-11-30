import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getBookDetailsQuery} from "../queries/queries";



export class BookDetails extends Component {


    displayBookDetails() {
        const {book} = this.props.data;
        if(book){
            return (<div>
                <h3>{book.name}</h3>
                <p>{book.genre}</p>
                <p>{book.author.name}</p>
                <p>More books by the author:</p>
                <ul className="other_books">
                    {book.author.books.map(item => {
                        if (item.id === book.id) {
                            return null
                        } else {
                            return <li key={item.id}>{item.name}</li>
                        }
                    })}
                </ul>
            </div>)
        } else {
            return <div> Chose a book title... </div>
        }
    }


    render() {
        console.log(this.props)
        return (
            <div id="book_details">
                <h1>Book Details:</h1>
                {this.displayBookDetails()}
            </div>
        )
    }
}

export default graphql(getBookDetailsQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookid,
            }
        }
    }
})(BookDetails)
