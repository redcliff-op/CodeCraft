import { create } from "zustand";
import { User } from "../global";
import { FormEvent } from "react";
import axios from "axios";

type states = {
  user: User | null;
  authErrorResponse: string;
};

type actions = {
  signIn: (event: FormEvent) => Promise<void>;
  signOut: () => Promise<void>;
};

const extractErrorMessage = (htmlString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const errorMessage =
    doc.querySelector("pre")?.textContent || "Unknown error occurred";
  return errorMessage.split("\n")[0];
};

type storeType = states & actions;

const useMainStore = create<storeType>((set,get) => ({
  user: null,
  authErrorResponse: "",
  signIn: async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const mail = formData.get("mail") as string;

    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_BACKEND_URI}/users/signin`,
        data: {
          username: username,
          mail: mail,
          password: password,
        },
        withCredentials: true,
      });
      const responseData = response.data;
      const userData = responseData.data.user;
      const user = {
        username: userData.username,
        name: userData.name,
        mail: userData.mail,
        profilePicture: userData.profilePicture,
      };
      set({ user: user });
      
    } catch (error) {
      console.log(error);
      set({ authErrorResponse: extractErrorMessage(error.response.data) });
    }
  },
  signOut: async () => {
    try {
      await axios({
        method: "post",
        url: `${import.meta.env.VITE_BACKEND_URI}/users/signout`,
        withCredentials: true,
      });
      set({ user: null });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useMainStore;
