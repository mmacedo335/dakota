import React, { useEffect, useState } from "react";
import type { ProductTypes } from "vtex.product-context";
import { useProduct } from "vtex.product-context";
import { useQuery } from "react-apollo";
import { useCssHandles } from "vtex.css-handles";
import { useRuntime } from "vtex.render-runtime";
import { Link } from "vtex.render-runtime";
import Slider from "react-slick";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import productRecommendationsQuery from "../../queries/productRecommendations.gql";

interface SimilarProductsVariantsProps {
  productQuery: {
    product: {
      productId: string;
    };
  };
  imageLabel: string;
}

const CSS_HANDLES = [
  "variants",
  "title",
  "var-wrap",
  "img_wrap",
  "img",
] as const;

export function SimilarProductsVariants({
  productQuery,
  imageLabel,
}: SimilarProductsVariantsProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1440);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsLargeScreen(window.innerWidth > 1440);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    useEffect(() => {
        const slider = document.querySelector(".dakota-dakota-theme-6-x-variants");
      
        if (!slider) return;
      
        const stopPropagation = (event: Event) => {
          console.log("Clique bloqueado no slider! 🚫", event.target);
          event.stopPropagation();
        };
      
        // Bloqueia cliques nas setas de navegação do slider
        const nextButton = slider.querySelector(".slick-next");
        const prevButton = slider.querySelector(".slick-prev");
        
        if (nextButton) nextButton.addEventListener("click", stopPropagation);
        if (prevButton) prevButton.addEventListener("click", stopPropagation);
      
        // Bloqueia cliques dentro dos slides
        const slides = slider.querySelectorAll(".slick-slide");
        slides.forEach(slide => slide.addEventListener("click", stopPropagation));
      
        return () => {
          if (nextButton) nextButton.removeEventListener("click", stopPropagation);
          if (prevButton) prevButton.removeEventListener("click", stopPropagation);
          slides.forEach(slide => slide.removeEventListener("click", stopPropagation));
        };
      }, []);

  const { handles } = useCssHandles(CSS_HANDLES);
  const productContext = useProduct();
  const { route } = useRuntime();
  const productId =
    productQuery?.product?.productId ?? productContext?.product?.productId;

  const { data, loading, error } = useQuery(productRecommendationsQuery, {
    variables: {
      identifier: { field: "id", value: productId },
      type: `similars`,
    },
    skip: !productId,
  });

  if (loading || error) return null;

  const { productRecommendations } = data;
  const { products } = { products: productRecommendations || [] };

  const unique = [
    ...new Set<string>(
      products.map((item: ProductTypes.Product) => item.productId)
    ),
  ];

  const items: ProductTypes.Product[] = [];

  unique.forEach((id) => {
    const item = products.find(
      (element: ProductTypes.Product) => element.productId === id
    );

    if (item) items.push(item);
  });

  if (items.length === 0) {
    return null;
  }

  const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        className="custom-arrow custom-next"
        onClick={(event) => {
          event.stopPropagation(); // Impede que o clique propague
          onClick && onClick(event);
        }}
      >
         <svg
          fill="none"
          width="10"
          height="10"
          viewBox="0 0 16 16"
          className="vtex-search-result-3-x-caretIcon" // Corrigido: className ao invés de class
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    );
  };
  
  const CustomPrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        className="custom-arrow custom-prev"
        onClick={(event) => {
          event.stopPropagation();
          onClick && onClick(event);
        }}
      >
       <svg
          fill="none"
          width="10"
          height="10"
          viewBox="0 0 16 16"
          className="vtex-search-result-3-x-caretIcon" // Corrigido: className ao invés de class
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    );
  };
  

  // Configuração do slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? (items.length > 2 ? 2 : items.length) 
    : isLargeScreen ? (items.length > 4 ? 4 : items.length) 
    : (items.length > 3 ? 3 : items.length), // Regra para telas grandes
    slidesToScroll: 1,
    centerMode: true, // Ativa a centralização
    centerPadding: "0px", // Remove margem lateral para centralizar melhor
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: items.length > 2 ? 2 : items.length, // Mostra até 2 no mobile
          slidesToScroll: 1,
        },
      },
    ],
  };

  const shouldUseSlider = isMobile ? items.length > 2 : items.length > 3;

  return (
    <div className={handles.variants}>
      {shouldUseSlider ? (
        <Slider {...settings}>
          {items.map((element: ProductTypes.Product) => {
            const imageIndex =
              imageLabel === undefined
                ? 0
                : element.items[0].images.findIndex(
                    (image) => image.imageLabel === imageLabel
                  ) === -1
                ? 0
                : element.items[0].images.findIndex(
                    (image) => image.imageLabel === imageLabel
                  );

            const srcImage = element.items[0].images[imageIndex].imageUrl;
            return (
              <div key={element.productId} className={handles["img-wrap"]}>
                <Link
                  className={`${handles.img_wrap} ${
                    route?.params?.slug === element.linkText
                      ? "--is-active"
                      : ""
                  }`}
                  {...{
                    page: "store.product",
                    params: {
                      slug: element?.linkText,
                      id: element?.productId,
                    },
                  }}
                >
                  <img
                    src={srcImage}
                    alt={element.productName}
                    height="50px"
                    className={`${handles.img} mr3 ${
                      route?.params?.slug === element.linkText ? "o-50" : ""
                    }`}
                  />
                </Link>
              </div>
            );
          })}
        </Slider>
      ) : (
        <div className={handles["var-wrap"]}>
          {items.map((element: ProductTypes.Product) => {
            const imageIndex =
              imageLabel === undefined
                ? 0
                : element.items[0].images.findIndex(
                    (image) => image.imageLabel === imageLabel
                  ) === -1
                ? 0
                : element.items[0].images.findIndex(
                    (image) => image.imageLabel === imageLabel
                  );

            const srcImage = element.items[0].images[imageIndex].imageUrl;
            return (
              <Link
                key={element.productId}
                className={`${handles.img_wrap} ${
                  route?.params?.slug === element.linkText ? "--is-active" : ""
                }`}
                {...{
                  page: "store.product",
                  params: {
                    slug: element?.linkText,
                    id: element?.productId,
                  },
                }}
              >
                <img
                  src={srcImage}
                  alt={element.productName}
                  height="50px"
                  className={`${handles.img} mr3 ${
                    route?.params?.slug === element.linkText ? "o-50" : ""
                  }`}
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

SimilarProductsVariants.schema = {
  title: "SimilarProducts Variants",
  description: "SimilarProducts Variants",
  type: "object",
  properties: {},
};
