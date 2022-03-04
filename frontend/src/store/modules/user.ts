import { instance } from "../../main";

export const getLsUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export const getLsLoggedIn = () => {
  return JSON.parse(localStorage.getItem("loggedIn"));
};

const setLsUser = (user: unknown) => {
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
  },
  getters: {
    getUser: (state: any) => {
      return {
        user: state.user || getLsUser,
        loggedIn: state.loggedIn || getLsLoggedIn,
      };
    },
  },
  mutations: {
    setUser: function (state: any, payload: any) {
      const { user, loggedIn } = payload;

      setLsUser(user);
      setLsLoggedIn(loggedIn);

      state.user = user;
      state.loggedIn = loggedIn;
    },
  },
  actions: {
    login: async function (context: any, payload: any) {
      try {
        const res = await instance.post("/login", payload);

        const { loggedIn, user } = res.data;

        context.commit("setUser", { user, loggedIn });
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default user;
