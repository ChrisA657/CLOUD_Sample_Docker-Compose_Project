import axios from "axios"
import apiURL from "./APIURL"

const apiEndpoint = apiURL + "orders"
const apiConfig = {
    headers: {
        Authorization: "me"
    }

}

//get the orders associated with a user, used for dashboard
export const getOrders = (user_id) => {
    axios.get(`${apiEndpoint}/${user_id}`, apiConfig);
}

// should check authorization to make sure farmer id is the same on the order
export const markOrderAsCompleted = (orderId) => {
    axios.patch(`${apiEndpoint}/${orderId}`, { fulfilled: true }, apiConfig);
}