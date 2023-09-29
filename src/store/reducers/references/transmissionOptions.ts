// коробок передач
import {PayloadAction} from "@reduxjs/toolkit";

export const transmissionOptions = (state = {
    regions: [],
}, action:PayloadAction) => {
    switch (action.type) {
        case 'REGION_SUCCESS':
            return { regions: action.payload,
            };
        case 'DATE_LOADING':
            return { regions: []};
        case 'DATE_FAILED':
            return { regions: []};
        default:
            return state;
    }
};