import axios from "axios";

export const fetchProfile = async (user: string) => {
  try {
    const { data } = await axios.get(`/api/session/profile/${user}`);

    return data;
  } catch (error) {
    console.log(error);
    return { error: "user not found" };
  }

  //   console.log(data);
};
