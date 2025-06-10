import React from 'react';
import styles from "./style.css";

interface VideoFullbannerProps {
    video: string;
    imageDesktop: string;
    imageMobile: string;
    linkImage?: string;
}

function VideoFullbanner({ video, imageDesktop, imageMobile, linkImage }: VideoFullbannerProps) {
    const isVimeo = video?.includes("vimeo") ?? false;
    const isYoutube = video?.includes("youtube") ?? video?.includes("youtu.be");
    const isDirectVideo = video && !isVimeo && !isYoutube && (video.endsWith('.mp4') || video.endsWith('.webm') || video.endsWith('.ogg'));

    const idAccountVimeo = isVimeo ? video!.split("/").slice(-2, -1)[0] : "";
    const idVideoVimeo = isVimeo ? video!.split("/").pop() : "";
    const idYoutubeVideo = isYoutube && video ? (
        video.includes("v=")
            ? video.split("v=")[1]?.split("&")[0] ?? ""
            : video.split("/").pop()
    ) : "";

    if (video && (idAccountVimeo || idYoutubeVideo || isDirectVideo)) {
        return (
            <div className={styles.ProductVideo}>
                {isVimeo && idAccountVimeo ? (
                    <>
                        <iframe
                            src={`https://player.vimeo.com/video/${idAccountVimeo}?h=${idVideoVimeo}&badge=0&autopause=0&player_id=0&app_id=58479`}
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                            className={styles.ProductVideo__iframe}
                            title="Vimeo Video"
                        ></iframe>
                        <script src="https://player.vimeo.com/api/player.js"></script>
                    </>
                ) : isYoutube && idYoutubeVideo ? (
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
                ) : isDirectVideo ? (
                    <video
                        className={styles.ProductVideo__iframe}
                        poster={imageDesktop}
                        width="100%"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src={video} type="video/mp4" />
                        Seu navegador não suporta o elemento de vídeo.
                    </video>
                ) : null}
            </div>
        );
    }

    // Fallback: mostrar imagens se não houver vídeo
    return (
        <div>
            {linkImage ? (
                <a href={linkImage} target="_blank" rel="noopener noreferrer">
                    <img src={imageDesktop} className={styles.imageDesktop} />
                    <img src={imageMobile} className={styles.imageMobile} />
                </a>
            ) : (
                <>
                    <img src={imageDesktop} className={styles.imageDesktop} />
                    <img src={imageMobile} className={styles.imageMobile} />
                </>
            )}
        </div>
    );
}

VideoFullbanner.schema = {
    title: 'Video Fullbanner',
    type: 'object',
    properties: {
        video: {
            type: 'string',
            title: 'URL Vídeo',
            default: '',
        },
        imageDesktop: {
            type: 'string',
            title: 'Imagem Desktop',
            default: '',
            description: 'Cole a URL',
            widget: {
                "ui:widget": "image-uploader"
            }
        },
        imageMobile: {
            type: 'string',
            title: 'Imagem Mobile',
            default: '',
            description: 'Cole a URL',
            widget: {
                "ui:widget": "image-uploader"
            }
        },
        linkImage: {
            type: 'string',
            title: 'Link da imagem (opcional)',
            default: '',
        }
    }
};

export default VideoFullbanner;