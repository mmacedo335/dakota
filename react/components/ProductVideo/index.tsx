import React, { useState, useEffect } from "react";
//@ts-ignore
import { useProduct } from "vtex.product-context";

const ProductVideo = () => {
    const productContextValue = useProduct();
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    useEffect(() => {
        if (productContextValue?.selectedItem?.videos.length >= 1) {
            const url = productContextValue.selectedItem.videos[0]?.videoUrl;
            const videoId = url.split("=").pop();
            const video = `https://www.youtube.com/embed/${videoId}`;
            setVideoUrl(video);
        }
    }, [productContextValue]);

    if (!videoUrl) return null; 

    return (
        <div className="video-produto">
            <iframe
                width="100%"
                height="580"
                src={videoUrl}
                title=""
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
        </div>
    );
};

export default ProductVideo;
