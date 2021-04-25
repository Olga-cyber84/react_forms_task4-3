import React, {useState} from 'react';
import ImageItem from './ImageItem';
import {nanoid} from 'nanoid';

export default function PhotoLoader() {
    const [pictures, SetPicture] = useState([]);
    const fileToDataUrl = file => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
        
          fileReader.addEventListener('load', evt => {
            resolve(evt.currentTarget.result);
          });
          
          fileReader.addEventListener('error', evt => {
            reject(new Error(evt.currentTarget.error));
          });
          
          fileReader.readAsDataURL(file);
        });
    }
    
    const handleSelect = async (evt) => {
        const files = [...evt.target.files];
        const urls = await Promise.all(files.map(o => fileToDataUrl(o)));
        SetPicture(prevPicture=> ( [...prevPicture, {
            id: nanoid(),
            source: urls
        }]))
    }
    const handleDelete = (val) => {
        const newPicturesList = pictures.filter((picture) => picture.id !== val.id);
        SetPicture(() => newPicturesList);
    }
    return (
        <>
        <form>
            <div className="select-block">Click to select</div>
            <input type="file" onChange={handleSelect}/>
        </form>
        {
            pictures.map((picture) => <ImageItem key={picture.id} source={picture.source} id={picture.id} onDelete={handleDelete}/>)
        }
        </>
    )
}
