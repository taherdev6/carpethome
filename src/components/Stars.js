import React from 'react';
import styled from 'styled-components';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
const Stars = ({ stars, reviews }) => {
  const numArr = new Array(6).fill('a');

  return (
    <Wrapper>
      <div className="stars">
        {numArr.map((_, i) => {
          if (i === 0) return;
          return (
            <span key={i}>
              {stars >= i ? (
                <BsStarFill />
              ) : stars >= i - 0.5 ? (
                <BsStarHalf />
              ) : (
                <BsStar />
              )}
            </span>
          );
        })}
      </div>
      <p className="reviews">({reviews} customer reviews)</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
