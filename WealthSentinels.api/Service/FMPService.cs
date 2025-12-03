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
            return await GetFMPDataAsync($"https://financialmodelingprep.com/stable/search-symbol?query={query}&apikey={_apiKey}");
        }

        public async Task<string> GetCompanyProfileAsync(string query)
        {
            return await GetFMPDataAsync($"https://financialmodelingprep.com/stable/profile?symbol={query}&apikey={_apiKey}");
        }

        public async Task<string> GetKeyMetricsAsync(string query)
        {
            return await GetFMPDataAsync($"https://financialmodelingprep.com/stable/key-metrics-ttm?symbol={query}&apikey={_apiKey}");
        }
        public async Task<string> GetIncomeStatementAsync(string query)
        {
            return await GetFMPDataAsync($"https://financialmodelingprep.com/stable/income-statement?symbol={query}&apikey={_apiKey}");
        }
        public async Task<string> GetBalanceSheetAsync(string query)
        {
            return await GetFMPDataAsync($"https://financialmodelingprep.com/stable/balance-sheet-statement?symbol={query}&apikey={_apiKey}");
        }

        public async Task<string> GetCashFlowStatementAsync(string query)
        {
            return await GetFMPDataAsync($"https://financialmodelingprep.com/stable/cash-flow-statement?symbol={query}&apikey={_apiKey}");
        }

        public async Task<string> GetCompanyPeersAsync(string query)
        {
            return await GetFMPDataAsync($"https://financialmodelingprep.com/stable/stock-peers?symbol={query}&limit=1&apikey={_apiKey}");
        }

        public async Task<string> GetTenKAsync(string symbol, int year, string period)
        {
            return await GetFMPDataAsync($"https://financialmodelingprep.com/stable/financial-reports-json?symbol={symbol}&year={year}&period={period}&apikey={_apiKey}");
        }

        public async Task<string> GetHistoricalMarketCapAsync(string query)
        {
            return await GetFMPDataAsync($"https://financialmodelingprep.com/stable/historical-market-capitalization?symbol={query}&apikey={_apiKey}");
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