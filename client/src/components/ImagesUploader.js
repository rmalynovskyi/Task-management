import React from "react";

import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

const ImagesUploader = () => {

    return (
        <Dropzone accept="image/*"
                  maxFiles={3}
                  inputContent="Drap and Drop 3 images"
        />
    );
}
export default ImagesUploader;