import React, { Component } from 'react';
import { StyleSheet, Text, View,   Animated, StatusBar, Alert, TouchableOpacity, Image } from 'react-native';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Bird from './components/Boris';
import Physics from './physics1';
import Constants from './Constants';
import Floor from './Floor';
import Images from './assets/Images';
// import Timer from './Timer';

export default class App extends Component {
    _isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            running: true,
            health: 0, 
            score: 0
        };

        this.gameEngine = null;

        this.entities = this.setupWorld();

        componentDidMount = () => {
            this._isMounted = true;
            this.setState({
                health: this.state.health,
                count: this.state.count,
                running: this.state.running
              });
            const Images = Images
          }
        
          componentWillUnmount = () => {
            this._isMounted = false;
          }
    }

    setupWorld = () => {

        let engine = Matter.Engine.create({ enableSleeping: false });
        let world = engine.world;
        world.gravity.y = 0.0;

        let bird = Matter.Bodies.rectangle( Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT / 2, Constants.BIRD_WIDTH, Constants.BIRD_HEIGHT)

        let boy1 = Matter.Bodies.rectangle(
            (Constants.MAX_WIDTH + (Constants.MAX_WIDTH) + Constants.MAX_WIDTH / 2), (Constants.MAX_HEIGHT - 400), Constants.WOMAN_WIDTH, Constants.WOMAN_HEIGHT, { isStatic: true })

        let floor1 = Matter.Bodies.rectangle(
            Constants.MAX_WIDTH / 2,
            Constants.MAX_HEIGHT - 15,
            Constants.MAX_WIDTH + 4,
            90, { isStatic: true }
        );
        let floor2 = Matter.Bodies.rectangle(
            Constants.MAX_WIDTH + (Constants.MAX_WIDTH / 2),
            Constants.MAX_HEIGHT - 15,
            Constants.MAX_WIDTH + 4,
            90, { isStatic: true }
        );

        Matter.World.add(world, [bird, floor1, floor2]);

        // Matter.Events.on(engine, 'collisionStart', (event) => {
        //     this.gameEngine.dispatch({ type: "health"});
        // });

        return {
            physics: { engine: engine, world: world },
            bird: { body: bird, pose: 1, renderer: Bird},
            floor1: { body: floor1, renderer: Floor},
            floor2: { body: floor2, renderer: Floor},   
        }
    }

    onEvent = (e) => {
        if (e.type === "game-over"){
            this.setState({
                running: false,
            });
        } else if (e.type === "health"){
            this.setState({
                 health: this.state.health += 10,
            })

            if (this.state.health === 100) {
                this.gameEngine.dispatch({ type: "game-over"});
            } 
        } else if (e.type === "double-infection"){
            this.setState({
                    health: this.state.health += 10,
            })
            if (this.state.health === 100) {
                this.gameEngine.dispatch({ type: "game-over"});
            } 
        } else if (e.type === "restore-health"){
            if ( this.state.health != 0 ){
            this.setState({
                health: this.state.health -= 10
            })
            } else {
               this.state.health;
            }
        } else if (e.type === "score"){
            this.setState({
                score: this.state.score + 1
            })
        }
    }

    reset = () => {
        this.gameEngine.swap(this.setupWorld());
        this.setState({
            running: true,
            health: 0,
            score: 0
        });
    }

   
    render() {

        var fillHeight = (this.state.health)
          
        return (
            <View style={styles.container}>
                <Image source={Images.background} style={styles.backgroundImage} resizeMode="cover" />
                <GameEngine
                    ref={(ref) => { this.gameEngine = ref; }}
                    style={styles.gameContainer}
                    systems={[Physics]}
                    running={this.state.running}
                    onEvent={this.onEvent}
                    entities={this.entities}>
                </GameEngine>
            
                <Text style={styles.score_report}>Score: {this.state.score}</Text>
                <Text style={styles.tier_graph}>Tier</Text>
                <View style={styles.tier_numbers}>
                <Text style={styles.tier}>4</Text> 
                <Text style={styles.tier}>3</Text> 
                <Text style={styles.tier}>2</Text> 
                <Text style={styles.tier}>1</Text> 
                </View>
               <View style={[styles.background, this.props.backgroundStyle, this.props.style]}>
                <Animated.View style={[styles.fill, this.props.fillStyle, { height: fillHeight }]}
                />
                 </View>
                {!this.state.running && <TouchableOpacity style={styles.fullScreenButton} onPress={this.reset}>
                    <View style={styles.fullScreen}>
                        <Text style={styles.gameOverText}>Game Over</Text>
                        <Text style={styles.gameOverSubText}>Final Score: {this.state.score}</Text>
                    </View>
                </TouchableOpacity>}
                <Image resizeMode="stretch"
                source={Images.mask}
                style={{
                    position: "absolute",
                    left: 5,
                    bottom: 10,
                    width: 100,
                    height: 50,
                    transform: [{ rotate: '20deg' }]
                }}></Image> 
            </View>
        );
    }
}

const options = {
    container: {
      marginTop: 20,
      borderRadius: 5,
      width: 220,
      fontSize: 18,
      marginLeft: 5
    }
}

const styles = StyleSheet.create({
    rate: {

    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: Constants.MAX_WIDTH,
        height: Constants.MAX_HEIGHT, 
    },
    borisBounces: {
        color: 'black', 
        fontSize: 20, 
        top: 35,
        left: 15
    },
    gameContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    gameOverText: {
        color: 'white',
        fontSize: 48,
    },
    gameOverSubText: {
        color: 'white',
        fontSize: 24,
    },
    background: {
        top: Constants.MAX_HEIGHT / 10,
        backgroundColor: '#93DB70',
        width: 50,
        overflow: 'hidden',
        height: 100,
        left: Constants.MAX_WIDTH / 10 - 20, 
        transform: [{ rotate: '180deg' }]
      },
      fill: {
        backgroundColor: '#FF6347',
        height: 20
      },
    fullScreen: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    score: {
        // position: 'absolute',
        color: 'white',
        fontSize: 72,
        left: Constants.MAX_WIDTH / 2 - 20,
        textShadowColor: '#444444',
        textShadowOffset: { width: 2, height: 2},
        textShadowRadius: 2,
    },
    tier_numbers: {
        position: 'absolute',
        top: Constants.MAX_HEIGHT / 10 - 5, 
    },
    tier: {
      margin: 5
    },
    score_report: {
        position: 'absolute',
        color: 'white',
        fontSize: 20,
        top: Constants.MAX_HEIGHT / 16,
        left: Constants.MAX_WIDTH - 100,
        textShadowColor: '#444444',
        textShadowOffset: { width: 0, height: 1},
        textShadowRadius: 1,
    },
    tier_graph: {
        position: 'absolute',
        color: 'white',
        fontSize: 20,
        top: Constants.MAX_HEIGHT / 16,
        left: Constants.MAX_WIDTH / 10 - 20,
        textShadowColor: '#444444',
        textShadowOffset: { width: 0, height: 1},
        textShadowRadius: 1,
    },
    fullScreenButton: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1
    }
});