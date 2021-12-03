import React, { useState, useEffect } from "react";
import Space from './Space';
import Room from './Room';
import "./pageContent.css";


const urlSpaces = `https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json`;
const urlRooms = `https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json`;


function PageContent(props) {

    const [ spaces, setSpaces ] = useState([]); 
    const [ rooms, setRooms ] = useState([]);

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

        console.log(space);
    };

    const fetchRooms = async () => {
        const resp = await fetch(urlRooms);
        const data = await resp.json();
    
        const room = data?.map((resp) => {
          return {
            homeId: resp.id,
            name: resp.name,
            devices: resp.devices,
            type: resp.phone,
            powerUsage: resp.type
          };
        });
        localStorage.setItem("rooms", JSON.stringify(room));
        setRooms(room);

        console.log(room);
    };


    useEffect(() => {
        fetchSpaces();
        fetchRooms();
    }, []);


    return (

        <div className="container-fluid">

            <div className="row">
                <div className="col-md-12">
                    <h3>My spaces</h3>
                </div>
                {spaces?.map((e,i) => (
                    <Space key={i} space={e}/>
                    ))}
            </div>

            <div id="verticalSpace" class="col-md-12"></div>

            <div className="row">
                <div className="col-md-12">
                    <h3>My rooms</h3>
                </div>
                {rooms?.map((e,i) => (
                    <Room key={i} room={e}/>
                    ))}

            </div>
        </div>

    );
}

export default PageContent;