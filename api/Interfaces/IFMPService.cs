using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IFMPService
    {
        Task<Stock> FindStockBySymbolAsync(string symbol);
        Task<string> SearchCompaniesAsync(string query);
        Task<string> GetCompanyProfileAsync(string symbol);
        Task<string> GetKeyMetricsAsync(string symbol);
        Task<string> GetIncomeStatementAsync(string symbol);
        Task<string> GetBalanceSheetAsync(string symbol);
        Task<string> GetCashFlowStatementAsync(string symbol);
        Task<string> GetCompanyPeersAsync(string symbol);
        Task<string> GetTenKAsync(string symbol);
        Task<string> GetHistoricalDividendAsync(string symbol);
    }
}