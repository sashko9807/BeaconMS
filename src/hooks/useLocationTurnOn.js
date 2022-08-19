import LocationEnabler from 'react-native-location-enabler';
import { useEffect } from 'react';

export const useLocationTurnOn = () => {
  const {
    PRIORITIES: { HIGH_ACCURACY },
    useLocationSettings,
  } = LocationEnabler;

  const [enabled, requestResolution] = useLocationSettings({
    priority: HIGH_ACCURACY,
  });

  useEffect(() => {
    if (!enabled) {
      requestResolution();
    }
  }, []);
};
