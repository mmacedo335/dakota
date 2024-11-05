import React, { useState, useRef, useEffect } from 'react';
//@ts-ignore
import styles from "./style.css";
import { useProduct } from "vtex.product-context";
import Slider from 'react-slick';
import "./slick.css";

interface ProductImage {
    cacheId: string;
    imageId: string;
    imageLabel: string | null;
    imageTag: string;
    imageUrl: string;
    imageText: string | null;
    __typename: string;
}

const ProductGalleryImageZoomMobile: React.FC = () => {
    const productContextValue = useProduct();
    const productImages: ProductImage[] = productContextValue?.product?.items[0]?.images as ProductImage[] || [];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [initialTouch, setInitialTouch] = useState<{ x: number; y: number } | null>(null);

    const openDialog = (index: number) => {
        setCurrentImageIndex(index);
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    };

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
            resetZoom(); // Reset zoom when closing dialog
        }
    };

    const resetZoom = () => {
        setIsZoomed(false);
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    useEffect(() => {
        // Bloquear o scroll do body e html quando o dialogo está aberto
        if (isZoomed) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden'; // Bloqueia o scroll no <html>
        } else {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto'; // Restaura o scroll no <html>
        }

        return () => {
            // Limpar os estilos no desmontagem do componente
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        };
    }, [isZoomed]);

    const handleImageChange = (index: number) => {
        setCurrentImageIndex(index);
        resetZoom(); // Reset zoom when changing image
    };

    const handleDoubleClick = () => {
        setIsZoomed(!isZoomed);
        if (!isZoomed) {
            setScale(2);
            setPosition({ x: 0, y: 0 });
        } else {
            resetZoom();
        }
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
        if (isZoomed) {
            const touch = e.touches[0];
            setInitialTouch({ x: touch.clientX, y: touch.clientY });
        }
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLImageElement>) => {
        if (isZoomed && initialTouch) {
            const touch = e.touches[0];
            const dx = touch.clientX - initialTouch.x;
            const dy = touch.clientY - initialTouch.y;

            setPosition((prev) => ({
                x: prev.x + dx * 0.4,
                y: prev.y + dy * 0.4,
            }));

            setInitialTouch({ x: touch.clientX, y: touch.clientY });
        }
    };

    const settingsSlider = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
    };

    return (
        <div className={styles.ProductGalleryImageZoom}>
            <Slider {...settingsSlider}>
                {productImages.map((image, index) => (
                    <ul className={styles.sliderProductImageGalleryMobile} key={image.imageId}>
                        <li>
                            <img
                                src={image.imageUrl}
                                alt={`Product ${index}`}
                                onClick={() => openDialog(index)}
                            />
                        </li>
                    </ul>
                ))}
            </Slider>

            <dialog ref={dialogRef} className={styles.dialogProductImage}>
                <div className={styles.modalContent}>
                    <button onClick={closeDialog} className={styles.closeButtonProductImage}>
                        <svg fill="none" width="32" height="32" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <use href="#sti-close--line"></use>
                        </svg>
                    </button>
                    <div className={styles.sliderProductImageMobile}>
                        {productImages.map((image, index) => (
                            <img
                                key={image.imageId}
                                src={image.imageUrl}
                                alt={`Slide ${index}`}
                                className={currentImageIndex === index ? styles.activeProductImage : styles.hiddenProductImage}
                                onDoubleClick={handleDoubleClick}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                style={{
                                    transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                                    transition: isZoomed ? 'none' : 'transform 0.5s ease',
                                    width: '100%',
                                    height: 'auto',
                                    maxHeight: '90vh', // Para garantir que caiba na tela
                                }}
                            />
                        ))}
                    </div>
                    <div className={styles.imageControlsProductImage}>
                        <button className={styles.prevImageZoom} onClick={() => handleImageChange((currentImageIndex - 1 + productImages.length) % productImages.length)}>Previous</button>
                        <button className={styles.nextImageZoom} onClick={() => handleImageChange((currentImageIndex + 1) % productImages.length)}>Next</button>
                    </div>

                    <div className={styles.imageIndicator}>
                        {currentImageIndex + 1} / {productImages.length}
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ProductGalleryImageZoomMobile;
