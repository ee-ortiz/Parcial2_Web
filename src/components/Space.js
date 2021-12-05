import { FormattedMessage } from "react-intl";
import React from 'react';
import "./space.css";
import house from "./assets/house.png";
import apartment from "./assets/apartment.png";

function Space(props) {
    
    function click(){
        if(props.espacioActual !== props.space.id){
            props.cambioEspacio();
        }
        props.setActual(props.space.id);
    }

    function returnAddresInternationalized(address){
        
        if(address.startsWith("Calle")){
            return <FormattedMessage id="street"/> ;
        }
        else if(address.startsWith("Carrera")){
            return <FormattedMessage id="career"/>;
        }
        else if(address.startsWith("Avenida")){
            return<FormattedMessage id="avenue"/>;
        }
        else if(address.startsWith("Transversal")){
            return<FormattedMessage id="transversal"/>;
        }
    }
    
    return (
        
        <div className="d-flex justify-content-center col-xs-12 col-sm-12  col-md-6 col-lg-3">
            <div className="card" onClick={() => click()}>
                <img className="card-img-top" src={props.space.name.startsWith("Casa")?house:apartment} alt={props.space.id} ></img>
                <div className="card-header">
                
                {props.space.name.startsWith("Casa")?(<FormattedMessage id="house"/>):<FormattedMessage id="apartment"/>} {props.space.name.split(" ")[1]}  
                   
                </div>
                <div className="card-body">
                    <p className="card-text">{returnAddresInternationalized(props.space.address)} {props.space.address.substring(props.space.address.indexOf(" ")+1, props.space.address.length)}</p>
                </div>
            </div>
        </div>
    );
}

export default Space;