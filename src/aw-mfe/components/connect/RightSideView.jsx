import React, { useEffect } from 'react';
import CONSTANTS from '../../constants';
import wrapStore from '../../store/wrapStore';
import CreateAndListView from '../common/CreateAndListView';
import DetailedView from '../common/DetailedView';


function ConnectRightContainer({ itemId = CONSTANTS.MAIN_TAB_ID}) {
  return (
   <div style={{
      height: '99%',
      width: '99%' ,
      position: 'relative',
      border: '1px solid',
      margin: '2px',
    }}>
    <div style={{ display: 'flex', flexGrow: 1, height: '100%', margin: "10px" }}>
      <div style={{ flexGrow: 1 }}>
      {
       (itemId === CONSTANTS.MAIN_TAB_ID)?
       <CreateAndListView/> :
       <DetailedView itemId={itemId}/>
      }
      </div>
    </div>
  </div>)
}

export default wrapStore(ConnectRightContainer);