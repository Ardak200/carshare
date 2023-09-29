import * as ActionTypes from '../types'
import {PayloadAction} from "@reduxjs/toolkit";
export const loading = (state = false, action:PayloadAction<boolean>) => {
    const { type } = action;
    switch (type) {
        case ActionTypes.IS_LOADING:
            return action.payload;
        default:
            return state;
    }
};
