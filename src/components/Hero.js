import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { FaArrowLeft, FaArrowRight, FaCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { useTranslation } from "react-i18next";
import i18next, { i18n } from "i18next";
import heroBcg from "../assets/hero-bcg.jpeg";
import heroBcg2 from "../assets/hero-bcg-2.jpeg";
import heroBcg3 from "../assets/hero-bcg-3.jpg";

const Hero = () => {
  const { products } = useProductsContext();
  const [activeId, setActiveId] = useState(1);
  const { t } = useTranslation();
  let timeoutId;
  useEffect(() => {
    timeoutId = setTimeout(() => {
      nextImg();
    }, 6000);
  }, [activeId]);

  const nextImg = () => {
    if (activeId === 3) {
      setActiveId(1);
      return;
    }
    setActiveId(activeId + 1);
  };
  const prevImg = () => {
    if (activeId === 1) {
      setActiveId(3);
      return;
    }
    setActiveId(activeId - 1);
  };

  const slideImagesText = [
    {
      text: t("slide_text_1"),
    },
    {
      text: t("slide_text_2"),
    },
    {
      text: t("slide_text_3"),
    },
  ];

  const slideImages = products.slice(0, 3).map((product, i) => {
    return {
      id: i + 1,
      imgUrl: product.image,
      productId: product.id,
      alt: product.name,
      text: slideImagesText[i].text,
    };
  });
  return (
    <Wrapper className="section-center">
      <article className="content">
        <h1>
          The outfits you <br />
          are looking for
        </h1>
        <p>Enjoy shopping from a varied selection of high quality clothes !</p>
      </article>

      <article className="main">
        <button
          className={`left-arrow arrow ${
            i18next.language === "ar" && "rotate"
          }`}
          onClick={() => {
            clearTimeout(timeoutId);
            prevImg();
          }}
        >
          <FaArrowLeft />
        </button>
        {slideImages.map((product) => {
          return (
            <Link
              to={`/products/${product.productId}`}
              className={`slide-image img-${product.id} ${
                activeId === product.id && "active-img"
              }`}
              key={product.id}
            >
              <img
                src={product.imgUrl}
                alt={product.alt}
                // className={`slide-image img-${product.id} ${
                //   activeId === product.id && "active-img"
                // }`}
                className="img"
              />
            </Link>
          );
        })}

        <button
          className={`right-arrow arrow ${
            i18next.language === "ar" && "rotate"
          }`}
          onClick={() => {
            clearTimeout(timeoutId);
            nextImg();
          }}
        >
          <FaArrowRight />
        </button>
        {slideImages.map((product) => {
          return (
            <Link
              to={`/products/${product.productId}`}
              className={`slide-image img-${product.id} ${
                activeId === product.id && "active-img"
              }`}
              key={product.id}
            >
              <img
                src={product.imgUrl}
                alt={product.alt}
                // className={`slide-image img-${product.id} ${
                //   activeId === product.id && "active-img"
                // }`}
                className="img"
              />
            </Link>
          );
        })}
        <div className="dots">
          <button
            className={`dot ${activeId === 1 && "active"}`}
            onClick={() => {
              clearTimeout(timeoutId);
              setActiveId(1);
            }}
          >
            <FaCircle />
          </button>
          <button
            className={`dot ${activeId === 2 && "active"}`}
            onClick={() => {
              clearTimeout(timeoutId);
              setActiveId(2);
            }}
          >
            <FaCircle />
          </button>
          <button
            className={`dot ${activeId === 3 && "active"}`}
            onClick={() => {
              clearTimeout(timeoutId);
              setActiveId(3);
            }}
          >
            <FaCircle />
          </button>
        </div>
        {slideImages.map((product) => {
          return (
            <p
              className={`img-info ${activeId === product.id && "active-img"}`}
              key={product.id}
            >
              {product.text}
            </p>
          );
        })}
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 60vh;

  place-items: center;
  .img-container {
    display: none;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      height: 550px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
    }
    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 250px;
      transform: translateX(-50%);
      border-radius: var(--radius);
    }
    .img-container::before {
      content: "";
      position: absolute;
      width: 10%;
      height: 80%;
      background: var(--clr-primary-9);
      bottom: 0%;
      left: -8%;
      border-radius: var(--radius);
    }
  }

  .main {
    display: grid;
    /* grid-template-columns:
      [left-arrow-start] 4rem [left-arrow-end img-start] minmax(900px, 70vw)
      [img-end right-arrow-start] 4rem [right-arrow-end]; */

    grid-template-columns:
      [left-arrow-start]1fr [left-arrow-end img-start] 900px
      [img-end right-arrow-start] 1fr [right-arrow-end];
    grid-template-rows: 30rem 3rem 1rem;
    /* margin-bottom: 100px; */
    justify-content: center;
    padding-top: 4rem;
    /* align-self: center;
    justify-self: center; */
  }

  .content {
    display: none;
    grid-column: 1 / 3;
  }
  .slide-image {
    width: 100%;
    /* max-width: 100px; */
    /* min-width: 300px; */
    height: 100%;
    /* display: none; */
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    grid-column: img-start / img-end;
    grid-row: 1 / 2;
    border-radius: 4px;
    padding: 0 1rem;
  }
  .img {
    width: 100%;
    /* max-width: 1400px; */
    height: 100%;
    /* min-width: 800px; */
  }
  .dots {
    grid-column: img-start / img-end;
    justify-self: center;
    display: flex;
    align-items: center;
  }
  .dot {
    background: transparent;
    border: none;

    transition: all 0.3s;
    color: black;
    cursor: pointer;
    /* &:not(:last-child) {
      margin-right: 8px;
    } */
    /* color: grey; */
    margin: 5px;
    opacity: 0.5;
  }
  .arrow {
    align-self: center;
    background: transparent;
    border: none;
    cursor: pointer;
    display: block;
  }
  .left-arrow {
    grid-column: left-arrow-start / img-start;
  }

  .right-arrow {
    grid-column: right-arrow-start / right-arrow-end;
  }
  .img-info {
    grid-column: img-start / img-end;
    grid-row: 3 /4;
    justify-self: center;
    visibility: hidden;
    opacity: 0;
  }
  .rotate {
    rotate: 180deg;
  }

  .active {
    opacity: 1;
  }

  .active-img {
    opacity: 1;
    visibility: visible;
    .img {
      object-fit: cover;
    }
  }

  @media (max-width: 990px) {
    .main {
      grid-template-columns: [left-arrow-start]1fr [left-arrow-end img-start] 700px [img-end right-arrow-start] 1fr [right-arrow-end];
    }
  }

  @media (max-width: 800px) {
    .main {
      grid-template-columns: [left-arrow-start]1fr [left-arrow-end img-start] 500px [img-end right-arrow-start] 1fr [right-arrow-end];
    }
  }
  @media (max-width: 555px) {
    .main {
      grid-template-columns: [img-start] 350px [img-end];
    }
    .arrow {
      display: none;
    }
    .slide-image {
      padding: 0;
    }
  }
  @media (max-width: 400px) {
    .main {
      grid-template-columns: [img-start] 250px [img-end];
    }
  }
`;

export default Hero;
