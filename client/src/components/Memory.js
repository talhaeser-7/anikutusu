import React, {useEffect,useState} from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

import {MdModeEdit,MdDelete} from 'react-icons/md'
import {deleteMemory} from '../actions/memoryActions'

import {useDispatch} from 'react-redux'

const Memory = ({ memory }) => {
   const [user, setUser] = useState()
  const userState = useSelector((state) => state.user)

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    setUser(userData)
  }, [userState])

   const dispacth = useDispatch()
   return (
      <Card className='rounded py-3 my-3'>
         <Card.Img variant="top" src ={memory.image} />
         <Card.Body>
        <Card.Title style={{ color: 'darkblue' }}>{memory.title}</Card.Title>
        <Card.Text>{memory.content}</Card.Text>
        <Card.Title>
          <span style={{ color: 'darkblue' }}>Yazar:</span> {memory.creator}
        </Card.Title>
        <Card.Subtitle>{moment(memory.createdAt).fromNow()}</Card.Subtitle>
      </Card.Body>


         {
            user?.user?._id ===memory.creatorId ? (
<Card.Footer style ={{display:'flex',justifyContent:'space-between'}}className='bg-white pb-00'>
            <LinkContainer to ={`/update/${memory._id}`} style ={{cursor:'pointer'}}>
               <MdModeEdit size={25} color='blue'/>
            </LinkContainer>
         <MdDelete
          color='red' 
          style={{cursor :'pointer'}}
           size={23} 
           onClick={() => {dispacth(deleteMemory(memory._id))}}
           />

         </Card.Footer>
            ): null
         }

         
      </Card>
   )
}

export default Memory
