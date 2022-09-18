import { useState,useEffect } from "react";
import { Form } from 'react-bootstrap';
import {BrowserRouter, Switch, Route, useHistory, useParams} from "react-router-dom"
import {toast} from "react-toastify"


const Addnote=(props)=>{
    const [expand,setExpand]=useState(false);

    const [note,setNote]= useState({
        id: "",
        title:"",
        tagline:"",
        body:"",
        notedate:""
    });


    const updateInput=(event)=>{
        const {name,value}=event.target;

        setNote((prevData)=>{
            return{
                ...prevData,
                [name]:value
            };
        });
    };

    const appendNote=()=>{
        
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        const time = current.toLocaleTimeString("en-US");

        note.notedate=date+"  "+time;
        props.passNote(note);

        setNote({
            title:"",
            tagline:"",
            body:""
        });

        unexpandnote()
    };

    const expandnote=()=>{
        setExpand(true);
    }

    const unexpandnote=()=>{
        setExpand(false);
    }

    return(
        
        <div className="add-note mb-3">

            {!expand?
            <div className="notes-box">
                  <Form.Control  onClick={expandnote} type="text" name="title" placeholder="Add a Note..." value={note.title} onChange={updateInput} className="title form-input note-title"/>
                  </div>
                : null
            }
 
            {expand?
                
            <div className="notes-box">
                <Form.Control type="text" name="title" placeholder="Title" value={note.title} onChange={updateInput} className="title form-input mb-3 note-title"/>

                <Form.Control type="text" name="tagline" placeholder="Tagline" value={note.tagline} onChange={updateInput} className="tagline form-input mb-3 note-tagline"/>

                <Form.Control
                    name="body"
                    value={note.body} 
                    onChange={updateInput}
                    className="body form-input mb-3"
                    as="textarea"
                    placeholder="Body"
                    style={{ height: '120px' }}
                />

                <div className="d-flex flex-row justify-content-right">
                    <button  onClick={appendNote} variant="Light" className="button2">
                        Add
                    </button>{' '}
                    <button onClick={unexpandnote} variant="Light"  className="button2">
                        Close
                    </button>
                </div>

            </div> :
            null
}
        </div>
    );
}

export default Addnote;