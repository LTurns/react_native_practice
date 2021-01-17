import React from 'react';
import SpriteSheet from 'rn-sprite-sheet';
import Constants from './Constants';
import {
  View,
  Button,
} from 'react-native';

export default class BorisSprite extends React.Component {
  state = {
    loop: true,
    resetAfterFinish: false,
    fps: '10'
  };

  render() {
    const { fps, loop, resetAfterFinish } = this.state;
    const width = Constants.BIRD_WIDTH;
    const height = Constants.BIRD_HEIGHT;
    // const x = Constants.MAX_WIDTH / 2 - Constants.BIRD_WIDTH / 2;
    // const y = this.props.body.position.y - height / 2;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <SpriteSheet
              ref={ref => (this.bird = ref)}
              source={require('./assets/img/boris_sprite_sheet.png')}
              columns={4}
              rows={1}
              width={Constants.BIRD_WIDTH}
              height={Constants.BIRD_HEIGHT} // set either, none, but not both
              // width={40}
              animations={{
                walk: [0, 1, 2, 3 ],
                // appear: Array.from({ length: 15 }, (v, i) => i + 18),
                // die: Array.from({ length: 21 }, (v, i) => i + 33)
              }}
            />
            <Button onPress={() => this.play('walk')} title="walk" />
            </View>
    );
  }

  play = type => {
    const { fps, loop, resetAfterFinish } = this.state;

    this.bird.play({
      type,
      fps: Number(fps),
      loop: loop,
      resetAfterFinish: resetAfterFinish,
      // onFinish: () => console.log('hi')
    });
  };

  // stop = () => {
  //   this.boris.stop(() => console.log('stopped'));
  // };
}

