import { instance } from "@/main";
import { createStore, storeKey } from "vuex";
import user from "./modules/user";
import router from "../router";

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
    uploadVideo: async function (context, payload) {
      const formdata = new FormData();

      for (const key in payload) {
        formdata.append(key, payload[key]);
      }

      const res = await instance.post("/videos/upload", formdata);

      const { status, errorMsg }: { status: number; errorMsg: string } = res.data;

      if (status == 200) {
        router.push("/");
      } else {
        alert(errorMsg);
      }
    },
    editVideo: async function (context, payload) {
      const formdata = new FormData();

      const { url, form } = payload;

      for (const key in form) {
        formdata.append(key, form[key]);
      }

      const res = await instance.post(url, formdata);

      const { status, errorMsg } = res.data;

      if (status == 200) {
        router.push("/");
      } else {
        alert(errorMsg);
      }
    },
  },
  modules: {
    user,
  },
});
