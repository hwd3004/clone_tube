import { instance } from "../../main";
const user = {
  namespaced: true,
  state: {
    user: { type: Object },
    loggedIn: false,
  },
  getters: {
    getUser: (state: any) => {
      return {
        user: state.user,
        loggedIn: state.loggedIn,
      };
    },
  },
  mutations: {
    setUser: function (state: any, payload: any) {
      const { user, loggedIn } = payload;
      state.user = user;
      state.loggedIn = loggedIn;
    },
  },
  actions: {
    login: async function (context: any, payload: any) {
      try {
        // console.log('user actions login')
        // console.log(payload);

        const res = await instance.post("/login", payload);
        // console.log(res);

        const { loggedIn, user } = res.data;

        context.commit("setUser", { user, loggedIn });
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default user;
