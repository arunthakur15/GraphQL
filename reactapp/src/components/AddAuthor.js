import React, {Component, useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';

import {addAuthorMutation, getAuthorsQuery} from '../queries/queries';

function AddAuthorForm() {
    const [newAuthor, setNewAuthor] = useState({
        name:"",
        age:null
    });

    const [addAuthor] = useMutation(addAuthorMutation, {
        variables:{
            name: newAuthor.name,
            age: newAuthor.age
        },
        refetchQueries:[{query:getAuthorsQuery}]
    });
    
    return (
        <div id="add-author">
            <form onSubmit={(e)=>{
                e.preventDefault();
                console.log(newAuthor);
                addAuthor();
            }}>
                <div><h4>Add Author</h4></div>
                <hr/>
                <div className="field">
                <label>Author Name :</label>
                <input type="text" onChange={(e)=>{setNewAuthor({...newAuthor,name : e.target.value})}}/>
                </div>
                <div className="field">
                <label>Age :</label>
                <input type="text" onChange={(e)=>{setNewAuthor({...newAuthor,age : e.target.value})}}/>
                </div>
                
                <button type="submit">+</button>
            </form>
        </div>
    )
}

class AddAuthor extends Component {
    render(){
        return(
            <div>
                <AddAuthorForm/>
            </div>
        )
    }
}

export default AddAuthor;