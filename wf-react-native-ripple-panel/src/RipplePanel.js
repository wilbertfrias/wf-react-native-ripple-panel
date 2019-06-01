import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Animated, Easing } from 'react-native';

import BaseState from './BaseState';

export default class RipplePanel extends React.Component
{
    
    static defaultProps = {
        rippleColor:'black',
        zIndex:0,
        animationTime:5000,

        secondaryPanel:null,
        showSecondaryPanel: false,
    }

    constructor(props)
    {
        var myBaseState = BaseState();

        super(props);

        this.propsTypes = propsTypes;

        this.state={
           ...myBaseState,
        }

        this.onLongPress  = this.onLongPress.bind(this);

        this.onPressedOut = this.onPressedOut.bind(this);

        this.setLocation  = this.setLocation.bind(this);

        this.setSize      = this.setSize.bind(this);
        
        this.setRadius    = this.setRadius.bind(this);
    }
    
    render()
    {
        return(

            <TouchableOpacity
            
            style={styles.button}

            activeOpacity={1} 
            
            pointerEvents="none"

            onLongPress={(e)=>{
                this.onLongPress(e.nativeEvent);
            }}
            
            onPressOut={this.onPressedOut}
            >
                <View style={{...styles.subview}} pointerEvents="none" onLayout={(event)=>this.setSize(event)}>
                    
                    {(this.props.showSecondaryPanel && this.state.showSecondaryPanel)?null:this.props.children}
                    {(this.props.showSecondaryPanel && this.state.showSecondaryPanel && (this.props.secondaryPanel))? (this.props.secondaryPanel): null }
                    {(!(this.props.showSecondaryPanel && this.state.showSecondaryPanel))?this.renderRippleView():null}

                </View>
            </TouchableOpacity>
        );
    }

    renderRippleView()
    {
        const {scaleValue, opacityValue, size} = this.state;

        const rippleSize = size;

        return(

            <Animated.View
            style={{
                position: 'absolute',
                top : this.state.locationY - size/2,
                left: this.state.locationX - size/2,
                width: rippleSize,
                height: rippleSize,
                borderRadius: rippleSize/2,
                transform: [
                    {scale: scaleValue},
                ],
                opacity: opacityValue,
                backgroundColor: this.props.rippleColor,

                ...(this.props.zIndex)?
                {
                    zIndex:this.props.zIndex,
                    elevation:this.props.zIndex
                }:null,
                
            }}/>
            
        );
    }

    /**Called onLongPressed
    *
    */
    onLongPress(nativeEvent)
    {
        this.setLocation(nativeEvent);
        this.setRadius();
        this.setState({ startTime: new Date()});

        this.state.opacityValue.setValue(this.state.maxOpacity);
        Animated.timing(this.state.scaleValue, {
            toValue: this.state.maxScale,
            duration: this.props.animationTime,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
        }).start(()=>{
            this.setState({ endTimeAnimation: new Date() });
            var transcurrentTime = this.state.endTimeAnimation - this.state.startTime;

            if(transcurrentTime>=this.props.animationTime)
            {
                if(this.props.secondaryPanel!=null)
                {
                    if(this.props.showSecondaryPanel)
                    {
                        this.setState({showSecondaryPanel:true});
                    }
                }
            }

        });
    }

    /**Called onPressedOut
     * 
     */
    onPressedOut()
    {
        Animated.timing(this.state.opacityValue, {
            toValue: 0,
        }).start(()=>{
            this.state.scaleValue.setValue(0.01);
            this.state.opacityValue.setValue(0);//Hide the "small bug"
            this.setState({ endTimeOnPressOut: new Date() });
        });
    }

    /**Gets the size from the (internal) View and sets it's values in the local state
     * 
     */
    setSize(event)
    {
        var { width, height } = event.nativeEvent.layout;
        this.setState({ width, height });
    }

    /**Sets the location for the ripple circle
    * 
    */
    setLocation(nativeEvent)
    {
        const {locationX, locationY}=nativeEvent;
        this.setState({ locationX, locationY });
    }

    /**Sets the radio for the ripple
     * Based on the size of the view and the onLongPressed position
     */
    setRadius()
    {
        const locX = this.state.locationX;
        const locY = this.state.locationY;

        const halfWidth  = this.state.width  /2;
        const halfHeight = this.state.height /2;

        const xComponent = (locX>halfWidth) ?locX:(this.state.width-locX);
        const yComponent = (locY>halfHeight)?locY:(this.state.height-locY);
        
        //calc the hypotenuse:
        const c = Math.sqrt( Math.pow(xComponent, 2) + Math.pow(yComponent, 2) );

        this.setState({size: c});

    }

}

const propsTypes = 
{
    rippleColor: PropTypes.string,
    zIndex: PropTypes.number,
    animationTime: PropTypes.number,
    secondaryPanel: PropTypes.element,
    showSecondaryPanel: PropTypes.bool,
}

const styles = {
button:
{
    opacity: 1,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor:"rgba(0,0,0,0)",
    flex:0
},
subview:
{
    flex:0
}
}
