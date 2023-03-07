import { useState, useEffect } from 'react';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';

export const useGetBluetoothState = () => {
  const [bluetoothEnabled, setBluetothEnabled] = useState(false);

  useEffect(() => {
    BluetoothStateManager.getState().then((bluetoothState) => {
      switch (bluetoothState) {
        case 'PoweredOn':
          setBluetothEnabled(true)
          break;
        default:
          break;
      }
    });
  }, []);


  const isBluetoothEnabled = () => {
    return bluetoothEnabled
  }

  const requestToEnable = () => {
    BluetoothStateManager.requestToEnable()
      .then(response => setBluetothEnabled(response))
      .catch(() => setBluetothEnabled(false))
    return bluetoothEnabled
  };

  return [isBluetoothEnabled, requestToEnable];
};
