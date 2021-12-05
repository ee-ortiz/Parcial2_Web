import React from 'react';
import RowTable from './RowTable';
import { FormattedMessage } from "react-intl";



function TableDevice(props) {
    
    return (
        <div className=" col-xs-12 col-sm-12  col-md-3 col-lg-3">
            {props.devices.length?(
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col"><FormattedMessage id="device" /></th>
                    <th scope="col"><FormattedMessage id="value" /></th>
                    </tr>
                </thead>
                <tbody>
                {props.devices?.map((e,i) => (
                    <RowTable key={i} number={i} device={e}/>
                    ))}
                </tbody>
            </table>
            ):(
                <div></div>
              )}
        </div>
    );
}

export default TableDevice;