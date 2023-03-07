import LocationEnabler from 'react-native-location-enabler';

export const useLocationTurnOn = () => {
  const {
    PRIORITIES: { HIGH_ACCURACY },
    useLocationSettings,
  } = LocationEnabler;

  const [enabled, requestResolution] = useLocationSettings({
    priority: HIGH_ACCURACY,
  });

  return [enabled, requestResolution]
};
