
// @ts-except-error: Could not find a declaration file for module './base.js'.
import instance from "./base";
const ApiResources = {
  user: {
    login: (data: { email: string; password: string }) => {
      return instance.post("/login", data);
    },
    signup: (data: { email: string; password: string; name: string }) => {
      return instance.post("/signup", data);
    },
  },
  content: {
    createPost: (data: {
      title: string | null;
      link: string | null;
      type: string | null;
      tags?: [];
    }) => {
      return instance.post("/user/create/post", data);
    },
    showPosts: () => {
      return instance.get("/user/content");
    },
    deletePost: (id: string) => {
      return instance.delete(`/user/delete/${id}`);
    },
    updatePost: (
      id: string,
      data: {
        title?: string;
        link?: string;
        type?: string;
        tags?: [];
      }
    ) => {
      return instance.patch(`/user/update/${id}`,data);
    },
  },
  link: {
    createShareLink: (body:{share:boolean}) => {
      return instance.post("/share",body);
    },
    getShareLink: (shareLink: string) => {
      return instance.get(`/sharelink/${shareLink}`);
    },
  },
};

export default ApiResources