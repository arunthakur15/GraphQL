import React, {Component, useEffect, useState} from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';

import  BookDetails  from '../components/BookDetails';

const Books = (props) => {

    const { loading, error, data } = useQuery(getBooksQuery);

    if (loading) return <span>Loading...</span>;
    if (error) return <span>Error :(</span>;
    return data.books.map(book => {
        return(
        <li key={book.id} onClick={(e) => { props.bookId.func(book.id)}} >{book.name}</li>
        )
    });
}

class BookList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected:{
                id:null,
                func: this.changeEffect.bind(this),
                writable: true
            }
        }
    }

    changeEffect(id){
        
        this.setState({
            selected:{
                ...this.state.selected,
                id:id,
            }
        });
    }


    render(){
        return(
            <div>
                
                <ul id="book-list">
                    <Books bookId={this.state.selected}/>
                </ul>
                <BookDetails bookId={this.state.selected}/>
            </div>
        )
    }
}

export default BookList;