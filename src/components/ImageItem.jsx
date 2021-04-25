import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default function ImageItem(props) {
    const handleClick = () => {
        props.onDelete(props);
    }
    return (
        <div className="preview-block" key={props.id}>
            <div className="preview-closer" onClick={handleClick}><FontAwesomeIcon icon={faTimesCircle} /></div>
            <img src={props.source} className="image-element"/>
        </div>
    )
}
