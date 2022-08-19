import { View, Text, Modal, StyleSheet, Pressable } from 'react-native';

const AlertWindow = ({
  isVisible,
  animationType,
  title,
  message,
  onClose,
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
            <Text style={modalStyle.modalMessage}>{message}</Text>
            <View
              style={{
                marginTop: 10,
                position: 'absolute',
                bottom: '10%',
                right: '5%',
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Pressable onPress={onClose}>
                  <Text style={modalStyle.modalButtons}>No, Cancel</Text>
                </Pressable>
                <Pressable onPress={onConfirm}>
                  <Text style={modalStyle.modalButtons}>Yes, Confirm</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const modalStyle = StyleSheet.create({
  centerView: {
    flex: 1,
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
    margin: 35,
    backgroundColor: 'white',
    borderRadius: 20,
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
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 17,
    marginBottom: 20,
  },
  modalButtons: {
    marginHorizontal: 10,
    fontSize: 20,
    color: '#6A539D',
  },
});

export default AlertWindow;
