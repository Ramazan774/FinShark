import axios from "axios";
import { CommentGet, CommentPost } from "../Models/Comment";
import { handleError } from "../Helpers/ErrorHandler";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5278";
// const api = "http://localhost:5278/api/comment/";

export const commentPostAPI = async (
  title: string, 
  content: string, 
  symbol: string
) => {
  try {
    const data = await axios.post<CommentPost>(`${API_BASE_URL}/api/comment/{symbol}`, {
      title: title,
      content: content
    })
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const commentGetAPI = async (
  symbol: string
) => {
  try {
    const data = await axios.get<CommentGet[]>(`${API_BASE_URL}/api/comment?Symbol=${symbol}`)
    return data;
  } catch (error) {
    handleError(error);
  }
};