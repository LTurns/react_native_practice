// import React, { Component } from "react";
// import { View,Text,Button,StyleSheet } from "react-native";
// const timer = () => {};
// class Timer extends Component {
//     constructor(props) {
//     super(props);
//     this.state = {
//       time: 0
//      };
//     }

//  countupTimer(){
//    this.setState({time:0 });
//    clearInterval(timer);
//    timer = setInterval(() =>{
//         // if(!this.state.time){
//         //   clearInterval(timer);
//         //   return false;
//         // }
//         this.setState(prevState =>{
//         return {time: prevState.time + 1}});
//         },1000);
//     }

//     render() {
//       return (
//        <View style={styles.container}>
//          <Text>Time :{this.state.time}</Text>
//           <Button title ="Start timer" onPress={()=>this.countupTimer()}/>
//        </View>
//      );
//    }
//   }


//   const styles = StyleSheet.create({
//     container:{
//      flex:1,
//      justifyContent:'center',
//      alignItems:'center',
//    } 
// });

//   export default Timer;