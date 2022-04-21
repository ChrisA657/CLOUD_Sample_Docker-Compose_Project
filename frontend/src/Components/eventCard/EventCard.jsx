import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkmark from '../../images/green-checkmark.png';
import { Backdrop, Button, CardActionArea, CardActions, CircularProgress } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider, styled } from '@mui/material/styles';
import './EventCard.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext';
const EventCard = ({ name, description, eventId, farmName, farmId, image, time, date, hideButton }) => {

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deletingCompleted, setDeletingCompleted] = useState(false);
    const userContext = useContext(UserContext);
    const fDate = new Date(date + " " + time);

    const handleClose = () => {
        setOpenDeleteDialog(false);
    };

    const handleUnsubscribe = () => {
        setDeleting(true);

        setTimeout(() => {
            setDeleting(false);
            setDeletingCompleted(true);
            setTimeout(() => {
                setOpenDeleteDialog(false);
                setDeleting(false);
                setDeletingCompleted(false);
            }, 2000)
        }, 1000)

    }
    return (
        <Card variant="outlined" sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "2px 2px 7px #888" }} >
            <CardMedia alignItems="center">
                <Link to={`/event/${eventId}`}><img src={image} id="event-card-image" /></Link>
            </CardMedia>

            <CardContent sx={{ textAlign: ["left"], width: "100%", flexGrow: 1, height: "fit-content", display: "flex", flexDirection: 'column', justifyContent: "space-between" }} >
                <div style={{ width: "100%" }}>
                    <Typography gutterBottom variant="h5" component="div" align="start" >
                        {name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary"><div id="event-card-description">
                        {description}</div>
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
                    color="primary"
                    fullWidth sx={{ padding: [2, 2, 1] }}
                    onClick={() => setOpenDeleteDialog(true)}>
                    {"Unsubscribe"}
                </Button>}
            </CardActions>
            {
                openDeleteDialog && <Backdrop
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
            }
        </Card >
    );
};

export default EventCard;