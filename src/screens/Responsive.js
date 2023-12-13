import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React,{useEffect,useState} from 'react'

// const height = Dimensions.get("screen").width;
// console.log(height);

const {height,width} = Dimensions.get('screen');

const Responsive = () => {

    const [isRotate, setIsRotate] = useState(false);

    useEffect(()  => {

    Dimensions.addEventListener("change",() => {

        const orientation = isPotrait();

        setIsRotate(orientation);
        console.log(orientation);
    })
        return () => {}
    }, []);

    const isPotrait = () => {
        const [height, width] = Dimensions.get('screen');

        return height > width ? "false" : "true"
    }
console.log(isRotate);
  return (
    <View 
    style={{
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'black',
        flex:1,
        // flexDirection:'row',
        flexDirection: isRotate ? "row" : "column",
   
    }}
    >
    <View style={{
        // height:height/2,
        flex:1,
        backgroundColor:'red',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        height:height,
        
        
        }}>
<Text> Hello </Text>
        </View>
    <View style={{
        // height:height/2,
        flex:1,
        backgroundColor:'yellow',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        height:height,
        
        }}>
            <Text>World</Text>
        </View>


        <View style={{
        // height:height/2,
        flex:1,
        backgroundColor:'green',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        height:height,
        
        
        }}>
            <Text>World</Text>
        </View>



    </View>
    
  )
}


const styles = StyleSheet.create({})

export default Responsive
