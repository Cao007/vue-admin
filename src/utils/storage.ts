/**
 * Storage二次封装
 */
import config from '@/config'

export default {
    setItem(key: any, val: any) {
        let storage = this.getStroage();
        storage[key] = val;
        window.localStorage.setItem(config.namespace, JSON.stringify(storage));
    },
    getItem(key: any) {
        return this.getStroage()[key]
    },
    getStroage() {
        return JSON.parse(window.localStorage.getItem(config.namespace) || "{}");
    },
    clearItem(key: any) {
        let storage = this.getStroage()
        delete storage[key]
        window.localStorage.setItem(config.namespace, JSON.stringify(storage));
    },
    clearAll() {
        window.localStorage.clear()
    }
}