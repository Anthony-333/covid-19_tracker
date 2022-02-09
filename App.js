import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useFonts } from "@expo-google-fonts/inter";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getCountriesData = async () => {
    try {
      const response = await fetch("https://disease.sh/v3/covid-19/countries");
      const data = await response.json();
      const countries = data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2
      }))

      setCountries(countries);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCountriesData();
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} color="black" />;
  }

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar style="auto" />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 25,
            color: "#5F5F5F",
            fontWeight: "bold",
            fontFamily: "Poppins",
          }}
        >
          Covid-19 Tracker
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#C4C4C4",
            borderRadius: 10,
            width: 130,
            height: 50,
          }}
        >
          {isLoading ? <ActivityIndicator size={"large"} color="black"/> : (
            <Picker
            selectedValue={countries}
            style={styles.dropDown}
            onValueChange={(itemValue, itemIndex) => setCountries(itemValue)}
          >
            {countries.map((country) => (
                <Picker.Item
                key={country.value}
                label={country.country}
                value={country.value}
              
              />
            ))}
              
    

            {/* <Picker.Item label="Worldwide" value="ww" />
            <Picker.Item label="Philippines" value="ph" />
            <Picker.Item label="Japan" value="jp" /> */}
          </Picker>
          )}
          
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 15,
    fontFamily: "Poppins",
  },
  dropDown: {
    height: 50,
    width: 130,
  
  },
});
