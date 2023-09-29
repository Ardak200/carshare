import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import React from "react";
import { useHistory } from 'react-router-dom';
const NoRecordFound = () => {
    const history = useHistory();
    return (
        <div>
            <div className="msc-blank text-center text-lg p-10">
                <div className="msc-blank-icon text-gray-800 text-3xl">⚠</div>
                <div className="msc-blank-title">
                    Пока не добавлено ни одной записи по запросу
                </div>
            </div>
        </div>
    )
}

export default NoRecordFound