import { Button,Modal,Form} from 'react-bootstrap'
import {useState} from 'react'

const Popup=(props)=> {


    const [newnote,setnewnote]= useState({
        id:props.id,
        title: props.title,
        tagline:props.tagline,
        body:props.body,
        notedate: props.notedate
    });

    const updateInput=(event)=>{
        const {name,value}=event.target;
        setnewnote((prevData)=>{
            return{
                ...prevData,
                [name]:value
            };
        });
    };

    const updateNote=()=>{
        props.modifynote(newnote);
        props.onHide();
    }


    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          
          <Form.Control type="text" name="title" placeholder="Title" defaultValue={props.title} onChange={updateInput} className="title form-input mt-2 note-title"/>

        </Modal.Header>
        <Modal.Body>
        <Form.Control type="text" name="tagline" placeholder="Tagline" defaultValue={props.tagline} onChange={updateInput} className="tagline form-input mb-3 note-tagline"/>

        <Form.Control
                    name="body"
                    defaultValue={props.body} 
                    onChange={updateInput}
                    className="body form-input mb-3"
                    as="textarea"
                    placeholder="Body"
                    style={{ height: '120px' }}
                />
        </Modal.Body>
        
        <Modal.Footer>
            <button className="button2" onClick={updateNote}>Save</button>
          <button className="button2" onClick={props.onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default Popup;