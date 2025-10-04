// import axios from "axios";
import { PortfolioGet, PortfolioPost } from "../Models/Portfolio";
import { handleError } from "../Helpers/ErrorHandler";
import apiClient from "./apiClient";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5278";
// const api = "http://localhost:5278/api/portfolio/";

export const portfolioAddAPI = async (symbol: string) => {
  try {
    const { data } = await apiClient.post<PortfolioPost>(`/api/portfolio/${symbol}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const portfolioDeleteAPI = async (symbol: string) => {
  try {
    const { data } = await apiClient.delete<PortfolioPost>(`/api/portfolio/${symbol}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const portfolioGetAPI = async () => {
  try {
    const { data } = await apiClient.get<PortfolioGet[]>("/api/portfolio");
    // const data = await axios.get<PortfolioGet[]>(`${API_BASE_URL}/api/portfolio`);
    return data;
  } catch (error) {
    handleError(error);
  }
};