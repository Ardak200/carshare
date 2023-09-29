import axios from "axios";
import * as ActionTypes from "../types";
import {Dispatch} from "redux";
export const setLoading = (loading:boolean) => ({
    type: ActionTypes.IS_LOADING,
    payload: loading,
});

export const getTransmissionOptions = (dispatch: Dispatch) => {
    axios.get(`${process.env.BASE_URL}/common/transmissionOptions`)
        .then(res=>{

        })

}