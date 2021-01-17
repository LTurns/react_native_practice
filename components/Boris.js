import React, { Component } from "react";
import { Animated } from "react-native";
import Images from '../assets/Images';
import Constants from '../Constants';

export default class Bird extends Component {
    constructor(props){
        super(props);

        this.animatedValue = new Animated.Value(this.props.body.velocity.y);
    }

    render() {
       const width = Constants.BIRD_WIDTH;
        const height = Constants.BIRD_HEIGHT;
        const x = Constants.MAX_WIDTH / 2 - Constants.BIRD_WIDTH / 2;
        const y = this.props.body.position.y - height / 2;

        this.animatedValue.setValue(this.props.body.velocity.y);
        let rotation = this.animatedValue.interpolate({
            inputRange: [-10, 0, 10, 20],
            outputRange: ['-20deg', '0deg', '15deg', '45deg'],
            extrapolate: 'clamp'
        })

        let image = Images['boris' + this.props.pose];

        return (
            <Animated.Image
                style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                    transform: [{ rotate: rotation }]
                }}
                resizeMode="stretch"
                source={image} />
    );
  }
}
