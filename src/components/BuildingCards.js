import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';

import { CDN_URL } from '../api/baseQuery';
import globalStyles from '../globals/styles'


const BuildingCards = ({ onPress, image, buildingName }) => {


  return (
    <Pressable onPress={onPress}>
      <View style={style.card}>
        <Image
          source={{ uri: `${CDN_URL}/buildings/${image}` }}
          style={style.cardImage}
          width="320"
          height="240"
        />
        <View style={style.cardTextContainer}>
          <Text adjustsFontSizeToFit style={style.cardText}>{buildingName}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: globalStyles.colorSet.lightGray,
    aspectRatio: 9 / 14,
    marginHorizontal: 10,
    marginVertical: 10
  },
  cardImage: {
    aspectRatio: 4 / 3,
  },
  cardTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  cardText: {
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    fontSize: globalStyles.fontSizeSet.fontSmall,
    textAlign: 'center'
  }
});


export default BuildingCards;
