import type { App, Directive, DirectiveBinding } from 'vue';
import { intersection, isArray } from 'lodash-es';

import { usePermissionStore } from '@/store/modules/permissionStore';

function hasPermission(value: string) {
  if (!value) {
    return true;
  }
  const permissionStore = usePermissionStore();
  const { getPermCodeList } = permissionStore;
  if (!isArray(value)) {
    return (getPermCodeList as string[]).includes(value);
  }
  return (intersection(value, getPermCodeList) as string[]).length > 0;
}

function isAuth(el: Element, binding: any) {
  const value = binding.value;
  if (!value) return;
  if (!hasPermission(value)) {
    el.parentNode?.removeChild(el);
  }
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isAuth(el, binding);
};

const authDirective: Directive = {
  mounted,
};

export function setupPermissionDirective(app: App) {
  app.directive('auth', authDirective);
}

export default authDirective;
