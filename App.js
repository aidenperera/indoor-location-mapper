import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Permissions from "expo-permissions";

import locations from "./assets/data/locations.json";
class App extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    locations: locations,
  };

  async componentDidMount() {
    try {
      const { status } = await Permissions.getAsync(Permissions.LOCATION);
      if (status !== "granted") {
        const response = await Permissions.askAsync(Permissions.LOCATION);
      }
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) =>
          this.setState({ latitude, longitude }),
        (error) => console.log("Error:", error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
      const {
        locations: [sampleLocation],
      } = this.state;
    } catch (error) {}
  }

  // addCurrentLoc(){
  //   const test = {
  //     "name": "Independence Palace",
  //     "address": "135 Nam Kỳ Khởi Nghĩa, Phường Bến Thành, Quận 1, Hồ Chí Minh 700000",
  //     "coords": {
  //       "latitude": -35.675963,
  //       "longitude": 174.314797
  //     },
  //     "image_url": "https://media.glassdoor.com/l/de/cd/ae/b6/the-face-shop.jpg"
  //   },
  //   locations.push(test);
  // }

  drawMarkers() {
    return (
      <View>
        {locations.map((marker, index) => {
          <Marker
            coordinate={{ latitude: -35.676102, longitude: 174.314879 }}
            title={"ass"}
            description={"a"}
          />;
        })}
      </View>
    );
  }

  render() {
    const { latitude, longitude } = this.state;
    if (latitude) {
      return (
        <View style={{ flex: 0.95 }}>
          {/* //START:: MAPVIEW */}
          <MapView
            showsUserLocation
            style={{ flex: 1 }}
            initialRegion={{
              longitude,
              latitude,
              latitudeDelta: 0.0001,
              longitudeDelta: 0.0001,
            }}
          >
            {this.drawMarkers()}
          </MapView>
          {/* //END:: MAPVIEW */}
          <Button
            onPress={() => {
              console.log("OK");
            }}
            title="Add current location"
          ></Button>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>We need your permission!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 20,
  },
});

export default App;
