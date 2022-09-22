import { defineComponent } from "vue";
// @ts-ignore
import message from "./index.module.less";
// @ts-ignore
import initDefaultProps from "@util/initDefaultProps";

const MessageProps = {
  type: String,
  content: String,
};

export default defineComponent({
  name: "LMessage",
  props: initDefaultProps(MessageProps, {
    type: "info",
    content: "",
  }),

  setup(props, {}) {
    return () => {
      const { content } = props;
      return (
        <div class={message["l-message"]}>
          <div class={message["l-message-notice"]}>
            <div class={message["l-message-notice-content"]}>{content}</div>
          </div>
        </div>
      );
    };
  },
});
