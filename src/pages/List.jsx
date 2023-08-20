import React,{useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useFirebase} from "../context/Firebase";

const ListPage = () => {
    const firebase=useFirebase();
    const[name,setName]=useState("");
    const[isbnNumber,setIsbnNumber]=useState("");
    const[price,setPrice]=useState("");
    const[coverPic,setCoverPic]=useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
        await firebase.handleCreateNewListing(name,isbnNumber,price,coverPic)
    }

  return (
    <div>
       <div className="container" style={{marginTop:"90px",marginBottom:"20px"}}>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Book Name</Form.Label>
        <Form.Control type="text" value={name} placeholder="Book Name" onChange={(e)=>{setName(e.target.value)}} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>ISBN</Form.Label>
        <Form.Control type="text" value={isbnNumber} placeholder="ISBN NUmber" onChange={(e)=>{setIsbnNumber(e.target.value)}}/>
      </Form.Group>
     
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" value={price} placeholder="Price" onChange={(e)=>{setPrice(e.target.value)}} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Cover Pic</Form.Label>
        <Form.Control type="file" placeholder="CoverPic" onChange={(e)=>{setCoverPic(e.target.files[0])}} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create
      </Button>
      
    </Form>
    </div>
    </div>
  )
}

export default ListPage;
