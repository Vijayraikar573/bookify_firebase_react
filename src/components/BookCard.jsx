import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useFirebase} from "../context/Firebase";

const BookCard = (props) => {
    const firebase=useFirebase();

    const navigate=useNavigate();

    const[url,setURL]=useState(null);

    useEffect(()=>{
        firebase.getImageURL(props.imageURL)
        .then(url=>setURL(url));
    },[])

    console.log(props);

  return (
    <div>
      <Card style={{ width: '18rem',margin:"70px" }}>
      <Card.Img variant="top" src={url} alt=""/>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
        This book has a title {props.name} and this book is sold by {props.displayName} and this book cost Rs.{props.price}
        </Card.Text>
        <Button variant="primary" onClick={(e)=>navigate(props.link) }>View</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default BookCard;
