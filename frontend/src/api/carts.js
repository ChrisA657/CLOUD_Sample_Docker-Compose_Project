// calls to add items to user carts

import axios from "axios"
import apiURL from "./APIURL"

const apiEndpoint = apiURL + "carts"
const apiConfig = {
    headers: {
        Authorization: "me"
    }

}

//expected return, list of items user has added to their cart
const getCart = (user_id) => {
    axios.get(`${apiEndpoint}/${user_id}`);
}

const deleteItemFromCart = (user_id, itemId) => {
    axios.delete(`${apiEndpoint}/${user_id}/${itemId}`)
}

// create an order from the items in the carts
// should remove the purchased # from the stock total of the item being bought
// should create seperate orders for items belonging to different farms
const checkout = (user_id) => {
    axios.post(`${apiEndpoint}/${user_id}`);
}