import { View, FlatList, StyleSheet } from 'react-native';

import BuildingCards from '../../components/BuildingCards';
import AddBuildingButton from '../../components/AddBuildingButton';
import MainLayout from '../../container/MainLayout';

import { useGetBuildingQuery } from '../../api/buildingQueries';

import { BUILDING_DETAILS, ADD_BUILDING } from '../../globals/NavigationNames';
import { useCallback, useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';


const HomeScreen = ({ navigation }) => {
  const {
    data = [],
    error,
    isLoading,
  } = useGetBuildingQuery({});

  const { height, width } = useWindowDimensions();

  const [grid, setGrid] = useState(() => {
    if (width < 768) {
      return {
        numColumns: 2,
        lastItemWidth: '50%'
      }
    }

    if (width >= 768 && width <= 992) {
      return {
        numColumns: 3,
        lastItemWidth: '33%'
      }
    }

    if (width > 992) {
      return {
        numColumns: 4,
        lastItemWidth: '16%'
      }
    }
  });

  // useEffect(() => {
  //   if (width < 768) {
  //     setGrid((prevState) => {
  //       return {
  //         ...prevState,
  //         numColumns: 2,
  //         lastItemWidth: '50%'
  //       }
  //     })
  //     return
  //   }
  //   if (width >= 768 && width <= 992) {
  //     setGrid(
  //       (prevState) => {
  //         return {
  //           ...prevState,
  //           numColumns: 3,
  //           lastItemWidth: '33%'
  //         }
  //       })
  //     return
  //   }
  //   if (width > 992) {
  //     setGrid((prevState) => {
  //       return {
  //         ...prevState,
  //         numColumns: 4,
  //         lastItemWidth: '12.5%'
  //       }
  //     })
  //   }
  // }, [])

  const renderItem = useCallback(({ item, index }) => {
    const lastItem = index === data.length - 1
    return (
      <View style={{
        flex: 1,
        flexGrow: 1,
        maxWidth: lastItem
          ? grid.lastItemWidth
          : '100%'
      }}>
        <BuildingCards
          onPress={() => {
            navigation.navigate(BUILDING_DETAILS, {
              buildingName: item.name,
              buildingID: item._id,
              totalFloors: item.totalFloors,
            });
          }}
          image={item.image}
          buildingName={item.name}
        />
      </View>
    )
  }, [data])

  return (
    <MainLayout>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item._id}
        initialNumToRender={5}
        horizontal={false}
        numColumns={grid.numColumns}
        style={styles.container}
      />
      <AddBuildingButton onPress={() => navigation.navigate(ADD_BUILDING)} />
    </MainLayout >
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15
  },
});

export default HomeScreen;
