import React, { useEffect, useState } from 'react';
import ColorNamer from 'color-namer';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductsContext } from '../context/products_context';
import { single_product_url as url } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useElements } from '@stripe/react-stripe-js';

const SingleProductPage = () => {
  if(localStorage.getItem('pending')) localStorage.removeItem('pending') 
  const [mainColor, setMainColor] = useState('#000');
  const [size, setSize] = useState('');
  const [colors, setColors] = useState(['']);
  const [changeState, setChangeState] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();
  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
  }, [id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate.push('/');
      }, 3000);
    }
  }, [error]);

  if (loading) return <Loading />;

  const {
    name,
    price,
    description,
    stock,
    size: productSize,
    stars,
    reviews,
    id: sku,
    multicolor,
    images,
  } = product;
  let colorDisplay;
  if (mainColor.includes(' ')) {
    colorDisplay = mainColor
      .split(' ')
      .map((color) =>
        ColorNamer(color).ntc[0].name.toLowerCase().replaceAll(' ', '')
      )
      .join('and');
  } else {
    colorDisplay = mainColor;
  }
  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>

            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available : </span>
              {stock === 0
                ? 'Out Of Stock'
                : product[
                    `${
                      mainColor.includes(' ') ? colorDisplay : mainColor
                    }${size}stock`
                  ] > 0
                ? 'In Stock'
                : 'Out Of Stock'}

              {}
            </p>
            <p className="info">
              <span>SKU : </span>
              {sku}
            </p>
            <p className="info">
              <span>
                Size :
                {
                  <select
                    name="size"
                    value={size}
                    onChange={(e) => {
                      setSize(e.target.value);
                      setChangeState(e.target.value);
                    }}
                    className="size"
                  >
                    {productSize?.map((size, i) => {
                      return (
                        <option key={i} value={size}>
                          {size}
                        </option>
                      );
                    })}
                  </select>
                }
              </span>
            </p>
            <hr />
            {stock > 0 && (
              <AddToCart
                product={product}
                setMainColor={setMainColor}
                mainColor={mainColor}
                setColors={setColors}
                size={size}
                setSize={setSize}
                multicolor={multicolor}
                colorDisplay={colorDisplay}
                setChangeState={setChangeState}
                changeState={changeState}
              />
            )}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
    .size {
      background: var(--clr-grey-10);
      border-radius: var(--radius);
      border-color: transparent;
      padding: 0.25rem;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
