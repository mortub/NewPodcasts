import React from 'react';
import {Text} from 'react-native';
//components
import { timePassedFormat } from '../../utils/Calculations';

const TimeLeftText = ({duration,position}) =>{
    return(
        <Text style={{paddingEnd:15, paddingTop:5}}>{timePassedFormat(duration-position)}</Text>  
    )
};

export default TimeLeftText;