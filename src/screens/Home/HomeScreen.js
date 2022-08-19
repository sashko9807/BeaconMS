import { View, Text, StyleSheet, ScrollView } from 'react-native';

import BuildingCards from '../../components/BuildingCards';
import AddBuildingButton from '../../components/AddBuildingButton';
import MainLayout from '../../container/MainLayout';

import { useGetBuildingQuery } from '../../redux/buildingQueries';

const DashboardScreen = ({ navigation }) => {
  const {
    data = [],
    error,
    isLoading,
  } = useGetBuildingQuery({}, { refetchOnMountOrArgChange: 5 });

  return (
    <MainLayout>
      <ScrollView>
        <View style={styles.cardsLayout}>
          {data.map((building) => {
            return (
              <BuildingCards
                key={building._id}
                onPress={() => {
                  navigation.navigate('BuildingDetails', {
                    buildingName: building.name,
                    buildingID: building._id,
                    totalFloors: building.totalFloors,
                  });
                }}
                image={building.image}
                buildingName={building.name}
              />
            );
          })}
        </View>
      </ScrollView>
      <AddBuildingButton onPress={() => navigation.navigate('AddBuilding')} />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  cardsLayout: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 15,
  },
});

export default DashboardScreen;
