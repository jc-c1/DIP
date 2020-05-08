import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import eventsService from '../../utils/eventsService';



const DeleteButton = (props) => {



  const handleDelete = () => {eventsService.deleteEvent({eventId : props.id}).then((events)=>{props.handleUpdateEvents(events);}
  )}

    return (
              <button className="btn btn-default"
              onClick={handleDelete} >X</button>
    )
  
}

export default DeleteButton;
