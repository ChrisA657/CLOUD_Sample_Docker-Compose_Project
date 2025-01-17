import { Grid, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AddItemToCartDialog from '../AddItemToCartDialog/AddItemToCartDialog';
import EventCard from '../eventCard/EventCard';
import { ItemCard } from '../ItemCard/itemCard';

import './farmCard.css'
export const FarmCard = ({ farm, itemsPerFarm }) => {
    const [showAddItemDialog, setShowAddItemDialog] = useState();
    const [addItemDetails, setAddItemDetails] = useState();
    const [refresh, setRefresh] = useState(false);

    const handleSetItem = (item) => {
        setShowAddItemDialog(true);
        setAddItemDetails(item)
    }
    return (
        <>
            <Grid container
                  justifyContent={["center", "space-between"]}
                  spacing={2}>
                <Grid item xs={12} sm={12} md={6} justifyContent={"flex-end"}>
                    <Link to={'/farms/'+farm.farmId}>
                    <img src={farm.farmImage} id="farm-img" alt={farm.farmName} /></Link>
                </Grid>
                <Grid item sm={12} md={6} sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                <Link to={'/farms/'+farm.farmId}><div className="text-center fs-2 fw-bold mb-3 text-decoration-underline" >{farm.farmName}</div></Link>
                    <Typography component={'span'}>
                        <div className="farm-description text-muted">
                            
                            {farm.farmDescription}
                        </div>
                    </Typography>
                </Grid>


            </Grid>
            <Grid container textAlign={"center"}>

                <Typography variant='h4' fontWeight={"bold"} mt={4} mb={2} textAlign={"center"}>
                    Items for sale
                </Typography>
                <Grid container
                    spacing={2}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    mb={4}
                >
                    {
                        farm.items.map((item, index) => {
                            return index < itemsPerFarm ?
                                <Grid item xs={12} sm={6} md={4} lg={3} key={index} padding={0}>
                                    <ItemCard {...item}
                                        addText={"Add to cart"}
                                        action={item => handleSetItem(item)} />
                                </Grid> : null
                        })
                    }
                </Grid>
            </Grid>
            {
            farm.events.length != 0 && <Grid container textAlign={"center"}>
                <Typography variant='h4' fontWeight={"bold"} mt={4} mb={2} textAlign={"center"}>
                    Farm Events
                </Typography>
                <Grid container rowSpacing={1} columnSpacing={[0, 1]} sx={{ width: ["100%"] }}>
                {
                    farm.events.map((event) => {
                        return <Grid item sm={6} md={4} lg={3} width="100%">
                            <EventCard farmName={farm.farmName}
                                        setRefresh={setRefresh}
                                        farmer_id={event.farmer_id}
                                {...event} />
                        </Grid>
                    })
                }
            </Grid>
            </Grid>}
            {showAddItemDialog && <AddItemToCartDialog
                open={showAddItemDialog}
                setOpen={setShowAddItemDialog}
                {...addItemDetails} />}

        </>
    )
}