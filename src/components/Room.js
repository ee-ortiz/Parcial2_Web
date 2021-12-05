import React from 'react';
import { FormattedMessage } from "react-intl";
import "./space.css";
import livingroom from "./assets/living-room.png";
import kitchen from "./assets/kitchen.png";
import table from "./assets/table.png";


function returnPhoto(name){
    if(name.includes("Kitchen")){
        return kitchen;
    }
    else if(name.includes("Dinner ")){
        return table;
    }
    else{
        return livingroom;
    }
}

function returnNameInternationalized(name){
    if(name==="Living room"){
        return <FormattedMessage id="living"/>
    }
    else if(name === "Kitchen"){
        return <FormattedMessage id="kitchen"/>
    }
    else if(name === "Dinner room"){
        return <FormattedMessage id="dinner"/>
    }
}

function Room(props) {

    function getClassName()
    {
        if(props.devices && props.devices.length>0){
            return "d-flex justify-content-center col-xs-12 col-sm-12  col-md-3 col-lg-3"
        }
        if(props.tamano === 2){
            return "d-flex justify-content-center col-xs-12 col-sm-12  col-md-6 col-lg-6"
        }
        else if(props.tamano === 3){
            return "d-flex justify-content-center col-xs-12 col-sm-12  col-md-4 col-lg-4"
        }
    }
    return (
        <div className={getClassName(props.tamano)} onClick={() => props.setActual(props.room.devices)}>
            <div className="card">
                <div className="card-header">
                    {returnNameInternationalized(props.room.name)}
                </div>
                <img className="card-img-bot" src={returnPhoto(props.room.name)} alt={props.room.homeId} ></img>
            </div>
        </div>
    );
}

export default Room;