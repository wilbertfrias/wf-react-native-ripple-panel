import { Animated } from 'react-native';

export const maxOpacity = 0.12;
export const maxScale   = 2;
        
const BaseState=()=>{
    return({
        maxOpacity,
        maxScale,
        scaleValue: new Animated.Value(0.01),
        opacityValue: new Animated.Value(maxOpacity),
    
        size:1,

        locationX:0,
        locationY:0,

        width:0,
        height:0,

        showSecondaryPanel:false,
        
        startTime:0,
        endTimeAnimation:0,
        endTimeOnPressOut:0,        
    });
            
}

export default BaseState;
