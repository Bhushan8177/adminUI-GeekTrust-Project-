import axios from "axios";
import { endPoint } from "../config.jsx";

export const dataFetching = async () => {
  try {
    const response = await axios.get(
      `${endPoint.url}adminui-problem/members.json`
    );
    return response;
  } catch (error) {
    return error;
  }
};
