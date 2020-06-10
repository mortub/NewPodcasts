import React from 'react';
import {Text} from 'react-native';
//components
import { timePassedFormat } from '../../utils/Calculations';
import { Styles } from '../../theme/Styles';

const TimePassedText = ({position}) =>{
    return(
        <Text style={{paddingStart:5, paddingTop:5, color:Styles.secondColor}}>{timePassedFormat(position)}</Text>
    )
};

export default TimePassedText;