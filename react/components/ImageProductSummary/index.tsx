import React from 'react';
import { useProduct } from 'vtex.product-context';
import styles from './styles.css';

import Slider from 'react-slick';
import "./slick.css";

const ImageProductSummary = () => {
    const productContextValue = useProduct();
    const images = productContextValue?.selectedItem?.images || [];

    // Limita o array de imagens para no máximo 3 elementos
    const displayImages = images.slice(0, 3);

    const settingsSlider = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true
    };

    return (
        <div className={styles.imageContainer}>
            <Slider {...settingsSlider}>
                {displayImages.length > 0 && displayImages.map((image, index) => (
                    <img
                        key={index}
                        src={image.imageUrl}
                        alt={`Product Image ${index + 1}`}
                        className={styles.productImage}
                    />
                ))}
            </Slider>
        </div>
    );
}

export default ImageProductSummary;