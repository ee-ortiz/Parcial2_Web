import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import Space from './Space';
import Room from './Room';
import TableDevice from "./TableDevice";
import "./pageContent.css";
import PieChart from "./PieChart";



const urlSpaces = `https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json`;
const urlRooms = `https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json`;


function PageContent(props) {

    const [ spaces, setSpaces ] = useState([]); 
    const [ rooms, setRooms ] = useState([]);
    const [ actualSpaceId, setActualSpaceId] = useState();
    const [ actualDevices, setActualDevices] = useState([]);

    function cambioEspacio(){
        setActualDevices([]);
    }

    const fetchSpaces = async () => {
        const resp = await fetch(urlSpaces);
        const data = await resp.json();
    
        const space = data?.map((resp) => {
          return {
            id: resp.id,
            name: resp.name,
            address: resp.address,
            phone: resp.phone,
            type: resp.type,
            isActive: resp.isActive,
          };
        });
        localStorage.setItem("spaces", JSON.stringify(space));
        setSpaces(space);
    };

    const fetchRooms = async () => {
        const resp = await fetch(urlRooms);
        const data = await resp.json();
    
        const room = data?.map((resp) => {
          return {
            homeId: resp.homeId,
            name: resp.name,
            devices: resp.devices,
            type: resp.type,
            powerUsage: resp.powerUsage
          };
        });
        localStorage.setItem("rooms", JSON.stringify(room));
        setRooms(room);

    };


    useEffect(() => {
        if (!navigator.onLine) {
            if (localStorage.getItem("rooms") === null){
                setRooms("Cargando cuartos");
            } else {setRooms(JSON.parse(localStorage.getItem("rooms")));
                }

            if (localStorage.getItem("spaces") === null) {
            setSpaces("Cargando espacios");
            } else { setSpaces(JSON.parse(localStorage.getItem("spaces")));
                }
        } else{
            fetchSpaces();
            fetchRooms();
        }
        
        

    }, [actualSpaceId, actualDevices]);

    return (

        <div className="container-fluid">

            <div className="row">
                <div className="col-12">
                    <h3><FormattedMessage id="spacesTitle" /></h3>
                </div>

                <div className="row d-flex justify-content-center">
                    {spaces.map((e,i) => (
                        <Space key={i} space={e} setActual={setActualSpaceId} espacioActual={actualSpaceId} cambioEspacio={cambioEspacio}/>
                        ))}
                </div>
            </div>


            <div id="verticalSpace" className="col-12"></div>

            <div className="row">
                {actualSpaceId?(<div className="col-12">
                    <div className="row">
                        <h3><FormattedMessage id="roomsTitle" /></h3>
                    </div>
                    <div className="row">     
                        {rooms.filter(room => room.homeId === actualSpaceId).map((e,i) => (
                        <Room key={i} room={e} setActual={setActualDevices} tamano={rooms.filter(room => room.homeId === actualSpaceId).length } devices={actualDevices}/>
                        ))} 
                        <TableDevice  devices={actualDevices}/>      
                    </div>
                    
                </div>):(<div className="col-md-12"> </div>)}
                
                
            </div>
            {rooms.filter(room => room.homeId === actualSpaceId).length > 0?
            
                <>
                    <div id="verticalSpace" className="col-md-12"></div><div className="row">
                        <div className="col-md-12">
                            <h3><FormattedMessage id="statsTitle" /></h3>
                        </div>

                        <div className="col-md-12">
                            <PieChart data={rooms.filter(room => room.homeId === actualSpaceId)} outerRadius={160} innerRadius={0} />
                        </div>
                    </div>
                </>:
                <div></div>
            }


        </div>

    );
}

export default PageContent;