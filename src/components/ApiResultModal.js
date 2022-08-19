import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React from 'react';

const ApiResultModal = ({
  isVisible,
  animationType,
  title,
  message,
  onConfirm,
}) => {
  return (
    <View style={modalStyle.centerView}>
      <Modal
        animationType={animationType || 'fade'}
        transparent={true}
        visible={isVisible}
      >
        <View style={modalStyle.centerView}>
          <View style={modalStyle.modalView}>
            <Text style={modalStyle.modalTitle}>{title}</Text>
            <View>
              <Text style={modalStyle.modalMessage}>{message}</Text>
            </View>
            <View
              style={{
                marginTop: 10,
                flex: 1,
                alignItems: 'center',
              }}
            >
              <Pressable onPress={onConfirm} style={modalStyle.button}>
                <Text>OK</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ApiResultModal;

const modalStyle = StyleSheet.create({
  centerView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
  },
  modalView: {
    flex: 1,
    margin: 35,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '40%',
    minWidth: '85%',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: '#6A539D',
  },
  modalMessage: {
    fontSize: 17,
  },
  button: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6A539D',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '50%',
    position: 'absolute',
    bottom: '-10%',
  },
});
