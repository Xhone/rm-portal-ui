import store from '@/store/index'
/**
 * 判断用户是否拥有操作权限
 * 根据传入的权限标识，查看是否存在用户权限标识的集合
 */

export function hasPermission(perms) {
    let hasPermission = false;
    let permissions = store.user.state.perms;
    for (let i = 0; i < permissions.length; i++) {
        if (permissions[i] === perms) {
            hasPermission = true;
            break;
        }
    }
    return hasPermission;
}