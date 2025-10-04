import { PortfolioGet, PortfolioPost } from "../Models/Portfolio";
import { handleError } from "../Helpers/ErrorHandler";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5278";

export const portfolioAddAPI = async (symbol: string) => {
  try {
    const res = await axios.post<PortfolioPost>(`${API_BASE_URL}/api/portfolio/${symbol}`);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const portfolioDeleteAPI = async (symbol: string) => {
  try {
    const res = await axios.delete<PortfolioPost>(`${API_BASE_URL}/api/portfolio/${symbol}`);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const portfolioGetAPI = async () => {
  try {
    const res = await axios.get<PortfolioGet[]>(`${API_BASE_URL}/api/portfolio`);
    return res;
  } catch (error) {
    handleError(error);
  }
};