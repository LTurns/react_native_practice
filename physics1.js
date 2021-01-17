import Matter from "matter-js";
import RedSoap from './RedSoap'
import Girl from './Girl'
import Man from './Man';
import Constants from './Constants';
import LittleGirl from './LittleGirl';
import Couple from './Couple';

let tick = 0;
let pose = 0;
let pose2 = 0;
let pose3 = 0;
let pose4 = 0;
let pose5 = 0;

export const getRandom = (min, max) => {
    return Math.random() * (max - min) + min;
  };

export const getSqDistance = (birdX, birdY, objectX, objectY, objectWidth, objectHeight) => {
    if (birdX < objectX + objectWidth &&
      birdX + Constants.BIRD_WIDTH > objectX &&
      birdY < objectY + objectHeight &&
      birdY + Constants.BIRD_HEIGHT > objectY) {
       return true;
      }
    }
    
    export const distanceBetweenObjects = (birdX, birdY, objectX, objectY, objectWidth, objectHeight) => {
    
      if (objectX !== -1) {
        let distance = getSqDistance(birdX, birdY, objectX, objectY, objectWidth, objectHeight);
        return distance 
      }
    }

export const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const isHealthy = true;
exports.isHealthy


export const addBoy = (world, entities) => {
    
    let engine = entities.physics.engine;
    let bird = entities.bird.body;
    let boy1 = Matter.Bodies.rectangle(
        (Constants.MAX_WIDTH + (Constants.MAX_WIDTH) + Constants.MAX_WIDTH / 2), (Constants.MAX_HEIGHT - 400), Constants.WOMAN_WIDTH, Constants.WOMAN_HEIGHT, { isStatic: true })

    Matter.World.add(world, [boy1])

    entities["boy1"] = {
        body: boy1, pose: 1, renderer: Man, scored: false
    }
}

export const addGirl = (world, entities) => {
    let engine = entities.physics.engine;
    let girl1 = Matter.Bodies.rectangle(
        ((Constants.MAX_WIDTH + (Constants.MAX_WIDTH / 2)) + Constants.MAX_WIDTH / 2),  600, Constants.MAN_WIDTH, Constants.MAN_HEIGHT, { isStatic: true })
    
    Matter.World.add(world, [girl1])

    entities["girl1"] = {
        body: girl1, pose: 1, renderer: Girl, scored: false
    }
}

export const addCouple = (world, entities) => {
    let engine = entities.physics.engine;
    let couple = Matter.Bodies.rectangle(
        (Constants.MAX_WIDTH + (Constants.MAX_WIDTH / 2)), (Constants.MAX_HEIGHT - 600), Constants.BIRD_WIDTH, Constants.BIRD_HEIGHT, { isStatic: true })
    
    Matter.World.add(world, [couple])

    entities["couple"] = {
        body: couple, pose: 1, renderer: Couple, scored: false
    }
}


export const addSoap = (world, entities) => {

    let redsoap = Matter.Bodies.rectangle(
        (Constants.MAX_WIDTH + (Constants.MAX_WIDTH) * 3), (Constants.MAX_HEIGHT - 400), Constants.SOAP_WIDTH, Constants.SOAP_HEIGHT, { isStatic: true })

    Matter.World.add(world, [redsoap]); 

    entities["redsoap"] = {
        body: redsoap, renderer: RedSoap
    }
}

export const addMask = (world, entities) => {

    let mask = Matter.Bodies.rectangle(
        (Constants.MAX_WIDTH + (Constants.MAX_WIDTH) * 3), (Constants.MAX_HEIGHT - 400), Constants.SOAP_WIDTH, Constants.SOAP_HEIGHT, { isStatic: true })

    Matter.World.add(world, [mask]); 

    entities["mask"] = {
        body: mask, renderer: Mask
    }
}

export const addLittleGirl = (world, entities) => {
    let engine = entities.physics.engine;
    let littlegirl = Matter.Bodies.rectangle(
        (Constants.MAX_WIDTH + (Constants.MAX_WIDTH / 2)), (Constants.MAX_HEIGHT - 600), Constants.BIRD_WIDTH, Constants.BIRD_HEIGHT, { isStatic: true })
    
    Matter.World.add(world, [littlegirl])

    entities["littlegirl"] = {
        body: littlegirl, pose: 1, renderer: LittleGirl, scored: false
    }
}


const Physics = (entities, { touches, time, dispatch }) => {
    let engine = entities.physics.engine;
    let world = entities.physics.world;
    let bird = entities.bird.body;

    let hadTouches = false;
    touches.filter(t => t.type === "press").forEach(t => {
        if (!hadTouches){
            if (world.gravity.y === 0.0){
                world.gravity.y = 1.5;

                addBoy(world, entities);
                addGirl(world, entities);
                addCouple(world, entities);
                addSoap(world, entities);
                addLittleGirl(world, entities);
            }

            hadTouches = true;
            Matter.Body.setVelocity( bird, {
                x: bird.velocity.x,
                y: -10
            });
        }
    });

    Matter.Engine.update(engine, time.delta);

    Object.keys(entities).forEach(key => {

        if (key.indexOf('bird') === 0) {
            if (entities[key].body.position.y <= -10) {
              dispatch({type: 'game-over'});
            } else if (entities[key].body.position.y >= Constants.MAX_HEIGHT + 10) {
              dispatch({type: 'game-over'});
            }
          }

        if (key.indexOf("boy1") === 0 && entities.hasOwnProperty(key)){
            Matter.Body.translate(entities[key].body, {x: -5, y: 0});

            if (entities[key].body.position.x <= bird.position.x && !entities[key].scored){
                entities[key].scored = true;
                dispatch({ type: "score" });
            }

            if (entities["boy1"].body.position.x <= -1){
                delete(entities["boy1"]);
                addBoy(world, entities);
            }

            if (tick % 7 === 0){
                pose2 = pose2 + 1;
        
                if (pose2 > 5){
                    pose2 = 1;
                }
                entities.boy1.pose = pose2;
            }

            if (distanceBetweenObjects(bird.position.x, bird.position.y, entities["boy1"].body.position.x, entities["boy1"].body.position.y, Constants.MAN_WIDTH, Constants.MAN_HEIGHT) === true){
                dispatch({type: 'health'});
                Matter.Body.setPosition(entities["boy1"].body, { x: Constants.MAX_WIDTH + 200, y: getRandom(350, Constants.MAX_HEIGHT - 400) })
            }
        }

    
        if (key.indexOf("girl1") === 0 && entities.hasOwnProperty(key)){
            Matter.Body.translate(entities[key].body, {x: -7, y: 0});

            if (entities[key].body.position.x <= bird.position.x && !entities[key].scored){
                entities[key].scored = true;
                dispatch({ type: "score" });
            }

            if (entities["girl1"].body.position.x <= -1){
                delete(entities["girl1"]);
                addGirl(world, entities);
            }

            if (tick % 7 === 0){
                pose3 = pose3 + 1;
        
                if (pose3 > 5){
                    pose3 = 1;
                }
                entities.girl1.pose = pose3;
            }

            if (distanceBetweenObjects(bird.position.x, bird.position.y, entities["girl1"].body.position.x, entities["girl1"].body.position.y, Constants.MAN_WIDTH, Constants.MAN_HEIGHT) === true){
                dispatch({type: 'health'});
                Matter.Body.setPosition(entities["girl1"].body, { x: Constants.MAX_WIDTH + Constants.MAX_WIDTH / 2, y: getRandom(500, Constants.MAX_HEIGHT - 150) })
            }

           

        } if (key.indexOf("couple") === 0 && entities.hasOwnProperty(key)){
            Matter.Body.translate(entities[key].body, {x: -6, y: 0});

            if (entities[key].body.position.x <= bird.position.x && !entities[key].scored){
                entities[key].scored = true;
                dispatch({ type: "score" });
            }

         
            if (entities["couple"].body.position.x <= -1){
                delete(entities["couple"]);
                addCouple(world, entities);
            }

            if (tick % 7 === 0){
                pose4 = pose4 + 1;
        
                if (pose4 > 4){
                    pose4 = 1;
                }
                entities.couple.pose = pose4;
            }

            if (distanceBetweenObjects(bird.position.x, bird.position.y, entities["couple"].body.position.x, entities["couple"].body.position.y, Constants.MAN_WIDTH, Constants.MAN_HEIGHT) === true){
                dispatch({type: 'health'});
                Matter.Body.setPosition(entities[key].body, { x: Constants.MAX_WIDTH + Constants.MAX_WIDTH / 2, y: getRandom(500, Constants.MAX_HEIGHT - 150) })
            }
    } if (key.indexOf("littlegirl") === 0 && entities.hasOwnProperty(key)){
        Matter.Body.translate(entities[key].body, {x: -4, y: 0});

        if (entities[key].body.position.x <= bird.position.x && !entities[key].scored){
            entities[key].scored = true;
            dispatch({ type: "score" });
        }

     
        if (entities["littlegirl"].body.position.x <= -1){
            delete(entities["littlegirl"]);
            addLittleGirl(world, entities);
        }

        if (tick % 8 === 0){
            pose5 = pose5 + 1;
    
            if (pose5 > 4){
                pose5 = 1;
            }
            entities.littlegirl.pose = pose5;
        }

        if (distanceBetweenObjects(bird.position.x, bird.position.y, entities["littlegirl"].body.position.x, entities["littlegirl"].body.position.y, Constants.MAN_WIDTH, Constants.MAN_HEIGHT) === true){
            dispatch({type: 'health'});
            Matter.Body.setPosition(entities[key].body, { x: Constants.MAX_WIDTH + Constants.MAX_WIDTH / 2, y: getRandom(500, Constants.MAX_HEIGHT - 150) })
        }
    }

        if (key.indexOf("redsoap") === 0 && entities.hasOwnProperty(key)){
            Matter.Body.translate(entities[key].body, {x: -4, y: 0});

         
            if (entities["redsoap"].body.position.x <= -1){
                delete(entities["redsoap"]);
                addSoap(world, entities);
            }

            if (distanceBetweenObjects(bird.position.x, bird.position.y, entities["redsoap"].body.position.x, entities["redsoap"].body.position.y, Constants.MAN_WIDTH, Constants.MAN_HEIGHT) === true){
                dispatch({type: 'restore-health'});
                Matter.Body.setPosition(entities["redsoap"].body, { x: Constants.MAX_WIDTH + Constants.MAX_WIDTH, y: getRandom(700, Constants.MAX_HEIGHT - 150) })
            }

        } if (key.indexOf("floor") === 0){
                if (entities[key].body.position.x <= -1 * (Constants.MAX_WIDTH / 2)){
                    Matter.Body.setPosition( entities[key].body, {x: Constants.MAX_WIDTH + (Constants.MAX_WIDTH / 2), y: entities[key].body.position.y});
                } else {
                    Matter.Body.translate( entities[key].body, {x: -4, y: 0});
                }
            }
        });


    

    tick += 1;

    if (tick % 5 === 0){
        pose = pose + 1;

        if (pose > 4){
            pose = 1;
        }
        entities.bird.pose = pose;
    }

    return entities;
};

export default Physics;
