import React, { useState, useRef } from "react";
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
  const productImages: ProductImage[] =
    (productContextValue?.product?.items[0]?.images as ProductImage[]) || [];

  const productVideo =
    productContextValue?.product?.items?.[0]?.videos?.[0]?.videoUrl;
  const isVimeo = productVideo?.includes("vimeo") ?? false;
  const idAccountVimeo = isVimeo
    ? productVideo!.split("/").slice(-2, -1)[0]
    : "";
  const idVideoVimeo = isVimeo ? productVideo!.split("/").pop() : "";
  const idYoutubeVideo =
    !isVimeo && productVideo ? productVideo.split("v=")[1] ?? "" : "";

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
        {idAccountVimeo || idYoutubeVideo ? (
          <div className={styles.ProductVideo}>
            {productVideo && isVimeo && idAccountVimeo ? (
              <>
                <iframe
                  src={`https://player.vimeo.com/video/${idAccountVimeo}?h=${idVideoVimeo}&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  className={styles.ProductVideo__iframe}
                  title="Vimeo Video"
                ></iframe>
                <script src="https://player.vimeo.com/api/player.js"></script>
              </>
            ) : (
              idYoutubeVideo && (
                <iframe
                  width="560"
                  height="330"
                  src={`https://www.youtube.com/embed/${idYoutubeVideo}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className={styles.ProductVideo__iframe}
                ></iframe>
              )
            )}
          </div>
        ) : null}
      </div>

      <dialog ref={dialogRef} className={styles.dialogProductImage}>
        <div className={styles.modalContent}>
          <button
            onClick={closeDialog}
            className={styles.closeButtonProductImage}
          >
            <svg
              fill="none"
              width="32"
              height="32"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use href="#sti-close--line"></use>
            </svg>
          </button>
          <div className={styles.sliderProductImage}>
            {productImages.map((image, index) => (
              <img
                key={image.imageId}
                src={image.imageUrl}
                alt={`Slide ${index}`}
                className={
                  currentImageIndex === index
                    ? styles.activeProductImage
                    : styles.hiddenProductImage
                }
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
          <div className={styles.imageControlsProductImage}>
            <button
              className={styles.prevImageZoom}
              onClick={() =>
                handleImageChange(
                  (currentImageIndex - 1 + productImages.length) %
                    productImages.length
                )
              }
            >
              Previous
            </button>
            <button
              className={styles.nextImageZoom}
              onClick={() =>
                handleImageChange(
                  (currentImageIndex + 1) % productImages.length
                )
              }
            >
              Next
            </button>
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
