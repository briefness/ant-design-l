export interface ModalProps {
  appendToBody?: boolean;
  visible: boolean;
  width?: string | number;
  title?: string;
  closable?: boolean;
  mask?: boolean;
  cancelText?: string;
  okText?: string;
}
