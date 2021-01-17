import React, { Component } from "react";
import { View, Image, Animated, TouchableOpacity } from "react-native";
import Images from "./assets/Images";
import Constants from './Constants';

export default class Pipe extends Component {

    constructor(props){
        super(props);

        this.animatedValue = new Animated.Value(this.props.body.velocity.y);
    }

    render() {
        const width = 100;
        const height = 100;
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;

        // const pipeRatio = Constants.BIRD_WIDTH; // 160 is the original image size
        // const pipeHeight = Constants.BIRD_HEIGHT;
        // const pipeIterations = Math.ceil(height / pipeHeight);

        let image = Images['bubble_man' + this.props.pose];

        return (
           <Animated.Image
                style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                    overflow: 'hidden',
                    flexDirection: 'column',
                    opacity: 0.7
                }}
              resizeMode="stretch"
                source={image} >
            </Animated.Image>
        );
    }
}
