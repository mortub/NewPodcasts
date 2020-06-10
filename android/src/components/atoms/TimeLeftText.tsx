import React from 'react';
import {Text} from 'react-native';
//components
import { timePassedFormat } from '../../utils/Calculations';
import { Styles } from '../../theme/Styles';

const TimeLeftText = ({duration,position}) =>{
    return(
        <Text style={{paddingEnd:15, paddingTop:5,color:Styles.secondColor}}>{timePassedFormat(duration-position)}</Text>  
    )
};

export default TimeLeftText;