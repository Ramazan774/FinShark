import React, { useEffect, useState } from 'react'
import { CompanyKeyMetrics } from '../../company';
import { useOutletContext } from 'react-router-dom';
import { getKeyMetrics } from '../../api';
import RatioList from '../RatioList/RatioList';
import Spinner from '../Spinner/Spinner';
import { formatLargeNonMonetaryNumber, formatRatio } from '../../Helpers/NumberFormatting';
import StockComment from '../StockComment/StockComment';

type Props = {};

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) =>
      formatLargeNonMonetaryNumber(company.marketCap),
    subTitle: "Total value of all a company's shares of stock",
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.currentRatioTTM),
    subTitle:
      "Measures the companies ability to pay short term debt obligations",
  },
  {
    label: "Return On Equity",
    render: (company: CompanyKeyMetrics) => formatRatio(company.returnOnEquityTTM),
    subTitle:
      "Return on equity is the measure of a company's net income divided by its shareholder's equity",
  },
  {
    label: "Return On Assets",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.returnOnTangibleAssetsTTM),
    subTitle:
      "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Free Cashflow To Equity",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.freeCashFlowToEquityTTM),
    subTitle:
      "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Enterprise Value TTM",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.enterpriseValueTTM),
    subTitle:
      "Enterprise value indicates a firm's total worth calculated by adding its market capitalization and total debt, and then subtracting its cash and cash equivalents.",
  },
  {
    label: "Working Capital TTM",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.workingCapitalTTM),
    subTitle: "Shows the funds a business needs for daily operations",
  },
  {
    label: "Capex To Revenue TTM",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.capexToRevenueTTM),
    subTitle:
      "Capex is used by a company to aquire, upgrade, and maintain physical assets",
  },
  {
    label: "Graham Number",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.grahamNumberTTM),
    subTitle:
      "This is the upperbouind of the price range that a defensive investor should pay for a stock",
  },
  {
    label: "Net Current Asset Value TTM",
    render: (company: CompanyKeyMetrics) => formatRatio(company.netCurrentAssetValueTTM),
    subTitle:
      "This is the valuation metric that estimates a company's liquidation value by subtracting its total liabilities from its current assets.",
  },
];

const CompanyProfile = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [companyData, setCompanyData] = useState<CompanyKeyMetrics>();
  useEffect(() => {
    const getCompanyKeyRatios = async () => {
      const value = await getKeyMetrics(ticker);
      setCompanyData(value?.data[0]);
    };
    getCompanyKeyRatios();
  }, [ticker]);
  return (
    <>
      {companyData ? (
        <>
          <RatioList data={companyData} config={tableConfig} />
          <StockComment stockSymbol={ticker} />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default CompanyProfile;