import { Modal as AntdModal, ModalFuncProps } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

interface ConfirmationDialogProps extends ModalFuncProps {
  onClose?: () => void;
}

const confirm = (props: ModalFuncProps) => {
  const { className } = props;
  return AntdModal.confirm({
    ...props,
    className: `${className || ''} confirm-modal`,
  });
};

export const confirmationDialog = (props: ConfirmationDialogProps) => {
  const { onClose } = props;
  confirm({
    content: (
      <CloseOutlined
        className="absolute top-3.5 right-3.5"
        onClick={() => {
          onClose && onClose();
          AntdModal.destroyAll();
        }}
      />
    ),
    okText: 'Yes',
    cancelText: 'No',
    ...props,
  });
};
