import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import BuildingCards from "../components/BuildingCards";
import AddBuilding from "../components/AddBuilding";
import MainLayout from "../container/MainLayout";
import Buildings from "../models/Buildings";

const DashboardScreen = ({ navigation }) => {
  const [buildings, getBuildings] = useState([]);
  useEffect(() => {
    getBuildings(Buildings);
  }, []);

  return (
    <MainLayout>
      <ScrollView>
        <View style={styles.cardsLayout}>
          {buildings.map((building) => {
            return (
              <BuildingCards
                key={building.name}
                onPress={() => {
                  navigation.navigate("BuildingDetails", {
                    buildingName: building.name,
                  });
                }}
                image={building.image}
                buildingName={building.name}
              />
            );
          })}
        </View>
      </ScrollView>
      <AddBuilding onPress={() => navigation.navigate("AddBuilding")} />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  cardsLayout: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    flexGrow: 1,
    justifyContent: "flex-start",
    padding: 15,
  },
});

export default DashboardScreen;
