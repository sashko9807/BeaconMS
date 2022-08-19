import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { useState, useEffect } from 'react';

export const useOpenGallery = (convertToBase64 = false) => {
  const [imageUri, setImageUri] = useState(null);
  const [imageName, setImageName] = useState(undefined);
  const [exportAsBase64, setExportAsBase64] = useState(false);

  useEffect(() => {
    if (convertToBase64 === true) {
      setExportAsBase64(true);
    }
  }, []);

  const OpenGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.launchImageLibraryAsync,
      quality: exportAsBase64 ? 1 : 0.2,
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
          compress: exportAsBase64 ? 1 : 0,
          format: ImageManipulator.SaveFormat.PNG,
          base64: exportAsBase64 ? true : false,
        }
      );
      setImageUri(manipResult);
    }
  };

  return [imageUri, imageName, OpenGallery];
};
