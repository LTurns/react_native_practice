import React, { Component } from "react";
import { View, Image, Animated } from "react-native";
import Images from "./assets/Images";
import Constants from './Constants';

export default class Pipe extends Component {

    constructor(props){
        super(props);

        this.animatedValue = new Animated.Value(this.props.body.velocity.y);
    }

    render() {
        const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
        const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;

        const pipeRatio = Constants.BIRD_WIDTH; // 160 is the original image size
        const pipeHeight = Constants.BIRD_HEIGHT;
        const pipeIterations = Math.ceil(height / pipeHeight);

        let image = Images['redsoap'];

        return (
           <Animated.Image
                style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                    flexDirection: 'column'
                }}
              resizeMode="stretch"
                source={image} >
            </Animated.Image>
        );
    }
}
