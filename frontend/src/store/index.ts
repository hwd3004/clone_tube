import { instance } from "@/main";
import { createStore, storeKey } from "vuex";
import user from "./modules/user";

export default createStore({
  state: {
    video: {
      type: Object,
      hashtags: "",
    },
    pageTitle: {
      type: String,
    },
    videos: [
      {
        type: Array,
        hashtags: "",
      },
    ],
    loading: false,
  },
  getters: {
    getVideo: (state) => {
      return state.video;
    },
    getVideos: (state) => {
      return state.videos;
    },
  },
  mutations: {
    setVideo: function (state, payload) {
      const { video, pageTitle } = payload;
      const { hashtags }: { hashtags: [] } = video;
      state.video = video;
      state.video.hashtags = hashtags.join();
      state.pageTitle = pageTitle;
    },
    setVideos: function (state, payload: []) {
      state.videos = payload;

      for (const key in payload) {
        const { hashtags }: { hashtags: [] } = payload[key];

        state.videos[key].hashtags = hashtags.join();
      }

      state.loading = false;
    },
  },
  actions: {
    fetchVideo: async function (context, payload) {
      try {
        const { url } = payload;

        const res = await instance.get(url);

        const { video, pageTitle } = res.data;

        context.commit("setVideo", { video, pageTitle });
      } catch (error) {
        console.error(error);
      }
    },
    fetchVideos: async function (context, payload) {
      try {
        this.state.loading = true;

        const { url } = payload;

        const {
          data: { videos },
        } = await instance.get(url);

        context.commit("setVideos", videos);
      } catch (error) {
        console.error(error);
      }
    },
    deleteVideo: async function (context, payload) {
      const { url } = payload;

      const {
        data: { status },
      } = await instance.get(`${url}/delete`);

      return { status };
    },
  },
  modules: {
    user,
  },
});
