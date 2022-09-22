import { defineComponent } from "vue";
// @ts-ignore
import initDefaultProps from "@util/initDefaultProps";

const ModalProps = {
  appendToBody: Boolean,
  visible: Boolean,
  width: Number,
  title: String,
  closable: Boolean,
  mask: Boolean,
  cancelText: String,
  okText: String,
};

export default defineComponent({
  name: "LModal",
  props: initDefaultProps(ModalProps, {
    appendToBody: false,
    visible: false,
    width: 520,
    title: "",
    closable: true,
    mask: true,
    cancelText: "取消",
    okText: "确定",
  }),
  emits: ["update:visible", "ok"],

  setup(props, { slots, emit }) {
    return () => {
      return (
        <LModal
          {...props}
          v-slots={slots}
          onUpdate:visible={(val) => {
            emit("update:visible", val);
          }}
          onOk={() => {
            emit("ok");
          }}
        ></LModal>
      );
    };
  },
});
