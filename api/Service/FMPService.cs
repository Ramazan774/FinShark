using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Stock;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Newtonsoft.Json;

namespace api.Service
{
    public class FMPService : IFMPService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;
        private readonly string _apiKey;
        public FMPService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
            _apiKey = _config["FMPKey"];
        }
        public async Task<Stock> FindStockBySymbolAsync(string symbol)
        {
            try
            {
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/profile?symbol={symbol}&apikey={_apiKey}");
                if (result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    var tasks = JsonConvert.DeserializeObject<FMPStock[]>(content);
                    var stock = tasks?[0];
                    if (stock != null)
                    {
                        return stock.ToStockFromFMP();
                    }
                    return null;
                }
                return null;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public async Task<string> SearchCompaniesAsync(string query)
        {
            return await GetFMPDataAsync($"https://financialmodelingprep.com/stable/search?query={query}&apikey={_apiKey}");
        }

        public async Task<string> GetCompanyProfileAsync(string symbol)
        {
            return await GetFMPDataAsync($"https://financialmodelingprep.com/stable/profile/{symbol}?apikey={_apiKey}");
        }

        public async Task<string> GetKeyMetricsAsync(string symbol)
        {
            return await GetFMPDataAsync($"https://financialmodelingprep.com/stable/key-metrics-ttm/{symbol}?apikey={_apiKey}");
        }
        public async Task<string> GetIncomeStatementAsync(string symbol)
        {
            return await GetFMPDataAsync($"https://financialmodelingprep.com/stable/income-statement/{symbol}?apikey={_apiKey}");
        }
        public async Task<string> GetBalanceSheetAsync(string symbol)
        {
            return await GetFMPDataAsync($"https://financialmodelingprep.com/stable/balance-sheet-statement/{symbol}?apikey={_apiKey}");
        }

        public async Task<string> GetCashFlowStatementAsync(string symbol)
        {
            return await GetFMPDataAsync($"https://financialmodelingprep.com/stable/cash-flow-statement/{symbol}?apikey={_apiKey}");
        }

        public async Task<string> GetCompanyPeersAsync(string symbol)
        {
            return await GetFMPDataAsync($"https://financialmodelingprep.com/stable/stock_peers?symbol={symbol}&apikey={_apiKey}");
        }

        public async Task<string> GetTenKAsync(string symbol)
        {
            return await GetFMPDataAsync($"https://financialmodelingprep.com/stable/sec_filings/{symbol}?type=10-K&page=0&apikey={_apiKey}");
        }

        public async Task<string> GetHistoricalDividendAsync(string symbol)
        {
            return await GetFMPDataAsync($"https://financialmodelingprep.com/stable/historical-price-full/stock_dividend/{symbol}?apikey={_apiKey}");
        }
        private async Task<string> GetFMPDataAsync(string url)
        {
            try
            {
                var result = await _httpClient.GetAsync(url);
                if (result.IsSuccessStatusCode)
                {
                    return await result.Content.ReadAsStringAsync();
                }
                return null;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }
  };
};