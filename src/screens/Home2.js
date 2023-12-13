import { StyleSheet, Text, View,TouchableOpacity,TextInput,Image, ScrollView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Header, Icon, Card,Button } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome from "react-native-vector-icons/FontAwesome5";

import { Avatar } from '@rneui/base';
import Slider1 from '../../assets/img/slider1.png';

const Home2 = () => {
  return (
    
    <SafeAreaProvider style={styles.container}>
      
      <View 
      style={{
        flex:1,
        width:'100%',
        height:'100%',
      }}
      >
      <ScrollView>
    <Header backgroundColor='white'
      leftComponent={ <Avatar 
        rounded
        size={34}
        
        source={{
          uri: 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg'
        }}
        />}
      rightComponent={
          <View style={styles.headerRight}>
            <TouchableOpacity >
              <Icon name="description" color="#585858" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              
            >
              <Icon type="antdesign" name="rocket1" color="#585858" />
            </TouchableOpacity>
          </View>
      }
      centerComponent={{ text: 'Home', style: styles.heading }}
    />
       <View style={styles.customInputContainer} >
       
       <TextInput  
                   placeholder="Enter Your Email"
                   placeholderTextColor={'grey'}
                 
                   />
                    <TouchableOpacity style={{marginTop:10}}>
    <FontAwesome name='search' size={20} style={{color:'#02C38E'}} />
    </TouchableOpacity>
     
</View>

<View style={{marginVertical:-40}}>
          <Image
              style={{width:"95%",height:300,marginHorizontal:10}}
              resizeMode="contain"
              source={Slider1} 
            />
         
         </View>



         <Text style={[styles.heading,{marginVertical:10,textAlign:'left',marginHorizontal:20}]}>Health Services</Text>
      <View
        style={{
          flexDirection: 'row',
          
          marginBottom: 30,
          paddingHorizontal:20
          
        }}
      >
        <View style={{}}>
            <TouchableOpacity>
        <Avatar marginHorizontal={15}
          size={58}
          rounded
          icon={{ name: 'pencil', type: 'font-awesome' }}
          containerStyle={{ backgroundColor: '#02C38E' }}
        />
        
        <Text style={styles.categoryText}>Muscle Build</Text>
        </TouchableOpacity>
        </View>

        <View style={{}}>
        <TouchableOpacity>
        <Avatar marginHorizontal={15}
          size={58}
          rounded
          icon={{ name: 'rowing' }}
          containerStyle={{ backgroundColor: '#02C38E' }}
        />
        <Text style={styles.categoryText}>Fat Loss</Text>
        </TouchableOpacity>
          </View>


          <View style={{}}>
          <TouchableOpacity>
        <Avatar marginHorizontal={15}
          size={58}
          rounded
          icon={{ name: 'heartbeat', type: 'font-awesome' }}
          containerStyle={{ backgroundColor: '#02C38E' }}
        />
        <Text style={styles.categoryText}>Cross Fit</Text>
        </TouchableOpacity>
        </View>


        <View style={{}}>
        <TouchableOpacity>
        <Avatar marginHorizontal={15}
          size={58}
          rounded
          icon={{ name: 'heartbeat', type: 'font-awesome' }}
          containerStyle={{ backgroundColor: '#02C38E' }}
        />
        <Text style={styles.categoryText}>S&C</Text>
        </TouchableOpacity>
        </View>
      </View>


      <View
        style={{
          flexDirection: 'row',
          
          marginBottom: 20,
          paddingHorizontal:20
        
        }}
      >
        <View style={{}}>
        <TouchableOpacity>
        <Avatar marginHorizontal={15}
          size={58}
          rounded
          icon={{ name: 'pencil', type: 'font-awesome' }}
          containerStyle={{ backgroundColor: '#02C38E' }}
        />
        <Text style={styles.categoryText}>Muscle Build</Text>
        </TouchableOpacity>
        </View>

        <View style={{}}>
        <TouchableOpacity>
        <Avatar marginHorizontal={15}
          size={58}
          rounded
          icon={{ name: 'rowing' }}
          containerStyle={{ backgroundColor: '#02C38E' }}
        />
        <Text style={styles.categoryText}>Fat Loss</Text>
        </TouchableOpacity>
        </View>

        <View style={{}}>
        <TouchableOpacity>
        <Avatar marginHorizontal={15}
          size={58}
          rounded
          icon={{ name: 'heartbeat', type: 'font-awesome' }}
          containerStyle={{ backgroundColor: '#02C38E' }}
        />
        <Text style={styles.categoryText}>Cross Fit</Text>
        </TouchableOpacity>
         </View>

         <View style={{}}>
         <TouchableOpacity>
        <Avatar marginHorizontal={15}
          size={58}
          rounded
          icon={{ name: 'heartbeat', type: 'font-awesome' }}
          containerStyle={{ backgroundColor: '#02C38E' }}
        />
        <Text style={styles.categoryText}>S&C</Text>
        </TouchableOpacity>
        </View>
      </View>

      <Text style={[styles.heading,{marginVertical:10,textAlign:'left',marginHorizontal:20}]}>Personal Coaches</Text>


<ScrollView
horizontal={true}
showsHorizontalScrollIndicator={false}
>
      <Card >
      <View style={{display: "flex",width:200}}>
          <Card.Image
            style={{ padding: 0,width: '100%', }}
            source={{
              uri:
                'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
            }}
          />
           <Card.Title style={styles.coachname}>David S</Card.Title>
           <Card.Title style={styles.coachcategory}> 
           Yoga

          
           
           </Card.Title>

      
           <Text style={{textAlign:'center',fontWeight:'bold'}}>Ratings: 4.0</Text>







         
          {/* <Card.Divider /> */}
          <View 
          style={{
          flexDirection: 'row',
          margin:20,
          justifyContent:'space-evenly'
                }}
          >
         
          <Avatar 
           
           size={14}
           rounded
           icon={{ name: 'star', type: 'font-awesome' }}
           containerStyle={{ backgroundColor: '#E7AB2B' }}
         />

<Avatar 
           
           size={14}
           rounded
           icon={{ name: 'star', type: 'font-awesome' }}
           containerStyle={{ backgroundColor: '#E7AB2B' }}
         />

<Avatar 
        
           
           size={14}
           rounded
           icon={{ name: 'star', type: 'font-awesome' }}
           containerStyle={{ backgroundColor: '#E7AB2B' }}
         />



<Avatar 
           
           size={14}
           rounded
           icon={{ name: 'star', type: 'font-awesome' }}
           containerStyle={{ backgroundColor: '#E7AB2B' }}
         />






          </View>
          {/* <Button
            icon={
              <Icon
                name="code"
                color="#ffffff"
                iconStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="VIEW NOW"
          /> */}


          </View>
        </Card>


        <Card >
      <View style={{display: "flex",width:200}}>
          <Card.Image
            style={{ padding: 0,width: '100%', }}
            source={{
              uri:
                'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
            }}
          />
           <Card.Title style={styles.coachname}>David S</Card.Title>
           <Card.Title style={styles.coachcategory}> 
           Yoga

          
           
           </Card.Title>

      
           <Text style={{textAlign:'center',fontWeight:'bold'}}>Ratings: 4.0</Text>







         
          {/* <Card.Divider /> */}
          <View 
          style={{
          flexDirection: 'row',
          margin:20,
          justifyContent:'space-evenly'
                }}
          >
         
          <Avatar 
           
           size={14}
           rounded
           icon={{ name: 'star', type: 'font-awesome' }}
           containerStyle={{ backgroundColor: '#E7AB2B' }}
         />

<Avatar 
           
           size={14}
           rounded
           icon={{ name: 'star', type: 'font-awesome' }}
           containerStyle={{ backgroundColor: '#E7AB2B' }}
         />

<Avatar 
        
           
           size={14}
           rounded
           icon={{ name: 'star', type: 'font-awesome' }}
           containerStyle={{ backgroundColor: '#E7AB2B' }}
         />



<Avatar 
           
           size={14}
           rounded
           icon={{ name: 'star', type: 'font-awesome' }}
           containerStyle={{ backgroundColor: '#E7AB2B' }}
         />






          </View>
          {/* <Button
            icon={
              <Icon
                name="code"
                color="#ffffff"
                iconStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="VIEW NOW"
          /> */}


          </View>
        </Card>






        </ScrollView>









      
      </ScrollView>

      </View>
  </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f6fbf6',

   
},
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
  },
  heading: {
    // color: '#585858',
    color:'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  customInputContainer: {
    
    marginHorizontal:10,
    borderWidth: 1,
    borderColor: '#02C38E',
    height: 45,
    backgroundColor:'#fff',
    paddingHorizontal:15,
    paddingVertical:0,
    borderRadius:10,
    marginBottom:1,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent:'space-between'
},
categoryText:{
  marginLeft:3,
  marginTop:10,
  fontSize:12,
  textAlign:'center',
  fontWeight:'500'
},
coachname:{
  marginVertical:20,
  fontSize:20,
  color: '#02C38E',
},
coachcategory:{
  fontSize:14,
 
  
},
coachrating:{
  fontSize:14,
  
  
}

  });
  
  export default Home2;