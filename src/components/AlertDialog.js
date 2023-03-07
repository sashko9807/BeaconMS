import { View, Text, Modal, StyleSheet, Pressable } from 'react-native';
import globalStyles from '../globals/styles'

const AlertDialog = ({
  isVisible,
  animationType,
  title,
  message,
  onClose,
  onConfirm,
}) => (
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
          <View style={modalStyle.modalButtons}>
            <Pressable onPress={onClose}>
              <Text style={modalStyle.modalButtonsText}>No, Cancel</Text>
            </Pressable>
            <Pressable onPress={onConfirm}>
              <Text style={modalStyle.modalButtonsText}>Yes, Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  </View>
);

const modalStyle = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    ...StyleSheet.absoluteFill,
    margin: 'auto',
  },
  modalView: {
    margin: 35,
    backgroundColor: globalStyles.colorSet.SECONDARY,
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
    fontSize: globalStyles.fontSizeSet.fontMedium,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: globalStyles.fontSizeSet.fontRegular,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    marginBottom: 20,
  },
  modalButtons: {
    marginTop: 10,
    position: 'absolute',
    bottom: '10%',
    right: '5%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtonsText: {
    marginHorizontal: 10,
    fontSize: globalStyles.fontSizeSet.fontRegular,
    fontFamily: globalStyles.fontFamilySet.fontFamilyPrimary,
    color: globalStyles.colorSet.PRIMARY,
  },
});

export default AlertDialog;
