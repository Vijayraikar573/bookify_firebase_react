import React,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import {useFirebase} from "../context/Firebase";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

const Detail = () => {
    const params=useParams();
    const firebase=useFirebase();

    const[qty,setQty]=useState(1);

    const[data,setData]=useState(null);
    const[url,setURL]=useState(null);

    console.log(params);

    useEffect(()=>{
        firebase.getBookById(params.bookId)
        .then(value=>setData(value.data()));
    },[])

    useEffect(()=>{
        if(data){
            const imageURL=data.imageURL;
            firebase.getImageURL(imageURL)
            .then((url)=>setURL(url));
        }
    },[data]);

    const placeOrder=async()=>{
        const result=await firebase.placeOrder(params.bookId, qty);
        console.log('Order Placed',result);
    }

    if(data==null)
        return <h1>Loading...</h1>

        return (
        <div className="container mt-5">
            <h1>{data.name}</h1>
            <img src={url} width="50%" style={{borderRadius:"10px"}} alt="" />
            <h1>Details</h1>
            <p>Price: Rs.{data.price}</p>
            <p>ISBN Number: {data.isbn}</p>
            <h1>Owner Details</h1>
            <p>Name: {data.displayName}</p>
            <p>Email: {data.userEmail}</p>
            <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Quantity</Form.Label>
        <Form.Control type="Number" value={qty} placeholder="Enter Quantity" onChange={(e)=>{setQty(e.target.value)}}/>
      </Form.Group>
            <Button variant="success" onClick={placeOrder}>Buy Now</Button>
        </div>
        )

}

export default Detail;
