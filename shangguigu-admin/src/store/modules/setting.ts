import { defineStore } from 'pinia';

const useSettingStore = defineStore('Setting', {
  state() {
    return {
      fold: false,
      refsh: false,
    };
  },
});

export default useSettingStore;
