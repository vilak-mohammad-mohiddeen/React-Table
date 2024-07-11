import { faTruckLoading } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Spinner from 'react-bootstrap/Spinner';
import './loading.css'
export default function LoadingIconComponent(){

    return <>
    <div className="loadingDiv">
    <Spinner animation="border"  role="status" variant="primary">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
    
    </>
}


