import React from 'react';
import { FormattedMessage } from "react-intl";


function RowTable(props) {

    function returnDeviceInternationalized(name){
        if(name.startsWith("temperature")){
            return <FormattedMessage id="temperature"/>
        }
        else if(name.startsWith("light")){
            return <FormattedMessage id="light"/>        
        }
        else if(name.startsWith("humidity")){
            return <FormattedMessage id="humidity"/>
        }
        else if(name.startsWith("door")){
            return <FormattedMessage id="door"/>
        }
        else if(name.startsWith("Gas")){
            return <FormattedMessage id="gas"/>
        }
    }

    function returnValueField(value){
        
        if(isNaN(value)){
            return <FormattedMessage id={value}/>
        } 
        else if(value){
            return value;
        }
        else{
            return <FormattedMessage id={value.toString()}/>
        }
    }

    function returnFinalNumers(word){

        let firstDigit = word.match(/\d/);

        if(firstDigit === null){
            return "";
        } else{
            let index = word.indexOf(firstDigit);
            return word.substring(index, word.length);
        }
        

    }

    return (
        <tr>
            <th scope="row">{props.number}</th>
            <td>{props.device.id?(props.device.id):("N.A")}</td>
            <td>{returnDeviceInternationalized(props.device.name)}{returnFinalNumers(props.device.name)} </td>
            <td>{returnValueField(props.device.desired.value)} {props.device.name==="temperature"?"°C":""}</td>
        </tr>
    );
}

export default RowTable;