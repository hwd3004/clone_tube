import { instance } from "../../main";

export const getLsUser = () => {
  const data = JSON.parse(localStorage.getItem("user"));
  // console.log(data);
  return data;
};
export const getLsLoggedIn = () => {
  const data = JSON.parse(localStorage.getItem("loggedIn"));
  // console.log(data);
  return data;
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
    user: getLsUser(),
    loggedIn: getLsLoggedIn(),
    errorMsg: false,
  },
  getters: {
    getUser: (state: any) => {
      return {
        user: state.user,
        loggedIn: state.loggedIn,
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
      const { user, loggedIn, errorMsg, status } = payload;

      if (status != 200) {
        state.errorMsg = errorMsg;
      } else {
        setLsUser(user);
        setLsLoggedIn(loggedIn);

        state.user = user;
        state.loggedIn = loggedIn;
      }
    },
    setLogout: function (state: any, payload: any) {
      localStorage.removeItem("user");
      localStorage.removeItem("loggedIn");

      state.user = {};
      state.loggedIn = false;
    },
  },
  actions: {
    login: async function (context: any, payload: any) {
      try {
        const res = await instance.post("/login", payload);

        const { loggedIn, user, errorMsg, status } = res.data;

        context.commit("setUser", { user, loggedIn, errorMsg, status });
      } catch (error) {
        console.error(error);
      }
    },
    logout: async function (context: any, payload: any) {
      try {
        // const res = await instance.post("/users/logout");

        context.commit("setLogout");
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default user;
