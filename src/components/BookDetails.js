import React, {Component} from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries'

function BookInfo(props) {
    console.log(props);

    const { loading, error, data } = useQuery(getBookQuery, {
        variables:{
            id:props.id
        }
    });

    if (loading) return <span>Loading...</span>;
    if (error) return <span>Error :(</span>;
    const { book } = data;
     return(
        <div id="book-detail">
            <h3>{book.name}</h3>
            <p>{book.genre}</p>
            <p>{book.author.name}</p>
            <p>More books by <strong>{book.author.name}</strong> :</p>
            <ul className="other-books">
                {
                    book.author.books.map(item => {
                        return <li key={item.id}>{item.name}</li>
                    })
                }
            </ul>
        </div>
    )

    
}


class BookDetails extends Component {
    render(){
        return(
            <BookInfo id={this.props.bookId.id}/>
        )
    }
}

export default BookDetails;