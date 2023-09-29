import {FC, useEffect, useState} from "react";
import {createSyntheticFile, FileItem, FileItemContainer, makeSynthticFileValidate} from "@dropzone-ui/react";

import {CarImageType, CarModule} from "../../data/types";
import {FileItemProps} from "@dropzone-ui/react/build/components/file-item/components/FileItem/FileItemProps";

interface CurrentImagesProp {
    carModule:CarModule
}
const CurrentImages:FC<CurrentImagesProp>=({carModule})=> {

    const [syntheticFiles, setSyntheticFiles] = useState<FileItemProps[]>([]);

    useEffect(() => {
        setSyntheticFiles(makeSyntheticFiles(carModule.images || []));
        return () => {
            setSyntheticFiles([]);
        };
    }, []);
    const handleDelete = (id:string|number|undefined) => {
        setSyntheticFiles(syntheticFiles.filter((x) => x.file?.name !== id));
        carModule.images = carModule.images?.filter(i => i.id !== id);
    };
    return (
        <>                <h2>Текущие фотки:</h2>
            <FileItemContainer view="list">
                {syntheticFiles.map((f, index) => (
                    <FileItem
                        {...f}
                        key={f.file?.name}
                        onDelete={() => {handleDelete(f.file?.name) }}
                        info
                        preview
                        resultOnTooltip
                    />
                ))}
            </FileItemContainer>
        </>

    );
}

export default CurrentImages;
// synthetic validated files creation
const makeSyntheticFiles = (images:CarImageType[]) => {
    const results:FileItemProps[] = [];
    images.map(i=> {
        const img = createSyntheticFile(
            i.id
        )
        const validateFileFromWebUrl:FileItemProps = makeSynthticFileValidate(
            img,
            true,
            undefined,
            "Загрузка"

        );
        validateFileFromWebUrl.imageUrl = "http://192.168.1.2:8092"+i.link;
        results.push(validateFileFromWebUrl)
    })

    return results;
    //create File object instances

};
