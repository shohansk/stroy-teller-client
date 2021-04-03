import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { Button } from 'bootstrap';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
const AddBook = () => {
    const [imgUrl, setImgUrl]=useState([])
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        const bookData={
            name: data.name,
            price: data.price,
            author:data.author,
            imageUrl: imgUrl
        }
        console.log(bookData)
        const url=`https://dry-harbor-71019.herokuapp.com/addEvent`
        fetch(url,{
            method: "POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(bookData)
        })
        .then(res=>console.log("server side response"))
    };


    const handleImageUpLoad=(book)=>{
        console.log(book.target.files[0]);
        const imageData=new FormData();
        imageData.set('key','4b0ec10db65fb9d7a3956e88f27613f9');
        imageData.append('image', book.target.files[0])
    
    
        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
              console.log(response.data.data.display_url)
            setImgUrl(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          })

    }

    return (
        <div className="container mr-auto">
            <h1>Add Book </h1>
   



    <Form onSubmit={handleSubmit(onSubmit)}>
  <Form.Group controlId="formBasicBookName">
    <Form.Label>Enter Book Name</Form.Label>
    <Form.Control name="name" placeholder="Enter Book name" ref={register}  />
  </Form.Group>
  <Form.Group controlId="formBasicBookAuthorName">
    <Form.Label>Enter Book Author Name</Form.Label>
    <Form.Control  name="author" placeholder="Enter Book author" ref={register} />
  </Form.Group>
  <Form.Group controlId="formBasicBookPrice">
    <Form.Label>Enter Book Price</Form.Label>
    <Form.Control name="price" placeholder="Enter Book price"  ref={register} />
  </Form.Group>
  <Form.Group>
  <Form.Label>upload image</Form.Label>
    <Form.File name="exampleRequired" type="file" onChange={handleImageUpLoad}/>
  </Form.Group>

 
  <input className="btn btn-primary" type="submit" />
</Form>
            
        </div>
    );
};

export default AddBook;