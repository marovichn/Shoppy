import { FC } from "react";
import Modal from "@/components/ui/modal";
import useStoreModal from "@/hooks/use-store-modal";

interface StoreModalProps {}

const StoreModal: FC<StoreModalProps> = ({}) => {
  const StoreModal = useStoreModal();

  return (
    <Modal
      title='Create store'
      description='Add a new store to manage products and categories'
      isOpen={StoreModal.isOpen}
      onClose={StoreModal.onClose}
    >
      Create store form
    </Modal>
  );
};

export default StoreModal;
