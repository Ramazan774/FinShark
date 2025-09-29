import axios from "axios"
import { 
  CompanyBalanceSheet, 
  CompanyCashFlow, 
  CompanyCompData, 
  CompanyHistoricalDividend, 
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
      // `https://financialmodelingprep.com/stable/search-symbol?query=${query}&apikey=${process.env.REACT_APP_API_KEY}`
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
      // `https://financialmodelingprep.com/stable/profile?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
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
      // `https://financialmodelingprep.com/stable/key-metrics-ttm?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
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
      // `https://financialmodelingprep.com/stable/income-statement?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
    )
    return data;
  } catch(error: any) {
    console.log("error message from API: ", error.message);
  }
};

export const getBalanceSheet = async (query: string) => {
  try {
    const data = await axios.get<CompanyBalanceSheet[]>(
      `${API_BASE_URL}/api/stock/balance-sheet/${query}`
      // `https://financialmodelingprep.com/stable/balance-sheet-statement?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
    )
    return data;
  } catch(error: any) {
    console.log("error message from API: ", error.message);
  }
};

export const getCashFlowStatement = async (query: string) => {
  try {
    const data = await axios.get<CompanyCashFlow[]>(
      `${API_BASE_URL}/api/stock/cash-flow/${query}`
      // `https://financialmodelingprep.com/stable/cash-flow-statement?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
    )
    return data;
  } catch(error: any) {
    console.log("error message from API: ", error.message);
  }
};

export const getCompData = async (query: string) => {
  try {
    const data = await axios.get<CompanyCompData[]>(
      `${API_BASE_URL}/api/stock/peers/${query}`
      // `https://financialmodelingprep.com/stable/stock-peers?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
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
      // `https://financialmodelingprep.com/stable/sec-filings-search/symbol?symbol=${query}&from=2025-01-01&to=2025-12-31&page=0&limit=10&apikey=${process.env.REACT_APP_API_KEY}`
    )
    return data;
  } catch(error: any) {
    console.log("error message from API: ", error.message);
  }
};

export const getHistoricalDivident = async (query: string) => {
  try {
    const data = await axios.get<CompanyHistoricalDividend[]>(
      `${API_BASE_URL}/api/stock/historical-divident/${query}`
      // `https://financialmodelingprep.com/stable/sec_filings-company-search/symbol?symbol=${query}?type=10-k&page=0&apikey=${process.env.REACT_APP_API_KEY}`
    )
    return data;
  } catch(error: any) {
    console.log("error message from API: ", error.message);
  }
};