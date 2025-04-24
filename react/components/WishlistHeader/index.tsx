import React, { useEffect, useState } from 'react';
import style from './style.css'
import { useRenderSession } from 'vtex.session-client'

const WishlistHeader = () => {

    const { session } = useRenderSession();
    const isAuthenticated = (session as any)?.namespaces?.profile?.isAuthenticated?.value === 'true';

    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleClick = () => {
        if (!isAuthenticated && isMobile) {
            setIsHovered(true);
        }
    };

    return (
        <>
            {!isAuthenticated && isHovered && (
                <div
                    className={style.overlay}
                    onClick={() => setIsHovered(false)}
                />
            )}

            <div
                className={style.wishlistWrapper}
                onMouseEnter={() => !isMobile && setIsHovered(true)}
                onMouseLeave={() => !isMobile && setIsHovered(false)}
                onClick={handleClick}
            >
                <div className={style.wishlistHeader}>
                    <div className={style.buttonWishlist}>
                        {isAuthenticated ? (
                            <a href="/account#/wishlist">
                                <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.7471 17.3766C10.7471 17.3766 0.99707 12.1266 0.99707 5.93914C0.99707 4.59649 1.53044 3.30882 2.47984 2.35942C3.42925 1.41001 4.71691 0.876644 6.05957 0.876644C8.17738 0.876644 9.99145 2.03071 10.7471 3.87664C11.5027 2.03071 13.3168 0.876644 15.4346 0.876644C16.7772 0.876644 18.0649 1.41001 19.0143 2.35942C19.9637 3.30882 20.4971 4.59649 20.4971 5.93914C20.4971 12.1266 10.7471 17.3766 10.7471 17.3766Z" stroke="black" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </a>
                        ) : (
                            <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.7471 17.3766C10.7471 17.3766 0.99707 12.1266 0.99707 5.93914C0.99707 4.59649 1.53044 3.30882 2.47984 2.35942C3.42925 1.41001 4.71691 0.876644 6.05957 0.876644C8.17738 0.876644 9.99145 2.03071 10.7471 3.87664C11.5027 2.03071 13.3168 0.876644 15.4346 0.876644C16.7772 0.876644 18.0649 1.41001 19.0143 2.35942C19.9637 3.30882 20.4971 4.59649 20.4971 5.93914C20.4971 12.1266 10.7471 17.3766 10.7471 17.3766Z" stroke="black" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        )}

                        {!isAuthenticated && isHovered && (
                            <div className={style.modalMessage}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsHovered(false);
                                    }}
                                    className={style.closeButton}
                                >
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_2149_2312)">
                                            <path d="M9.43701 3.4436L2.68701 10.1936" stroke="#878787" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9.43701 10.1936L2.68701 3.4436" stroke="#878787" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2149_2312">
                                                <rect width="12" height="12" fill="white" transform="translate(0.0620117 0.818604)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                                <p>Para salvar seus favoritos,</p>
                                <p>você precisa estar logado!</p>
                                <a href="/login">ENTRE OU CADASTRE-SE</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );

};

export default WishlistHeader;
