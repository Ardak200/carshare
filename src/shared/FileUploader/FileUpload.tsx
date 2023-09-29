import React, {FC, useEffect, useRef, useState} from 'react';
import {
    FileUploadContainer,
    FormField,
    UploadFileBtn,
    FilePreviewContainer,
    ImagePreview,
    PreviewContainer,
    PreviewList,
    RemoveFileIcon, DragDropImgIcon,
} from './file-upload.styles';
import uploadIcon from "images/upload.svg";


const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 50000;

const convertNestedObjectToArray = (nestedObj:any) =>
    Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes:number) => Math.round(bytes / KILO_BYTES_PER_BYTE);

interface FileUploadProps {
    label:string,
    updateFilesCb:Function,
    maxFileSizeInBytes?:number,
    multiple:boolean,
    accept?:string,
    maxNoFiles?:number
}

const FileUpload:FC<FileUploadProps> = ({
                        label,
                        updateFilesCb,
                        maxNoFiles = 4,
                        maxFileSizeInBytes = 50000,
                        ...otherProps
                    }) => {
    const fileInputField = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<any>([]);

    const handleUploadBtnClick = () => {
        if(fileInputField.current) {
            fileInputField.current.click();
        }
    };

    useEffect(() => {
        console.log(files)
    },[files])

    const addNewFiles = (newFiles:any) => {
        for (let file of newFiles) {
            if (file.size <= maxFileSizeInBytes) {
                if (!otherProps.multiple) {
                    return { file };
                }
                files[file.name] = file;
            }
        }
        return { ...files };
    };

    const callUpdateFilesCb = (files:any) => {
        const filesAsArray = convertNestedObjectToArray(files);
        updateFilesCb(filesAsArray);
    };

    const handleNewFileUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { files: newFiles } = e.target;
        if (newFiles != null && newFiles.length) {
            let updatedFiles = addNewFiles(newFiles);
            console.log("updatedFiles")
            console.log(updatedFiles);
            setFiles(updatedFiles);
            callUpdateFilesCb(updatedFiles);
        }

    };

    const removeFile = (fileName:any) => {
        delete files[fileName];
        setFiles({ ...files });
        callUpdateFilesCb({ ...files });
    };

    return (
        <>
            <FileUploadContainer>
                <DragDropImgIcon src={uploadIcon}/>
                <UploadFileBtn type="button" onClick={handleUploadBtnClick} >
                    <span> Перетищите {otherProps.multiple ? "фотки" : "фото"} или <b>загрузите</b></span>
                </UploadFileBtn>
                <FormField
                    type="file"
                    ref={fileInputField}
                    onChange={handleNewFileUpload}
                    title=""
                    value=""
                    {...otherProps}
                />
            </FileUploadContainer>
            <FilePreviewContainer>
                <PreviewList>
                    {Object.keys(files).map((fileName, index) => {
                        let file = files[fileName];
                        let isImageFile = file.type.split('/')[0] === 'image';
                        console.log(isImageFile)
                        return (
                            <PreviewContainer key={fileName}>
                                <div>
                                    {isImageFile && (
                                        <ImagePreview
                                            src={URL.createObjectURL(file)}
                                            alt={`file preview ${index}`}
                                        />
                                    )}
                                        <span>{file.name}</span>
                                        <aside>
                                            <span>{convertBytesToKB(file.size)} kb</span>
                                            <RemoveFileIcon
                                                className="fas fa-trash-alt"
                                                onClick={() => removeFile(fileName)}
                                            />
                                        </aside>
                                </div>
                            </PreviewContainer>
                        );
                    })}
                </PreviewList>
            </FilePreviewContainer>
        </>
    );
};

export default FileUpload;
