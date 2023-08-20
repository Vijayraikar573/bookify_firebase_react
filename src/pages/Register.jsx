import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from "react-router-dom";
import {useFirebase} from "../context/Firebase";
import {useState,useEffect} from "react";

const Register = () => {
    const firebase=useFirebase();
    const navigate=useNavigate();

    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    useEffect(()=>{
        if(firebase.isLoggedIn){
            //navigate to home
            navigate("/");
        }
    },[firebase,navigate])

    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log("signing up user")
       const result=await firebase.signupWithEmailAndPass(email,password)
       console.log("successful",result);
    }

   


  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  )
}

export default Register;
