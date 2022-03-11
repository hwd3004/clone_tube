import { instance } from "../../main";
import router from "../../router";

const TOKEN = "token";
const LOGGED_IN = "loggedIn";

export const getLsUser = () => {
  return JSON.parse(localStorage.getItem(TOKEN));
};
export const getLsLoggedIn = () => {
  return JSON.parse(localStorage.getItem(LOGGED_IN));
};

const setLsUser = (user: any) => {
  localStorage.setItem(TOKEN, JSON.stringify(user));
};
const setLsLoggedIn = (loggedIn: boolean) => {
  localStorage.setItem(LOGGED_IN, String(loggedIn));
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

        // https://youtu.be/eWDHkIdK4Sc?t=219
        // router.push("/");
        location.href = "/";
      }
    },
    setLogout: function (state: any, payload: any) {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(LOGGED_IN);

      location.href = "/";
    },
    setJoin: function (state: any, payload: any) {
      const { status, errorMsg } = payload;

      if (status == 200) {
        router.push("/login");
      } else {
        state.errorMsg = errorMsg;
      }
    },
    clearError: function (state: any, payload: any) {
      state.errorMsg = null;
    },
  },
  actions: {
    join: async function (context: any, payload: any) {
      try {
        const formdata = new FormData();

        for (const key in payload) {
          formdata.append(key, payload[key]);
        }

        const res = await instance.post("/join", formdata);

        const { status, errorMsg } = res.data;

        context.commit("setJoin", { status, errorMsg });
      } catch (error) {
        console.error(error);
      }
    },
    login: async function (context: any, payload: any) {
      try {
        const formdata = new FormData();

        for (const key in payload) {
          formdata.append(key, payload[key]);
        }

        const res = await instance.post("/login", formdata);

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

        router.push("/");
      } catch (error) {
        console.error(error);
      }
    },
    editProfile: async function (context: any, payload: any) {
      const formdata = new FormData();

      for (const key in payload) {
        formdata.append(key, payload[key]);
      }

      const {
        data: { status, errorMsg },
      } = await instance.post("/users/edit", formdata);

      return { status, errorMsg };
    },
    filterPublicOnly: async function (context: any, payload: any) {
      const { url } = payload;
      const res = await instance.get(url);
      const { status } = res.data;

      if (status == 403) {
        router.push("/");
      }
    },
  },
};

export default user;
