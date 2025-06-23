import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
  albumId: string;
}

const AlbumImages: React.FC<Props> = ({ albumId }) => {
  const [images, setImages] = useState<string[]>([]);

  const fetchImages = async () => {
    const { data } = await axios.get(`/api/albums/${albumId}/images`);
    setImages(data);
  };

  useEffect(() => {
    fetchImages();
  }, [albumId]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {images.map((url, index) => (
        <img key={index} src={url} alt={`image-${index}`} width={150} />
      ))}
    </div>
  );
};

export default AlbumImages;
