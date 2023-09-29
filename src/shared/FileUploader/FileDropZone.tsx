import {Dropzone, FileItem, FileValidated, FullScreenPreview} from "@dropzone-ui/react";
import {FC, useState} from "react";
import {CarModule, FileDropType} from "../../data/types";
interface FileDropZoneType {
    files:FileValidated[],
    setFiles:Function,
    carModule?:CarModule
}

const FileDropZone: FC<FileDropZoneType> = ({
    files = [],
    setFiles,
    carModule,
}) => {
    const updateFiles = (incommingFiles:FileValidated[]) => {
        setFiles(incommingFiles);
        // carModule?.files?.push(incommingFiles);
        //even your own upload implementation
    };

    const [imageSrc, setImageSrc] = useState<string|undefined>(undefined);

    const handleSee = (imageSource:string|undefined) => {
        setImageSrc(imageSource);
    };
    const styleProp = {
        "width":"100%",
        "background":"transparent",

    }

    const removeFile = (id:any) => {
        let finalFiles = files.filter(x=>x.id !== id);
        carModule?.files?.push(finalFiles);
        setFiles(files.filter((x) => x.id !== id));
    };
    return (
        <Dropzone
            maxFiles={5}
            accept=".png,image/*"
            style={styleProp}
            onChange={updateFiles}
            label={"Перетащите сюда фотки или загрузите"}
            textColor={"white"}
            value={files}
            localization="RU-ru"
            removeOnDrop={true}
        >
            {files.map((file) => (
                <FileItem {...file} onDelete={removeFile} key={file.id}
                          onSee={handleSee}
                          resultOnTooltip
                          preview
                 />
            ))}
        </Dropzone>
    );
}

export default FileDropZone;