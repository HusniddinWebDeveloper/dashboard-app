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

export const getLocalData = (newData) => {
    // console.log(newData.allCategories[0].img1.props?)
    return {
        type: actiontypes.GETLOCALSER,
        payload: newData
    }
}




