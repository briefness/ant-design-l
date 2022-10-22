import { ref, unref, reactive, computed, getCurrentInstance, onUnmounted, toRaw } from 'vue';
import { isEqual } from 'lodash-es';
import { ModalProps } from '@components/LModal/src/types';

const dataTransfer = reactive<any>({});
const visibleData = reactive<{ [key: number]: boolean }>({});

export function useModal(): any {
  const modal = ref<Nullable<any>>(null);
  const loaded = ref<Nullable<boolean>>(false);
  const uid = ref<string>('');

  const register = (modalMethod: any) => {
    if (!getCurrentInstance()) {
      throw new Error('useModal() can only be used inside setup() or functional components!');
    }
    onUnmounted(() => {
      modal.value = null;
      loaded.value = false;
      dataTransfer[unref(uid)] = null;
    });
    modal.value = modalMethod;
    loaded.value = true;
    modalMethod.emitVisible = (visible: boolean, uid: number) => {
      visibleData[uid] = visible;
    };
  };
  const getInstance = () => {
    const instance = unref(modal);
    if (!instance) {
      throw new Error('useModal instance is undefined!');
    }
    return instance;
  };
  const methods = {
    setModalProps: (props: Partial<ModalProps>): void => {
      getInstance()?.setModalProps(props);
    },

    getVisible: computed((): boolean => {
      return visibleData[~~unref(uid)];
    }),

    redoModalHeight: () => {
      getInstance()?.redoModalHeight?.();
    },

    openModal: <T = any>(visible = true, data?: T, openOnSet = true): void => {
      getInstance()?.setModalProps({
        visible: visible,
      });

      if (!data) return;
      const id = unref(uid);
      if (openOnSet) {
        dataTransfer[id] = null;
        dataTransfer[id] = toRaw(data);
        return;
      }
      const equal = isEqual(toRaw(dataTransfer[id]), toRaw(data));
      if (!equal) {
        dataTransfer[id] = toRaw(data);
      }
    },

    closeModal: () => {
      getInstance()?.setModalProps({ visible: false });
    },
  };
  return [register, methods];
}
