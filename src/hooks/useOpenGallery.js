import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { useState } from 'react';

export const useOpenGallery = (compressLevel = 0.2) => {
  const [imageUri, setImageUri] = useState(null);
  const [imageName, setImageName] = useState(undefined);

  const OpenGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.launchImageLibraryAsync,
      quality: 1,
    }).catch((err) => {
      throw new Error('Image upload has been cancelled');
    });
    if (!result.cancelled) {
      let uriName = result.uri.match(/(\w+)-(\w+)-(\w+)-(\w+)-(\w+)(\.\w+)/)[0];
      setImageName(uriName);
      const manipResult = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: 320 } }],
        {
          compress: compressLevel,
          format: ImageManipulator.SaveFormat.PNG,
        }
      );
      setImageUri(manipResult);
    }
  };

  return [imageUri, imageName, OpenGallery];
};
