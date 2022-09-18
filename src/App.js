import './App.css';
import { useState, useEffect } from "react"
import Header from './Components/Header'
import Addnote from './Components/Addnote'
import Note from './Components/Note'
import Pagination from './Components/Pagination'
import { Modal } from 'react-bootstrap'

import {collection, addDoc, doc, updateDoc, deleteDoc, query, orderBy, onSnapshot} from 'firebase/firestore'
import { db } from './firebase'


function App() {
  const [addItem,setAddItem]= useState([]);
  const [currPage, setCurrPage]= useState(1);
  const [PPP]=useState(6);
  const [show, setShow] = useState(false);

  const allnotesref= collection(db,'notes')

  useEffect(()=>{
    
  },[addItem])

  function getnotes(){

    // getDocs(allnotesref)
    // .then(response=>{
    //   const allnotes=response.docs.map(doc=>{

    //     let data=doc.data();
    //     data.id=doc.id;

    //     return data;
    //   })

    //   allnotes.sort((a,b)=>(a.notedate>b.notedate))
    //   console.log(allnotes)

    //   setAddItem(allnotes);
    // })
    // .catch(e=>console.log(e.message))

    const q=query(allnotesref, orderBy('notedate','desc'))

    onSnapshot(q,(ss)=>{
      const allnotes=[]
      ss.docs.forEach((doc)=>{
        let data=doc.data();
        data.id=doc.id;
        allnotes.push(data)
      })
      setAddItem(allnotes);
    })

  }

  useEffect(()=>{
    getnotes()
  },[])



  const handleClose = () => setShow(false);


  const createNote=async(note)=>{
    const {title,body}= note;

    if(title==="" || body===""){
      setShow(true)
      return
    }


    setAddItem((prevData)=>{
      return[...prevData,note];
    });


    addDoc(allnotesref, note).then(response=>{
      console.log(response)
    }).catch(e=>{console.log(e.message)})


    getnotes()

    console.log(addItem);
  };

  

  const onDelete=(id)=>{

    const docref = doc(db,'notes', id)
    deleteDoc(docref).then(()=>console.log('note deleted'))
    .catch(e=>console.log(e.message))

    getnotes();
  };

  const changePage=(num)=>{
    setCurrPage(num);
  }

  const updatenote=(newnote)=>{

    const docref = doc(db,'notes', newnote.id)
    updateDoc(docref, newnote).then(res=>{
      console.log(res)
    }).catch(e=>{console.log(e.message)})

    getnotes()
    
  }

  const pinnote=(id)=>{
    let newArr = [...addItem]; 
    const isReq = (val) => val.id===id;
    let i = newArr.findIndex(isReq);

    let a=newArr[i];
    for(var j=i;j>0;j--){
      newArr[j]=newArr[j-1];
    }

    newArr[0]=a;

    setAddItem(newArr);
    console.log(addItem);
  }

  const unpinnote=(id)=>{
    let newArr = [...addItem]; 

    const isReq = (val) => val.id===id;
    let i = newArr.findIndex(isReq);

    let a=newArr[i];
    let no=newArr.length;
    for(var j=i;j<no-1;j++){
      newArr[j]=newArr[j+1];
    }

    newArr[no-1]=a;
    
    setAddItem(newArr);
    console.log(addItem);
  }

  const j=currPage*PPP;
  const i=j-PPP;
  const currNotes=addItem.slice(i,j);

  return (
    <div className="home">
      <Header/>

      <Addnote passNote={createNote}/>

      <div className="all-notes container">
        <div className="row"> 
        
          {currNotes.map((val)=>{
            return (
            <Note
              key={val.id}
              id={val.id}
              title={val.title}
              tagline={val.tagline}
              body={val.body}
              notedate={val.notedate}
              delNote={onDelete}
              makenote={updatenote}
              pinthenote={pinnote}
              unpinthenote={unpinnote}
              date={val.date_create}
            />
            );
          })}

        </div>
      </div>

      {show? 
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title><p className="title mb-0">Notification</p></Modal.Title>
            </Modal.Header>
            <Modal.Body><p className="tagline">Please enter valid title and body of the Note</p></Modal.Body>
            
        </Modal>
      : null}
     
      <Pagination PPP={PPP} totalNotes={addItem.length} changePage={changePage}/>

    </div>
  );
};

export default App;