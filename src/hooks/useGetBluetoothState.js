import { useState, useEffect } from 'react';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';

export const useGetBluetoothState = () => {
  const [bluetoothEnabled, setBluetothEnabled] = useState(false);
  const [bluetoothState, setBluetoothState] = useState('');

  useEffect(() => {
    const state = BluetoothStateManager.onStateChange((currentState) => {
      setBluetoothState(currentState);
    }, []);

    return () => {
      if (state) {
        state.remove();
      }
    };
  }, []);

  useEffect(() => {
    checkBluetooth();
  }, [bluetoothState]);

  const checkBluetooth = async () => {
    if (bluetoothState === 'PoweredOn') return setBluetothEnabled(true);
    if (bluetoothState === 'PoweredOff') {
      const request = await BluetoothStateManager.requestToEnable().catch(() =>
        BluetoothStateManager.onStateChange().remove()
      );
      if (request) return setBluetothEnabled(true);
    }
  };

  return bluetoothEnabled;
};
