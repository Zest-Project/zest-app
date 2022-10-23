import React, { useEffect, useState } from 'react';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

const AddImage = (props) => {
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (image == '') return;
    const newImageURL = URL.createObjectURL(image);
    setImageUrl(newImageURL);
    URL.revokeObjectURL(imageUrl);
  }, [image]);

  const onImageChange = (e) => {
    console.log("e.target.files[0] " + e.target.files[0]);
    e.stopPropagation();
    e.preventDefault();
    const imgFile = e.target.files[0];
    setImage(imgFile);
    // props.addImageHandler(imgFile);
    console.log('on image change in child ');
    console.log(imgFile.name);
    // props.addImagesToPost(imgFile);
  };

  return (
    <>
      <label htmlFor={'upload-button'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <InsertPhotoIcon
          style={{
            color: '#8E703E',
            cursor: 'pointer',
            display: 'inline-flex',
          }}
          sx={{ fontSize: 40 }}
        />
        <p
          style={{
            borderRadius: '10px',
            color: '#8E703E',
            display: 'inline-flex',
          }}
        >
          Add Image
        </p>
      </label>
      <div>
        <input type='file' id='upload-button' style={{ display: 'none' }} accept='image/*' onChange={onImageChange} />
        <img src={imageUrl} style={{ width: '400px', margin: '5px 0px 15px 0px' }} />
      </div>
    </>
  );
};

export default AddImage;