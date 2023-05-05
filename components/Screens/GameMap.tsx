import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Animated, View } from "react-native";
import Spawner, { Location } from "../../api/Spawner";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as PhoneLocation from "expo-location";
import * as Permissions from "expo-permissions";
import {mapStyle} from "../../global/GoogleMapStyle"

export default function GameMap({ path }: { path: string }) {


  const [locations, setLocations] = useState<Location[]>([]);
  const [errorMSG, setErrorMSG] = useState<string>("");
  const [userLocation, setUserLocation] = useState<Location>( {lat: 0, long: 0} as Location);
  const [markerScale] = useState(new Animated.Value(1));

  useEffect(() => {
  

    //get current location and update every 5 seconds
    
    setInterval(async () => {
      const userLocation = await PhoneLocation.getCurrentPositionAsync();

      setUserLocation({lat: userLocation.coords.latitude, long: userLocation.coords.longitude});

    }, 5000);
   
  
    getLocation();
    pulseMarker();
  }, []);

  const getLocation = async () => {
    try {
      const spawner = new Spawner("https://c904-89-23-224-32.ngrok-free.app");

      const { status } = await Permissions.askAsync(Permissions.LOCATION_BACKGROUND);
      if (status !== "granted") {
        setErrorMSG("Permission to access location was denied");
        return;
      }

      const userLocation = await PhoneLocation.getCurrentPositionAsync();
      const { latitude, longitude } = userLocation.coords;
      const fetchedLocations = await spawner.getLocation(latitude, longitude);
      setLocations(fetchedLocations);
    } catch (error) {
      console.error("Error fetching location:", error);
      setErrorMSG("Error fetching location");
    }
  };

// Animation for marker icon
const pulseMarker = () => {
  Animated.sequence([
    Animated.timing(markerScale, {
      toValue: 1.2,
      duration: 300,
      useNativeDriver: true,
    }),
    Animated.timing(markerScale, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }),
  ]).start(() => pulseMarker());
};



  return (
    <MapView style={styles.map} customMapStyle={mapStyle}>

      {locations.map((location, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: location.lat,
            longitude: location.long,
          }}
          title="test"
          description="test"
        >
          <MaterialIcons name="shield" size={30} color="red" />
        </Marker>
      ))}

      <Marker
      focusable={true}
      coordinate={{
        latitude:userLocation.lat, 
        longitude:userLocation.long}}
      >
     <Animated.View style={{ transform: [{ scale: markerScale }] }}>
          <MaterialIcons name="android" size={35} color="white"/>
        </Animated.View>
      </Marker>
    </MapView>
  );
}
const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
