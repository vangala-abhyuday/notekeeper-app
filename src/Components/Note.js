import { useState } from "react";
import Popup from './Popup.js'
import DeleteIcon from '@mui/icons-material/Delete';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import {Card} from 'react-bootstrap'

const Note=(props)=>{
    const [modalShow, setModalShow] = useState(false);
    const [pin, setpin]= useState(false);
    

    const deleteNote=()=>{
        props.delNote(props.id);
    }

    const updatenote=(newnote)=>{
        props.makenote(newnote);
    }

    const pinnote=()=>{
        setpin(true)
        props.pinthenote(props.id);
    }

    const unpinnote=()=>{
        setpin(false)
        props.unpinthenote(props.id);
    }

    return(
        <div className="col-12 col-md-6 col-xl-4" >
            <div className="note" style={{ width: '22rem'}} >
        <Card className="note-card" >
            <Card.Body onClick={() => setModalShow(true)}>
                <Card.Title className="title" style={{ fontSize: '1.4rem'}}>
                    {props.title}
                </Card.Title>

                <Card.Subtitle className="tagline mb-2 text-muted"  style={{ fontSize: '1.3rem'}}>
                    {props.tagline}
                </Card.Subtitle>

                <Card.Text className="body"  style={{ fontSize: '1.1rem'}}>
                    {props.body}
                </Card.Text>
            </Card.Body>
            

            <div className="d-flex flex-row justify-content-between">
            
                <div className="d-flex flex-row">

                    <DeleteIcon className="icon pointer" onClick={deleteNote} color="primary" sx={{ fontSize: 30 }}/>{'  '}
                    
                    {pin?

                    <PushPinIcon className="pointer" onClick={unpinnote} sx={{ fontSize: 30 }}/> :
                    <PushPinOutlinedIcon className="pointer" onClick={pinnote} sx={{ fontSize: 30 }}/> }
                </div>

                <div className="body">{props.notedate}</div>
            </div>
            </Card>

        
        

      <Popup
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={props.title}
        tagline={props.tagline}
        body={props.body}
        id={props.id}
        notedate={props.notedate}
        modifynote={updatenote}
      />

</div>
        </div>
    );
}

export default Note;