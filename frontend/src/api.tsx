import axios from "axios"
import { 
  CompanyBalanceSheet, 
  CompanyCashFlow, 
  CompanyCompData, 
  CompanyHistoricalMarketCap, 
  CompanyIncomeStatement, 
  CompanyKeyMetrics, 
  CompanyProfile, 
  CompanySearch, 
  CompanyTenK 
} from "./company";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5278";

interface SearchResponse {
  data: CompanySearch[];
}

export const searchCompanies = async (query: string) => {
  try {
    const data = await axios.get<SearchResponse>(
      `${API_BASE_URL}/api/stock/search?query=${query}`
    );
    return data;
  } catch(error) {
    if(axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error has occurred.";
    }
  }
};

export const getCompanyProfile = async (query: string) => {
  try {
    const data = await axios.get<CompanyProfile[]>(
      `${API_BASE_URL}/api/stock/profile/${query}`
    )
    return data;
  } catch(error: any) {
    console.log("error message from API: ", error.message);
  }
};

export const getKeyMetrics = async (query: string) => {
  try {
    const data = await axios.get<CompanyKeyMetrics[]>(
      `${API_BASE_URL}/api/stock/key-metrics/${query}`
    )
    return data;
  } catch(error: any) {
    console.log("error message from API: ", error.message);
  }
};

export const getIncomeStatement = async (query: string) => {
  try {
    const data = await axios.get<CompanyIncomeStatement[]>(
      `${API_BASE_URL}/api/stock/income-statement/${query}`
    )
    return data;
  } catch(error: any) {
    console.log("error message from API: ", error.message);
  }
};

export const getBalanceSheet = async (query: string) => {
  try {
    const data = await axios.get<CompanyBalanceSheet[]>(
      `${API_BASE_URL}/api/stock/balance-sheet-statement/${query}`
    )
    return data;
  } catch(error: any) {
    console.log("error message from API: ", error.message);
  }
};

export const getCashFlowStatement = async (query: string) => {
  try {
    const data = await axios.get<CompanyCashFlow[]>(
      `${API_BASE_URL}/api/stock/cash-flow-statement/${query}`
    )
    return data;
  } catch(error: any) {
    console.log("error message from API: ", error.message);
  }
};

export const getCompData = async (query: string) => {
  try {
    const data = await axios.get<CompanyCompData[]>(
      `${API_BASE_URL}/api/stock/stock-peers/${query}`
    )
    return data;
  } catch(error: any) {
    console.log("error message from API: ", error.message);
  }
};

export const getTenK = async (query: string) => {
  try {
    const data = await axios.get<CompanyTenK[]>(
      `${API_BASE_URL}/api/stock/ten-k/${query}`
    )
    return data;
  } catch(error: any) {
    console.log("error message from API: ", error.message);
  }
};

export const getHistoricalMarketCap = async (query: string) => {
  try {
    const data = await axios.get<CompanyHistoricalMarketCap[]>(
      `${API_BASE_URL}/api/stock/historical-market-capitalization/${query}`
    )
    return data;
  } catch(error: any) {
    console.log("error message from API: ", error.message);
  }
};