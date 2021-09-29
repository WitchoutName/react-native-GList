export function confirmationModal(setModal, content) {
  const [setModalVisible, setModalContent] = setModal;
  const { action, query, onApprove } = content;

  setModalContent({
    title: action.charAt(0).toUpperCase() + action.slice(1),
    description: `Are you sure you want to ${action} \'${
      query.set.filter(
        (i) => i[query.searchAttr[0]] === query.searchAttr[1]
      )[0][query.displayAttr]
    }\'?`,
    buttons: [
      {
        icon: {
          name: "tick",
          height: 70,
          width: 70,
        },
        onPress: onApprove,
      },
      {
        icon: {
          name: "delete",
          height: 70,
          width: 70,
        },
        onPress: () => {
          setModalVisible(false);
        },
      },
    ],
  });
  setModalVisible(true);
}

export default {
  confirmationModal,
};
