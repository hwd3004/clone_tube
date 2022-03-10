import { instance } from "../../main";
import router from "../../router";

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

        // https://youtu.be/eWDHkIdK4Sc?t=219
        router.push("/");
      }
    },
    setLogout: function (state: any, payload: any) {
      localStorage.removeItem("user");
      localStorage.removeItem("loggedIn");

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
