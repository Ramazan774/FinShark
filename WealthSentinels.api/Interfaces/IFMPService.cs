using api.Models;

namespace api.Interfaces
{
    public interface IFMPService
    {
        Task<Stock> FindStockBySymbolAsync(string symbol);
        Task<string> SearchCompaniesAsync(string query);
        Task<string> GetCompanyProfileAsync(string query);
        Task<string> GetKeyMetricsAsync(string query);
        Task<string> GetIncomeStatementAsync(string query);
        Task<string> GetBalanceSheetAsync(string query);
        Task<string> GetCashFlowStatementAsync(string query);
        Task<string> GetCompanyPeersAsync(string query);
        Task<string> GetTenKAsync(string symbol, int year, string period);
        Task<string> GetHistoricalMarketCapAsync(string query);
    }
}