import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useCartContext } from '../context/cart_context';
import AmountButtons from './AmountButtons';
import ColorNamer from 'color-namer';
const AddToCart = ({
  product,
  setMainColor,
  mainColor,
  setColors,
  setSize,
  size,
  multicolor,
  colorDisplay,
  setChangeState,
  changeState,
}) => {
  const { addToCart } = useCartContext();
  const { id, stock, colors, size: sizes } = product;
  const [amount, setAmount] = useState(1);
  const [colorHex, setColorHex] = useState('');
  useEffect(() => {
    if (multicolor) {
      const multiColorName = multicolor[0]
        .split(' ')
        .map((color) =>
          ColorNamer(color).ntc[0].name.toLowerCase().replaceAll(' ', '')
        )
        .join('and');
      setMainColor(multiColorName);

      setSize(sizes[0]);
      setColors(colors);
      setColorHex(multicolor[0]);
      return;
    }
    setMainColor(
      ColorNamer(colors[0]).ntc[0].name.toLowerCase().replaceAll(' ', '')
    );
    setSize(sizes[0]);
    setColors(colors);
    setColorHex(colors[0]);
  }, []);

  useEffect(() => {
    if (changeState.includes(' ')) {
      if (amount > product[`${colorDisplay}${size}stock`])
        setAmount(product[`${colorDisplay}${size}stock`]);
      return;
    }

    if (amount > product[`${mainColor}${size}stock`]) {
      setAmount(product[`${mainColor}${size}stock`]);
    }
  }, [changeState]);

  const increase = () => {
    if (multicolor && amount + 1 > product[`${colorDisplay}${size}stock`])
      return;

    if (amount + 1 > product[`${mainColor}${size}stock`]) return;
    setAmount(amount + 1);
  };
  const decrease = () => {
    if (amount - 1 === 0) return;
    setAmount(amount - 1);
  };
  return (
    <Wrapper>
      <div className="colors">
        <span>colors: </span>
        <div>
          {colors.map((color, i) => {
            const colorName = ColorNamer(color)
              .ntc[0].name.toLowerCase()
              .replaceAll(' ', '');
            if (
              product[`${colorName}smallstock`] === 0 &&
              product[`${colorName}largestock`] === 0
            ) {
              return;
            }
            return (
              <button
                key={i}
                className={`color-btn ${colorName === mainColor && 'active'}`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  setMainColor(colorName);
                  setChangeState(color);
                  setColorHex(color);
                }}
              >
                {colorName === mainColor ? <FaCheck /> : ''}
              </button>
            );
          })}
          {multicolor &&
            multicolor.map((colors, i) => {
              return (
                <button
                  name="color"
                  className={`multi-color-btn ${
                    colors === mainColor ? 'active-multi' : ''
                  }`}
                  key={i}
                  onClick={() => {
                    setMainColor(colors);
                    setChangeState(colors);
                    setColorHex(colors);
                  }}
                >
                  {colors.split(' ').map((color, i) => {
                    return (
                      <a
                        key={i}
                        className="color-btn"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          setMainColor(colors);
                          setChangeState(colors);
                          setColorHex(colors);
                        }}
                      ></a>
                    );
                  })}
                </button>
              );
            })}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        <Link
          to="/cart"
          className="btn"
          onClick={() => {
            if(amount === 0) return
            if (mainColor.includes(' ')) {
              const multiColorName = mainColor
                .split(' ')
                .map((color) =>
                  ColorNamer(color)
                    .ntc[0].name.toLowerCase()
                    .replaceAll(' ', '')
                )
                .join('and');

              addToCart(id, multiColorName, colorHex, amount, product, size);
              return;
            }
            addToCart(id, mainColor, colorHex, amount, product, size);
          }}
        >
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    background-color: #696969;
    border-radius: 30px;
    padding: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .multi-color-btn {
    display: flex;
    border-radius: 15px;
    padding: 0.1rem;
    padding-top: 0.3rem;
    padding-left: 0.5rem;
    padding-bottom: 0.3rem;
    border-style: solid;
    border-color: #222;
    border-width: 0.15rem;
    background-color: #696969;
    cursor: pointer;
    opacity: 0.75;
  }
  .active-multi {
    opacity: 1;
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
