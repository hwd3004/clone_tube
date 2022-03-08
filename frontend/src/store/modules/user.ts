import { instance } from "../../main";

export const getLsUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export const getLsLoggedIn = () => {
  return JSON.parse(localStorage.getItem("loggedIn"));
};

const setLsUser = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};
const setLsLoggedIn = (loggedIn: boolean) => {
  localStorage.setItem("loggedIn", String(loggedIn));
};

const user = {
  namespaced: true,
  state: {
    user: { type: Object },
    loggedIn: false,
    errorMsg: false,
  },
  getters: {
    getUser: (state: any) => {
      return {
        user: state.user || getLsUser,
        loggedIn: state.loggedIn || getLsLoggedIn,
      };
    },
    getErrorMsg: (state: any) => {
      return {
        errorMsg: state.errorMsg,
      };
    },
  },
  mutations: {
    setUser: function (state: any, payload: any) {
      const { user, loggedIn, errorMsg } = payload;

      if (errorMsg) {
        state.errorMsg = errorMsg;
      } else {
        setLsUser(user);
        setLsLoggedIn(loggedIn);

        state.user = user;
        state.loggedIn = loggedIn;
      }
    },
  },
  actions: {
    login: async function (context: any, payload: any) {
      try {
        const res = await instance.post("/login", payload);

        const { loggedIn, user, errorMsg } = res.data;

        context.commit("setUser", { user, loggedIn, errorMsg });
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default user;
