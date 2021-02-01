import { useState, useEffect } from 'react';
import { useFirestore } from '../services/firebase';
import snapshotToArray from '../helpers/snapshotToArray';
import Photo from './Photo';

const { db } = useFirestore();

export const PhotoGrid = () => {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    db
    .collection('photos')
    .get()
    .then((snapshot) => setPhotos(snapshotToArray(snapshot)));
  }, [])
  console.log(photos);
  return (
    <div>
      <h1>hello im a photo grid</h1>
      {photos.map((photo) => (
        <Photo photo={photo} key={photo.id} />
      ))}
    </div>
  );
};

export default PhotoGrid;
