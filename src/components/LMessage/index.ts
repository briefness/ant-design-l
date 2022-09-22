import { h, render } from "vue";
import { isNumber, isString } from "lodash-es";
// @ts-ignore
import LMessage from "@components/LMessage/index.tsx";

interface MessageProps {
  content?: string;
  type?: string;
  duration?: number;
}

const div = document.createElement('div')
document.body.appendChild(div)
let timer: NodeJS.Timeout | null = null
const createMessage = (props: MessageProps) => {
  const vNode = h(LMessage, props)
  render(vNode, div)
  const duration = isNumber(props.duration) ? props.duration : 3
  timer && clearTimeout(timer)
  if (duration) {
    timer = setTimeout(() => {
      render(null, div)
    }, duration * 1000)
  }
};

const messageDct = {
  info: (props: MessageProps | string) => createMessage(
    isString(props) ? {content: props as string, type: 'info'} : { ...props, type: 'info' }
  )
}

export default messageDct


