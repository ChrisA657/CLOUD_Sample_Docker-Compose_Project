import React, { useContext } from 'react';
import './OrderExpandable.css';
import { AiOutlineArrowDown } from 'react-icons/ai';
import Collapsible from 'react-collapsible';
import { UserContext } from '../userContext';
import { Button, Container, Divider, Grid, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { Box } from '@mui/material';

const OrderExpandable = ({ transaction_id, buyerName, farmName, purchasedDate, itemsPurchased, firstName, lastName, address, city, state, zip, fulfilled }) => {
    const userContext = useContext(UserContext);

    const buildItemString = () => {
        let items = [];
        itemsPurchased.forEach(item => {
            items.push(item.product_name + " (" + item.quantity + ")");
        });
        return items.join(', ')
    }
    return (
        <div>
            <Collapsible trigger={<span>Order #{transaction_id} <AiOutlineArrowDown className='Collapsible__triggericon' /></span>}>
                <div className="order-buyer-name">
                    <span>Buyer: </span>
                    {buyerName || "You"}
                </div>
                <div className="order-farm-name">
                    <span>Seller: </span>
                    {farmName || "Miracle Farms"}
                </div>
                <div className="order-date">
                    <span>Order Date: </span>
                    {new Date(purchasedDate).toLocaleString()}
                </div>
                
                <Collapsible trigger={<span>Items Purchased: {buildItemString()} <AiOutlineArrowDown className='Collapsible__triggericon' /></span>}>
                    <List>

                        {
                            itemsPurchased.map((item, index) => {
                                return <>
                                    <ListItem alignItems='center' key={index} sx={{ py: 1, px: 0, display: ["none", "flex"] }}>
                                        <ListItemText primary={<Typography variant='h6'>{item.product_name}</Typography>} secondary={<><div style={{ marginLeft: "6px" }}>{item.description}</div>
                                            <Stack sx={{ textAlign: "start", alignItems: "start", my: 1.5 }}>
                                                <Typography >Price: ${item.product_price}</Typography>
                                                <Typography >Quantity: {item.quantity}</Typography>
                                                <Typography sx={{ fontWeight: "bold", }}>Total: ${item.quantity * item.quantity}</Typography>
                                            </Stack>
                                        </>} />
                                        <img src={item.product_image_url} style={{ width: '35%', maxHeight: "200px", maxWidth: "320px", }} />
                                    </ListItem>

                                    <Container component="li" sx={{ display: ["flex", "none"], flexDirection: 'column' }}>
                                        <Typography sx={{ textAlign: "center" }}>{item.product_name}</Typography>
                                        <Typography variant='subtitle2' color={"text.secondary"} sx={{ textAlign: "center" }}>{item.product_description}</Typography>
                                        <img src={item.product_image_url} style={{ width: '100%', maxHeight: "200px", maxWidth: "320px", margin: "0 auto", display: "block" }} />
                                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} sx={{ my: 2 }}>
                                            <Stack sx={{ textAlign: "start", alignItems: "start" }}>
                                                <Typography sx={{}}>Price: ${item.product_price}</Typography>
                                                <Typography sx={{}}>Quantity: {item.quantity}</Typography>
                                                <Typography sx={{ fontWeight: "bold", }}>Total: ${item.product_price * item.quantity}</Typography>
                                            </Stack>
                                        </Box>
                                        <Divider variant='middle'></Divider>
                                    </Container>

                                </>
                            })
                        }
                    </List>
                </Collapsible>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" fontWeight={'bold'} gutterBottom sx={{ mt: 2 }}>
                        Address
                    </Typography>
                    <Typography gutterBottom>{firstName + ' ' + lastName}</Typography>
                    <Typography gutterBottom>{`${address}, ${city}, ${state}, ${zip}`}</Typography>
                </Grid>
                <div className={`order-fulfilled m-4 ${fulfilled ? 'alert alert-success' : 'alert alert-danger'}`}>
                    <span>Status: </span>
                    {
                        fulfilled ? 'Completed' : 'Pending'
                    }
                </div>

                {
                    userContext.userData.isFarmer ?
                        fulfilled ? null : <button className='btn btn-success float-end mb-4'>Mark as complete</button> : null
                }

            </Collapsible>
        </div>
    );
};

export default OrderExpandable;