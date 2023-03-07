import { StyleSheet, Text, View, Pressable } from 'react-native';
import globalStyles from '../globals/styles'

const BeaconCard = ({ onPress, beaconData = {} }) => {
  return (
    <View>
      <Pressable onPress={onPress}>
        <View style={styles.cardContainer}>
          <View style={styles.cardLayout}>
            <View style={styles.beaconTypeAndDistance}>
              <View style={styles.beaconType}>
                <Text style={styles.beaconTypeText}>{beaconData.beaconType}</Text>
              </View>
              <View style={styles.beaconDistance}>
                <Text style={styles.beaconDistanceText}>{beaconData.distance}</Text>
              </View>
            </View>
            <View style={styles.verticalSpacing}>
              <Text style={styles.beaconPropertyTitle}>UUID</Text>
              <Text style={styles.beaconPropertyValue}>{beaconData.uuid}</Text>
            </View>
            <View style={styles.beaconIdentifiers}>
              <View style={styles.beaconUniqueIdentifiers}>
                <View style={styles.horizonstalSpacing}>
                  <Text style={styles.beaconPropertyTitle}>Major</Text>
                  <Text style={styles.beaconPropertyValue}>{beaconData.major}</Text>
                </View>
                <View style={styles.horizonstalSpacing}>
                  <Text style={styles.beaconPropertyTitle}>Minor</Text>
                  <Text style={styles.beaconPropertyValue}>{beaconData.major}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.beaconPropertyTitle}>RSSI</Text>
                <Text style={styles.beaconPropertyValue}>{beaconData.rssi}</Text>
              </View>
              <View>
                <Text style={styles.beaconPropertyTitle}>TX</Text>
                <Text style={styles.beaconPropertyValue}>{beaconData.tx}</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default BeaconCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: globalStyles.colorSet.SECONDARY,
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    marginHorizontal: 10,
    marginTop: 20,
  },
  cardLayout: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  beaconTypeAndDistance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  beaconType: {
    alignSelf: 'flex-start'
  },
  beaconTypeText: {
    fontSize: globalStyles.fontSizeSet.fontMedium
  },
  beaconDistance: {
    alignSelf: 'flex-end',
  },
  beaconDistanceText: {
    fontSize: globalStyles.fontSizeSet.fontMedium,
  },
  verticalSpacing: {
    marginTop: 10
  },
  horizonstalSpacing: {
    marginRight: 10
  },
  beaconPropertyTitle: {
    fontSize: globalStyles.fontSizeSet.fontRegular
  },
  beaconPropertyValue: {
    fontSize: globalStyles.fontSizeSet.fontSmall
  },
  beaconIdentifiers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  beaconUniqueIdentifiers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
