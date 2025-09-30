using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Stock;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/stock")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IStockRepository _stockRepo;
        private readonly IFMPService _fmpService;

        public StockController(ApplicationDBContext context, IStockRepository stockRepo, IFMPService fmpService)
        {
            _stockRepo = stockRepo;
            _context = context;
            _fmpService = fmpService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var stocks = await _stockRepo.GetAllAsync(query);

            var stockDto = stocks.Select(s => s.ToStockDto()).ToList();

            return Ok(stockDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var stock = await _stockRepo.GetByIdAsync(id);

            if (stock == null)
            {
                return NotFound();
            }

            return Ok(stock.ToStockDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStockRequestDto stockDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var stockModel = stockDto.ToStockFromCreateDTO();
            await _stockRepo.CreateAsync(stockModel);
            return CreatedAtAction(nameof(GetById), new { id = stockModel.Id }, stockModel.ToStockDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateStockRequestDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var stockModel = await _stockRepo.UpdateAsync(id, updateDto);

            if (stockModel == null)
            {
                return NotFound();
            }

            return Ok(stockModel.ToStockDto());

        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var stockModel = await _stockRepo.DeleteAsync(id);

            if (stockModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
        
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _fmpService.SearchCompaniesAsync(query);
            return result != null ? Content(result, "application/json") : NotFound();
        }

        [HttpGet("profile/{symbol}")]
        public async Task<IActionResult> GetProfile([FromRoute] string symbol)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _fmpService.GetCompanyProfileAsync(symbol);
            return result != null ? Content(result, "application/json") : NotFound();
        }

        [HttpGet("key-metrics/{symbol}")]
        public async Task<IActionResult> GetKeyMetrics([FromRoute] string symbol)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _fmpService.GetKeyMetricsAsync(symbol);
            return result != null ? Content(result, "application/json") : NotFound();
        }

        [HttpGet("income-statement/{symbol}")]
        public async Task<IActionResult> GetIncomeStatement([FromRoute] string symbol)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _fmpService.GetIncomeStatementAsync(symbol);
            return result != null ? Content(result, "application/json") : NotFound();
        }

        [HttpGet("balance-sheet-statement/{symbol}")]
        public async Task<IActionResult> GetBalanceSheet([FromRoute] string symbol)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _fmpService.GetBalanceSheetAsync(symbol);
            return result != null ? Content(result, "application/json") : NotFound();
        }

        [HttpGet("cash-flow-statement/{symbol}")]
        public async Task<IActionResult> GetCashFlow([FromRoute] string symbol)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _fmpService.GetCashFlowStatementAsync(symbol);
            return result != null ? Content(result, "application/json") : NotFound();
        }

        [HttpGet("stock-peers/{symbol}")]
        public async Task<IActionResult> GetPeers([FromRoute] string symbol)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _fmpService.GetCompanyPeersAsync(symbol);
            return result != null ? Content(result, "application/json") : NotFound();
        }

        [HttpGet("ten-k/{symbol}")]
        public async Task<IActionResult> GetTenK([FromRoute] string symbol)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _fmpService.GetTenKAsync(symbol);
            return result != null ? Content(result, "application/json") : NotFound();
        }

        [HttpGet("historical-market-capitalization/{symbol}")]
        public async Task<IActionResult> GetHistoricalDividend([FromRoute] string symbol)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _fmpService.GetHistoricalMarketCapAsync(symbol);
            return result != null ? Content(result, "application/json") : NotFound();
        }
    };
};