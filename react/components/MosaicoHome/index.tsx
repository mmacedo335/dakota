import React, { useState, useEffect } from 'react'
//@ts-ignore
import styles from "./styles.css";

interface MosaicoItemProps {
    videoDesktop: string;
    videoMobile?: string;
    imageDesktop: string;
    imageMobile: string;
    texto?: string;
    linkImage?: string;
}

interface MosaicoHomeProps {
    images?: MosaicoItemProps[];
}

function MosaicoHome({ images = [] }: MosaicoHomeProps) {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 760);
        }
        handleResize(); // Detecta inicial
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isDirectVideo = (videoUrl?: string) => {
        return videoUrl && videoUrl.trim() !== '' &&
            (videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm') || videoUrl.endsWith('.ogg'));
    };

    if (isMobile === null) {
        return (
            <div className={styles.mosaicoContainer}>
                {images.map((item, idx) => (
                    item.linkImage ? (
                        <a key={idx} href={item.linkImage} rel="noopener noreferrer">
                            <img src={item.imageDesktop} alt="" />
                            <p className={styles.mosaicoText}>{item.texto}</p>
                        </a>
                    ) : (
                        <img key={idx} src={item.imageDesktop} alt="" />
                    )
                ))}
            </div>
        );
    }

    return (
        <div className={styles.mosaicoContainer}>
            {images.map((item, idx) => {
                const videoUrl = isMobile ? item.videoMobile : item.videoDesktop;
                const imageUrl = isMobile ? item.imageMobile : item.imageDesktop;

                // Verifica se é um vídeo direto
                if (isDirectVideo(videoUrl)) {
                    return (
                        <div key={idx} className={styles.mosaicoItem} style={{ position: 'relative' }}>
                            <video
                                className={styles.mosaicoVideo}
                                poster={imageUrl}
                                width="100%"
                                autoPlay
                                muted
                                loop
                                playsInline
                            >
                                <source src={videoUrl} type="video/mp4" />
                            </video>
                            {item.linkImage && (
                                <a
                                    href={item.linkImage}
                                    rel="noopener noreferrer"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        zIndex: 2,
                                        display: 'block',
                                        cursor: 'pointer',
                                        background: 'rgba(0,0,0,0)'
                                    }}
                                    aria-label="Abrir link do vídeo"
                                />
                            )}
                            <p className={styles.mosaicoText}>{item.texto}</p>
                        </div>
                    );
                }

                // Fallback para imagem
                return (
                    <div key={idx} className={styles.mosaicoItem}>
                        {item.linkImage ? (
                            <a href={item.linkImage} rel="noopener noreferrer">
                                <img src={imageUrl} alt="" className={styles.mosaicoImage} />
                                <p className={styles.mosaicoText}>{item.texto}</p>
                            </a>
                        ) : (
                            <>
                                <img src={imageUrl} alt="" className={styles.mosaicoImage} />
                                <p className={styles.mosaicoText}>{item.texto}</p>
                            </>

                        )}
                    </div>
                );
            })}
        </div>
    );
}

MosaicoHome.schema = {
    title: 'Mosaico Home',
    type: 'object',
    properties: {
        images: {
            type: 'array',
            title: 'Images',
            items: { //item configuration
                type: 'object',
                title: 'Image',
                properties: {
                    videoDesktop: {
                        type: 'string',
                        title: 'URL Vídeo Desktop',
                        default: '',
                    },
                    videoMobile: {
                        type: 'string',
                        title: 'URL Vídeo Mobile',
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
                        title: 'Link',
                        default: '',
                    },
                    texto: {
                        type: 'string',
                        title: 'Texto',
                        default: ''
                    }
                }
            }
        }
    }
};

export default MosaicoHome;