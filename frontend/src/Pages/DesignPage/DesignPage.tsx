import React from 'react';
import Table from '../../Components/Table/Table'
import RatioList from '../../Components/RatioList/RatioList'
import { TestDataCompany } from '../../Components/Table/testData';

type Props = {};

const data = TestDataCompany;

const tableConfig = [
  {
    label: "symbol",
    render: (company: any) => company.symbol,
  }
]

const DesignPage = (props: Props) => {
  return (
    <>
      <h1>FinShark Design Page</h1>
      <h2>This is FinShark's design page. This is where we will house various design aspects of the app</h2>
      <RatioList config={tableConfig} data={data} />
      <Table config={tableConfig} data={data} />
    </>
  )
}

export default DesignPage