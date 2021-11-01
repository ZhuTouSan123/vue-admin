import Vue from "vue";
import Vuex from "vuex";
import axios from "../utils/axios.js";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

const actions = {
  getEmployees({ commit }) {
    axios.get("/userAPI/getUsers.php").then((res) => {
      commit("setEmployees", res.data);
    });
  },
};

const mutations = {
  saveUser(state, value) {
    state.user = value;
  },
  setEmployees(state, value) {
    state.employees = value;
  },
  changeColor(state, value) {
    state.baseColor.reverse();
  },
};

const state = {
  user: {
    userID: 0,
    username: "",
    name: "",
    type: 2,
  },
  baseColor: [
    { head: "#383c42", aside: "#354255" },
    { head: "green", aside: "red" },
  ],
  employees: [],
  baseImgUrl: "http://121.40.159.226:6001/goodsImg/",
};

const getters = {
  identity(state) {
    let i = "";
    switch (state.user.type) {
      case 0:
        i = `超级管理员`;
        break;
      case 1:
        i = `主管${state.user.name}`;
        break;
      default:
        i = `员工${state.user.name}`;
        break;
    }
    return i;
  },
};
export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(val) {
        return {
          // 只储存state中的token
          user: val.user,
        };
      },
    }),
  ],
});
