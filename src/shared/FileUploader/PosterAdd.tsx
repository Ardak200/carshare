import FileUpload from "./FileUpload";
import React, {FC, Fragment, useEffect} from "react";
import {FileImageType} from "../../data/types";
interface PosterProps {
    files:FileImageType,
    setFile:Function,
}
const PosterAdd:FC<PosterProps> = ({
                                       files = {img:[]},
                                       setFile}) => {
    const maxFiles = 5;

    const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 50000000000000000000000;


    const updateUploadedFiles = (newFiles:any) => {
        console.log("+-+_+_")
        console.log(files)
        console.log(newFiles)
        console.log("+-+_+_")
        setFile({ ...files,  img:newFiles });
    }

    return (
        <Fragment>
            <div>
                    <FileUpload
                        maxFileSizeInBytes={DEFAULT_MAX_FILE_SIZE_IN_BYTES}
                        maxNoFiles={maxFiles}
                        updateFilesCb={updateUploadedFiles}
                        accept=".jpg, .png, .jpeg"
                        label=""
                        multiple={true}
                    />
            </div>
        </Fragment>
    )
}
export default PosterAdd;