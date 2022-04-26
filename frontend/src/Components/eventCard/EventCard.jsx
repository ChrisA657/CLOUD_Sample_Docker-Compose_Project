import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { Button, CardActions,  } from '@mui/material';

import './EventCard.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext';
import { EventContext } from '../EventContext';
import CreateEventDialog from '../CreateEventDialog/CreateEventDialog';
import RegisterToEventDialog from '../RegisterToEventDialog/RegisterToEventDialog';
import { getFarmById } from '../../api/farms';
const EventCard = ({ event_name, event_description, event_id, farmName, event_image_url, time, date, setEvents, hideButton, farmer_id, isEdit, setRefresh }) => {
    console.log(farmer_id);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openAddOrRemoveDialog, setOpenAddOrRemoveDialog] = useState(false);
    
    const [ownerId, setOwnerId] = useState(null);
    const eventContext = useContext(EventContext);
    const userContext = useContext(UserContext);
    const fDate = new Date(date + " " + time);

    useEffect(()=>{
        if(farmer_id){
            getFarmById(farmer_id).then(res => {
            setOwnerId(res.data.farmInfo[0].owner_id);
        });
        }
        
        
    },[])

    // const handleUnsubscribe = () => {
    //     setDeleting(true);

    //     setTimeout(() => {
    //         eventContext.setEvents((events) =>{
    //             let indexToRemove = events.findIndex(event => event_id == event.event_id);
    //             return events.filter((e,index)=> index != indexToRemove);
    //         })
    //         setDeleting(false);
    //         setDeletingCompleted(true);
    //         setTimeout(() => {
    //             setOpenRemoveDialog(false);
    //             setDeleting(false);
    //             setDeletingCompleted(false);
    //         }, 2000)
    //     }, 1000)

    // }
    const handleAction = () => {
        console.log(openAddOrRemoveDialog)
        if (ownerId == userContext.userData?.user_id) {
            setOpenEditDialog(true);
        } else {
            setOpenAddOrRemoveDialog(true);
        }
    }
    return (
        <Card variant="outlined" sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "2px 2px 7px #888" }} >
            <CardMedia alignItems="center">
                <Link to={`/event/${event_id}`}><img src={event_image_url} id="event-card-image" /></Link>
            </CardMedia>

            <CardContent sx={{ textAlign: ["left"], width: "100%", flexGrow: 1, height: "fit-content", display: "flex", flexDirection: 'column', justifyContent: "space-between" }} >
                <div style={{ width: "100%" }}>
                    <Typography gutterBottom variant="h5" component="div" align="start" >
                        {event_name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary"><div id="event-card-event_description">
                        {event_description}</div>
                    </Typography>
                </div>
                <div>
                    <Typography gutterBottom variant="h7" component="div" fontWeight="600" align="start" >
                        Location: {farmName}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div" fontWeight="600" align="start" >
                        Date: {fDate.toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        })}
                    </Typography>

                </div>
            </CardContent>

            <CardActions>
                {!hideButton && <Button
                    variant="contained"
                    size="small"
                    color={ownerId == userContext.userData?.user_id ? "error" : "primary"}
                    fullWidth sx={{ padding: [2, 2, 1] }}
                    onClick={() => handleAction()}>
                    {ownerId == userContext.userData?.user_id ? "Edit Event" : eventContext?.events?.some(e => e.event_id == event_id) ? "Unsubscribe" : "RSVP"}
                </Button>}
            </CardActions>
            {
                openEditDialog && <CreateEventDialog
                    open={openEditDialog}
                    setOpen={setOpenEditDialog}
                    event_name={event_name}
                    event_description={event_description}
                    event_image_url={event_image_url}
                    date={date}
                    time={time}
                    event_id={event_id}
                    farmer_id={farmer_id}
                    farmName={farmName}
                    showDelete={true}
                    setRefresh={setRefresh} />
            }

            {
                openAddOrRemoveDialog && <RegisterToEventDialog
                                            open={openAddOrRemoveDialog}
                                            setOpen={setOpenAddOrRemoveDialog}
                                            event_name={event_name}
                                            event_description={event_description}
                                            event_image_url={event_image_url}
                                            date={date}
                                            time={time}
                                            event_id={event_id}
                                            farmer_id={farmer_id}
                                            farmName={farmName}
                                            unregistering={eventContext?.events.some(e => e.event_id == event_id)} />
            }
            {/* {
                openRemoveDialog && <Backdrop
                    sx={{ flexDirection: "column", alignItems: "center", color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}>
                    {
                        !deleting && !deletingCompleted && <Dialog classes={{ root: { alignItems: "center", backgroundColor: "Blue" } }} open={true} onClose={handleClose}>
                            <DialogTitle sx={{ textAlign: "center", fontWeight: "Bold" }}>Confirm Unsubscription</DialogTitle>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleUnsubscribe}>Confirm</Button>
                            </DialogActions>
                        </Dialog>
                    }
                    {
                        deleting && <CircularProgress color="inherit" />

                    }
                    {
                        deletingCompleted && <Dialog classes={{ root: { alignItems: "center", backgroundColor: "Blue" } }} open={true} onClose={handleClose}>
                            <DialogTitle sx={{ textAlign: "center", fontWeight: "Bold" }}>Event Removed From Your Subscriptions</DialogTitle>
                            <DialogContent alignItems={"center"}>
                                <img id="add-item-success-icon" src={Checkmark}></img>
                            </DialogContent>

                        </Dialog>
                    }
                </Backdrop>
            } */}
        </Card >
    );
};

export default EventCard;