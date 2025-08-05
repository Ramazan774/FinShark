import React, { JSX } from 'react';
import "./Card.css";

interface Props {
  companyName: string;
  ticker:  string;
  price: number;
}

const Card : React.FC<Props> = ({ companyName, ticker, price }: Props) : JSX.Element => {
  return <div className='card'>
    <img
      src=''
      alt='Image'
    />
    <div className='details'>
      <h2>{companyName} ({ticker})</h2>
      <p>${price}</p>
    </div>
    <p className='info'>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut numquam rem sequi laborum recusandae assumenda delectus odio quasi provident ducimus labore repudiandae, fugit earum animi modi deleniti architecto cum ea!
    </p>
  </div>
  
}

export default Card