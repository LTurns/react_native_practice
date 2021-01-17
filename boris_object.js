const borisSprite = {
 name:"boris",
 size: {width: 220, height: 220},
 animationTypes: ['IDLE', 'WALK', 'EAT', 'CELEBRATE', 'DISGUST', 'ALL'],
 frames: [
   // require('./.png'),
   require('./boris_walking01.png'),
   require('./boris_walking02.png'),
   require('./boris_walking03.png'),
   require('./boris_walking04.png'),
 ],
 animationIndex: function getAnimationIndex (animationType) {
   switch (animationType) {
     case 'WALK':
       return [1,2,3,0];
     case 'EAT':
       // return [4,5,4,0];
     case 'CELEBRATE':
       // return [6,7,6,0,6,7,6,0];
     case 'DISGUST':
       // return [0,8,8,8,8,0];
     case 'ALL':
       // return [0,1,2,3,4,5,6,7,8];
   }
 },
};

export default borisSprite;