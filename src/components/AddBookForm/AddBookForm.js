import React, { useEffect, useState } from 'react';
import { Nav, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {faBorderAll, FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFontAwesome, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { dom ,} from '@fortawesome/fontawesome-svg-core'
// import { faEdit }from '@fortawesome/free-brands-svg-icons'
import { FaBeer,FaEdit,FaPlus } from 'react-icons/fa';
import {MdDelete,MdBorderAll } from 'react-icons/md';
import AddBook from '../AddBook/AddBook';


const AddBookForm = () => {
  const [manage, setManage] = useState(false)
    const [books, setBooks]=useState([])
 
    useEffect(()=>{
        fetch('https://dry-harbor-71019.herokuapp.com/event')
        .then(res=>res.json())
        .then(data=>setBooks(data))
    },[])

     
  const deleteBook=id=>{
    fetch(`https://dry-harbor-71019.herokuapp.com/delete/${id}`,{
      method:'DELETE'
    })
    .then(res => res.json())
    .then(result => {
      console.log('this is delete');
      
      
    })
  }
    return (
        <div className="container d-flex">
      
            <div className="w-25 border border-primary mr-5 h-100">
                <Navbar>
                    <Nav className="d-block">

                        <Nav.Link as={Link} onClick={() => setManage(!manage)}><MdBorderAll/> Manage Admin</Nav.Link>
                        <Nav.Link as={Link} onClick={() => setManage(!manage)}><FaPlus/> Add Book</Nav.Link>
                        <Nav.Link><FaEdit/> Edit</Nav.Link>
                     
                    </Nav>
                </Navbar>

            </div>
          {
            manage?  <div className="w-75 border border-secondary">
            <AddBook></AddBook>
        </div>

        :
        <div className="w-75 border border-secondary">
        <table class="table">
<thead>
<tr>

  <th scope="col">Book Name</th>
  <th scope="col">Author Name</th>
  <th scope="col">Price</th>
  <th scope="col">Action</th>
</tr>
</thead>
<tbody>
{
   books.map(book=> <tr>
 
    <td>{book.name}</td>
    <td>{book.authorName}</td>
    <td>${book.price}</td>
    <td><FaEdit/>   <MdDelete onClick={()=>deleteBook(book._id)}/> </td>

  </tr>)
}



</tbody>
</table>
        </div>
          }
           

            {/* <FontAwesomeIcon icon={faBorderAll} color="green" />  */}
        </div>
    );
};

export default AddBookForm;
