import { actiontypes } from "../actiontypes/actiontypes"

export const addNewCategories = (newData) => {
    return {
        type: actiontypes.ADD,
        payload: newData
    }
}

export const addNewAllCategories = (newData) => {
    return {
        type: actiontypes.ADDALL,
        payload: newData
    }
}



