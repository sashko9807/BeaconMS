import { useReducer } from "react";

export const ACTIONS = {
    BEGIN_DOWNLOAD: 'begin-download',
    SUCCESS: 'success',
    ERROR: 'error',
    HIDE_MODAL: 'hide_modal'
}

const initialState = {
    showResultModal: false,
    title: '',
    message: ''
}

const apiResultReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SUCCESS: {
            return {
                ...state,
                showResultModal: true,
                title: action.status,
                message: action.message
            }
        }
        case ACTIONS.ERROR: {
            return {
                ...state,
                showResultModal: true,
                title: action.status,
                message: action.message
            }
        }
        case ACTIONS.HIDE_MODAL: {
            return {
                ...state,
                ...initialState
            }
        }
    }
}


export const useApiResultReducer = (initState = initialState) => useReducer(apiResultReducer, initState);