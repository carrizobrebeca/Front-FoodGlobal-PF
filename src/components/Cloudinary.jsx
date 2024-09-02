import React, { useState } from 'react';

const Cloudinary = ({ onImageUpload }) => {
    const preset_name = "foodglobal";
    const cloud_name = "foodglobal";

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', preset_name);

        setLoading(true);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data
            });

            const file = await response.json();
            setImage(file.secure_url);
            setLoading(false);
            
            // Llamar a la función onImageUpload con la URL de la imagen
            onImageUpload(file.secure_url);
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                name="file"
                placeholder="Upload an image"
                onChange={uploadImage}
            />
            {loading ? (
                <h3>Loading...</h3>
            ) : (
                <img src={image} alt="Uploaded" style={{ maxWidth: '200px', marginTop: '10px' }} />
            )}
        </div>
    );
};

export default Cloudinary;
