// This is used to edit the items belonging to farms

const apiEndpoint = apiURL + "farms"
const apiConfig = {
    headers: {
        Authorization: "me"
    }

}

//MAke sure the farmer can't add the same item twice, it hsould update stock ?


export const getFarmItems = (farmId, params) => {
    let _apiConfig = apiConfig;
    if(params) {
        _apiConfig.params = params;
    }
    axios.get(`${apiEndpoint}/${farmId}/items`, _apiConfig)
}

export const addItemToFarm = (farmId, itemId) => {
    axios.post(`${apiEndpoint}/${farmId}/items`, {farmId, itemId}, apiConfig)
}
export const editFarmItem = (farmId, itemId, data) => {
    axios.patch(`${apiEndpoint}/${farmId}/items/${itemId}`, {farmId, itemId, data}, apiConfig)
}

export const deleteItemFromFarm = (farmId, itemId) => {
    axios.delete(`${apiEndpoint}/${farmId}/items/${itemId}`, apiConfig)
}