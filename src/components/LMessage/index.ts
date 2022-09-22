import { h, render } from "vue";
// @ts-ignore
import LMessage from "@components/LMessage/index.tsx";
import { Nullable } from "vitest";

interface ModalProps {
  appendToBody?: boolean;
  visible?: boolean;
  width?: string | number;
  title?: string;
  closable?: boolean;
  mask?: boolean;
  cancelText?: string;
  okText?: string;
  msg?: string;
}

const div = document.createElement('div')
document.body.appendChild(div)
let timer: Nullable<NodeJS.Timeout> = null
export default (props: ModalProps) => {
   const vNode = h(LMessage, props)
   render(vNode, div)
   timer && clearTimeout(timer)
    timer = setTimeout(() => {
      render(null, div)
    }, 3000)
};

