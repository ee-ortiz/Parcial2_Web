import React from 'react';
import "./space.css";

function Room(props) {
    return (
        
        <div className="col-3">
            <div className="card">
                <div className="card-header">
                    {props.room.name}
                </div>
                <img className="card-img-bot" src="https://cdn1.vectorstock.com/i/thumb-large/27/20/living-room-furniture-rgb-color-icon-vector-34822720.jpg" alt={props.room.homeId} ></img>
            </div>
        </div>
    );
}

export default Room;