import React, { useState, useRef } from 'react';
//@ts-ignore
import styles from "./style.css";
//@ts-ignore
import { useProduct } from "vtex.product-context";

interface ProductImage {
    cacheId: string;
    imageId: string;
    imageLabel: string | null;
    imageTag: string;
    imageUrl: string;
    imageText: string | null;
    __typename: string;
}

const ProductGalleryImageZoomDesktop: React.FC = () => {
    const productContextValue = useProduct();
    const productImages: ProductImage[] = productContextValue?.product?.items[0]?.images as ProductImage[] || [];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const openDialog = (index: number) => {
        setCurrentImageIndex(index);
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    };

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    const handleImageChange = (index: number) => {
        setCurrentImageIndex(index);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        const { left, top, width, height } = img.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        const xPercent = (x / width) * 100;
        const yPercent = (y / height) * 100;

        img.style.transform = `scale(2)`;
        img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLImageElement>) => {
        e.currentTarget.style.transform = `scale(1)`;
    };

    return (
        <div className={styles.ProductGalleryImageZoom}>
            <div className={styles.imageListProductImage}>
                {productImages.map((image, index) => (
                    <img
                        key={image.imageId}
                        src={image.imageUrl}
                        alt={`Product ${index}`}
                        onClick={() => openDialog(index)}
                    />
                ))}
            </div>

            <dialog ref={dialogRef} className={styles.dialogProductImage}>
                <div className={styles.modalContent}>
                    <button onClick={closeDialog} className={styles.closeButtonProductImage}>
                        <svg fill="none" width="32" height="32" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" >
                            <use href="#sti-close--line"></use>
                        </svg>
                    </button>
                    <div className={styles.sliderProductImage}>
                        {productImages.map((image, index) => (
                            <img
                                key={image.imageId}
                                src={image.imageUrl}
                                alt={`Slide ${index}`}
                                className={currentImageIndex === index ? styles.activeProductImage : styles.hiddenProductImage}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
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

export default ProductGalleryImageZoomDesktop;
