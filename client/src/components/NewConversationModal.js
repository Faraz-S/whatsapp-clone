import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import {useContacts} from '../contexts/ContactsProvider';
import {useConversations} from '../contexts/ConversationsProvider'

const NewConversationModal = ({closeModal}) => {
 const [selectedContactIds, setSelectedContactIds] = useState([]);
 const {contacts} = useContacts();
 const { createConversation } = useConversations();

 const handleSubmit = (e) => {
  e.preventDefault();

  createConversation(selectedContactIds);
  closeModal()
 }

 const handleCheckBoxChange = (contactId) => {
  setSelectedContactIds(prevselectedContactIds => {
   if(prevselectedContactIds.includes(contactId)) {
    return prevselectedContactIds.filter(prevId => {
     return contactId !== prevId;
    })
   } else {
    return [...prevselectedContactIds, contactId]
   }
  })
 }

 return (
  <>
  <Modal.Header closeButton>Create Conversation</Modal.Header>
  <Modal.Body>
   <Form onSubmit={handleSubmit}>
    {contacts.map(contact => (
     <Form.Group controlId={contact.id} key={contact.id}>
      <Form.Check
      type="checkbox"
      value={selectedContactIds.includes(contact.id)}
      label={contact.name}
      onChange={() => handleCheckBoxChange(contact.id)}
      />
     </Form.Group>
    ))}
    <Button type="submit">Create</Button>
   </Form>
  </Modal.Body>
  </>
 );
}
 
export default NewConversationModal;