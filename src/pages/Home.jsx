import React,{useEffect,useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
//import ExampleCarouselImage from 'components/ExampleCarouselImage';
import CardGroup from 'react-bootstrap/CardGroup';
import {useFirebase} from "../context/Firebase";
import BookCard from "../components/BookCard";


const Home = () => {
    const firebase=useFirebase();

    const [books,setBooks]=useState([]);

    useEffect(()=>{
        firebase.listAllBooks()
    .then(books=>setBooks(books.docs));
    },[]);

  return (
    <div className="container mt-5" >
       <Carousel >
      <Carousel.Item>
       <img src="https://images.pexels.com/photos/2177482/pexels-photo-2177482.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" height="400px" width="100%"/>
        <Carousel.Caption>
          <h3>There is no friend as loyal as a book</h3>
          <p>Loyal</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
       <img src="https://images.pexels.com/photos/2465877/pexels-photo-2465877.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" height="400px" width="100%" />
        <Carousel.Caption>
          <h3>Think before you speak. Read before you think. </h3>
          <p>Think</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
       <img src="https://images.pexels.com/photos/4865737/pexels-photo-4865737.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" height="400px" width="100%"/>
        <Carousel.Caption>
          <h3>Buy Some Good Books</h3>
          <p>
            Knowledge Purpose
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <hr />
    <strong>BOOKS</strong>
        <CardGroup style={{backgroundColor:"red"}}>
     { books.map((book) =><BookCard link={`/book/view/${book.id}`} key={book.id} id={book.id} {...book.data()}/>
      )
      }
      </CardGroup>
      
    </div>
  )
}

export default Home;
