import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getAuthorsQuery, addBookMutation, getBooksQuery} from "../queries/queries";
import {flowRight as compose} from 'lodash';  
export class Addbook extends Component {
    constructor(props){
        super(props);
        this.state={
            name: "",
            genre: "",
            authorid: "",
        };
    }

    inputHandler(e) {
       var target = e.target;
       this.setState({[target.name]: target.value})
    }

    submitForm(e) {
        e.preventDefault();
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorid: this.state.authorid
            },
            refetchQueries: [{query: getBooksQuery}]
        });
    }

    displayAuthors() {
        var data = this.props.getAuthorsQuery;

        if(data.loading) {
            return (<option disabled> Loading Options ...</option>)
        } else {
            return data.authors.map(author => {
                return(
                <option key={author.id} value={author.id}>{author.name}</option>
                )
            })

            
        }
    }



    render() {

        return (
            <div>
                <form id="add-book" onSubmit={(e)=> this.submitForm(e)}>
                    <div className="field">
                        <label>Book Name:</label>
                        <input name="name" type="text" onChange={(e)=>this.inputHandler(e)} />
                    </div>

                    <div className="field">
                        <label>Genre:</label>
                        <input name="genre" type="text"  onChange={(e)=>this.inputHandler(e)}/>
                    </div>

                    <div className="field">

                        <label>Author:</label>
                        <select name="authorid"  onChange={(e)=>this.inputHandler(e)}>
                        <option>Select Author</option>

                            {this.displayAuthors()}
                        </select>
                    </div>
                    <button>+</button>
                </form>
            </div>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(Addbook)
