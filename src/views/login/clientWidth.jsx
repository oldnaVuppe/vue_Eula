import { ref, reactive } from "vue";

export default function UseClientWidth() {
  const clientWidth = ref(0);
  const state = reactive({
    clientWidth: 0,
    clientHeight: 0,
  });

  const getClientWidth = () => {
    state.clientWidth = document.documentElement.clientWidth;
    state.clientHeight = document.documentElement.clientHeight;
    return reactive(state);
  };

  return {
    clientWidth,
    getClientWidth,
    state,
  };
}
