import React from 'react';
import "./space.css";

function Space(props) {
    return (
        
        <div className="col-3">
            <div className="card">
                <img className="card-img-top" src="https://cdn-icons-png.flaticon.com/512/195/195492.png" alt={props.space.id} ></img>
                <div className="card-header">
                    {props.space.name}
                </div>
                <div className="card-body">
                    <p className="card-text">{props.space.address}</p>
                </div>
            </div>
        </div>
    );
}

export default Space;