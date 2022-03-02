import { instance } from "@/main";
import { createStore } from "vuex";

export default createStore({
  state: {
    videos: [],
  },
  getters: {
    getVideos: (state) => {
      return state.videos;
    },
  },
  mutations: {
    setVideos: function (state, payload) {
      state.videos = payload;
    },
  },
  actions: {
    fetchVideos: async function (context, payload) {
      try {
        const { url } = payload;

        const {
          data: { videos },
        } = await instance.get(url);

        context.commit("setVideos", videos);
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {},
});
