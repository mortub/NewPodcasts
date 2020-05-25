import React from 'react';
import {Text} from 'react-native';
//components
import { timePassedFormat } from '../../utils/Calculations';

const TimePassedText = ({position}) =>{
    return(
        <Text style={{paddingStart:5, paddingTop:5}}>{timePassedFormat(position)}</Text>
    )
};

export default TimePassedText;