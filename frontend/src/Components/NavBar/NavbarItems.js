import React from "react"
import * as FaIcons from 'react-icons/fa';
import {GiCardAceSpades} from 'react-icons/gi';
export const NavbarItems = [
    {
        title:'Hotels',
        icon: <FaIcons.FaHotel/>,
        path:'/Hotels'
    },
    {
        title:'Dining',
        icon: <FaIcons.FaUtensils/>,
        path:'/Dining'
    },
    {
        title:'Attractions',
        icon: <FaIcons.FaSistrix/>,
        path:'/Attractions'
    },
    {
        title:'Relaxation',
        icon: <FaIcons.FaUmbrellaBeach/>,
        path:'/Relaxation'
    },
    {
        title:'Entertainment',
        icon: <GiCardAceSpades/>,
        path:'/Entertainent'
    }
]

export const NavbarMobileItems = [
    
]