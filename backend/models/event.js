const knex = require('../database/knex');

const EVENT_TABLE = 'event';

const getFarmEvents = async (farmer_id) => {
    const query = knex(EVENT_TABLE).select().where('farmer_id', farmer_id);
    return query;
}

//create new event
const createEvent = async (event_name, event_description, event_image_url, farmer_id, date, time) => {
    const query = knex('event').insert({ event_name, event_description, event_image_url, farmer_id, date, time });
    console.log('Raw query for createEvent:', query.toString());
    const result = await query;
    return result;
};

//edit event
const updateEvent = async(event_id, event_name,event_description, event_image_url,farmer_id,date,time) => {
    const query = knex(EVENT_TABLE).where('event_id', event_id).update({event_name}).update({event_description}).update({event_image_url}).update({farmer_id}).update({date}).update({time});
    return query;
}

//find event by name
const findEventByName = async (event_name) => {
    const query = knex('event').where({ event_name });
    const result = await query;
    return result;
}
//delete event
const deleteEvent = async (event_id) => {
    const query = knex('event').where({event_id}).del();
    console.log('Raw query for delete event:', query.toString());
    const result = await query;
    return result;
};




module.exports = {

    createEvent,
    findEventByName,
    deleteEvent,
    updateEvent,


    getFarmEvents
};


