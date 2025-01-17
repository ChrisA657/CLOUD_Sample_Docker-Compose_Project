import apiURL from "./APIURL"
import axios from "axios";
const apiEndpoint = apiURL + "event"
const apiConfig = {
    headers: {
        Authorization: "me"
    }

}

//create an new event, should have a farmId(get the farm name with the id and store it in the record), title, description, a time, and an image
export const createEvent = (info) => {

        return axios.post(`${apiEndpoint}/`, info, apiConfig)

    }
    // get a specific event info, should return (title, description, location, time, image)
export const getEventById = (id) => {
    return axios.get(`${apiEndpoint}/${id}`, apiConfig)
}

// update event info
export const updateEventById = (eventInfo) => {
    console.log(eventInfo)
    return axios.put(`${apiEndpoint}/${eventInfo.event_id}`, eventInfo, apiConfig)
}


export const deleteEventById = (id) => {
    return axios.delete(`${apiEndpoint}/${id}`, apiConfig)

}

export const getEventsByuser_id = (user_id) => {
    return axios.get(`${apiURL}userEvents/${user_id}`, apiConfig)
}