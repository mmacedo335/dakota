import React from 'react';
import styles from "./style.css";

interface VideoFullbannerProps {
    videoDesktop: string;
    videoMobile?: string;
    imageDesktop: string;
    imageMobile: string;
    linkImage?: string;
}

function VideoFullbanner({ videoDesktop, videoMobile, imageDesktop, imageMobile, linkImage }: VideoFullbannerProps) {
    // Detecta se está em mobile de forma reativa
    const [isMobile, setIsMobile] = React.useState<null | boolean>(null);

    React.useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 760);
        }
        setIsMobile(window.innerWidth <= 760); // Detecta no client após hydration
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Enquanto não detectar o device, renderiza um spinner se houver vídeo cadastrado, senão imagem
    if (isMobile === null) {
        // Verifica se há vídeo cadastrado para algum device
        const hasAnyVideo = (videoDesktop && videoDesktop.trim() !== '') || (videoMobile && videoMobile.trim() !== '');
        if (hasAnyVideo) {
            return (
                <div className={styles.blocoSpinner}>
                    <div className={styles.spinner} aria-label="Carregando vídeo..." />
                </div>
            );
        }
        // Se não houver vídeo cadastrado, mostra imagem desktop
        return (
            <div>
                {linkImage ? (
                    <a href={imageDesktop} rel="noopener noreferrer">
                        <img src={imageDesktop} className={styles.imageDesktop} />
                    </a>
                ) : (
                    <img src={imageDesktop} className={styles.imageDesktop} />
                )}
            </div>
        );
    }

    // Funções auxiliares para identificar tipo de vídeo
    const getVideoType = (videoUrl?: string) => {
        if (!videoUrl) return { isVimeo: false, isYoutube: false, isDirectVideo: false };
        const isVimeo = videoUrl.includes("vimeo");
        const isYoutube = videoUrl.includes("youtube") || videoUrl.includes("youtu.be");
        const isDirectVideo = !isVimeo && !isYoutube && (videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm') || videoUrl.endsWith('.ogg'));
        return { isVimeo, isYoutube, isDirectVideo };
    };

    const getVimeoIds = (videoUrl: string) => ({
        idAccountVimeo: videoUrl.split("/").slice(-2, -1)[0],
        idVideoVimeo: videoUrl.split("/").pop()
    });

    const getYoutubeId = (videoUrl: string) => (
        videoUrl.includes("v=")
            ? videoUrl.split("v=")[1]?.split("&")[0] ?? ""
            : videoUrl.split("/").pop() ?? ""
    );

    // Lógica para garantir que só exibe vídeo mobile no mobile e vídeo desktop no desktop
    let videoUrl = '';
    let imageUrl = '';
    if (isMobile) {
        if (videoMobile && videoMobile.trim() !== '') {
            videoUrl = videoMobile;
        }
        imageUrl = imageMobile;
    } else {
        if (videoDesktop && videoDesktop.trim() !== '') {
            videoUrl = videoDesktop;
        }
        imageUrl = imageDesktop;
    }

    const { isVimeo, isYoutube, isDirectVideo } = getVideoType(videoUrl);

    let videoContent: React.ReactNode = null;
    if (videoUrl && (isVimeo || isYoutube || isDirectVideo)) {
        if (isVimeo) {
            const { idAccountVimeo, idVideoVimeo } = getVimeoIds(videoUrl);
            videoContent = (
                <>
                    <iframe
                        src={`https://player.vimeo.com/video/${idAccountVimeo}?h=${idVideoVimeo}&autoplay=1&loop=1&mute=1&background=1`}
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                        className={styles.ProductVideo__iframe}
                        title="Vimeo Video"
                    ></iframe>
                    <script src="https://player.vimeo.com/api/player.js"></script>
                </>
            );
        } else if (isYoutube) {
            const idYoutubeVideo = getYoutubeId(videoUrl);
            videoContent = (
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
            );
        } else if (isDirectVideo) {
            videoContent = (
                <video
                    className={styles.ProductVideo__iframe}
                    poster={imageUrl}
                    width="100%"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src={videoUrl} type="video/mp4" />
                </video>
            );
        }
    }

    // Renderiza vídeo se existir, senão imagem
    if (videoContent) {
        return (
            <div className={styles.ProductVideo} style={{ position: 'relative' }}>
                {videoContent}
                {linkImage && (
                    <a
                        href={linkImage}
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
            </div>
        );
    }

    // Fallback: mostrar imagem
    return (
        <div>
            {linkImage ? (
                <a href={linkImage} rel="noopener noreferrer">
                    <img src={imageUrl} className={isMobile ? styles.imageMobile : styles.imageDesktop} />
                </a>
            ) : (
                <img src={imageUrl} className={isMobile ? styles.imageMobile : styles.imageDesktop} />
            )}
        </div>
    );
}

VideoFullbanner.schema = {
    title: 'Video Fullbanner',
    type: 'object',
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
        }
    }
};

export default VideoFullbanner;