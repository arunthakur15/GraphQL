import React, {Component, useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';

import {getAuthorsQuery,getBooksQuery, addBookMutation} from '../queries/queries';




function Authors() {
    const { loading, error, data } = useQuery(getAuthorsQuery);

    if (loading) return <option>Loading...</option>;
    if (error) return <option>Error :(</option>;
    return data.authors.map(author => {
        return(
        <option key={author.id} value={author.id}>{author.name}</option>
        )
    });
}

function AddBookForm() {
    const [formState, setFormState] = useState({
        name: '',
        genre: '',
        authorId:''
      });

    const [addBook] = useMutation(addBookMutation, {
        variables: {
          name: formState.name,
          genre: formState.genre,
          authorId: formState.authorId
        },
        refetchQueries: [{query: getBooksQuery}]
      });
    return(
        
        <form id="add-book" onSubmit={e => {
            e.preventDefault();
            addBook();
          }}>
              <div><h4>Add Book</h4></div>
              <hr/>
        <div className="field">
            <label>Book Name:</label>
            <input type="text" value={formState.name} onChange={(e)=> setFormState({
                ...formState,
                name:e.target.value
            })}/>
        </div>

        <div className="field">
            <label>Genre:</label>
            <input type="text" value={formState.genre} onChange={(e)=> setFormState({
                ...formState,
                genre:e.target.value
                })}/>
        </div>

        <div className="field">
            <label>Author:</label>
            <select onChange={(e)=> setFormState({
                ...formState,
                authorId:e.target.value
                })}>
                <option>
                    Select Author
                </option>
                <Authors/>
            </select>
        </div>

        <button type="submit">+</button>

    </form>
    )
}

class AddBook extends Component {
    
    render(){
        return(
            <AddBookForm/>
        )
    }
}

export default AddBook;