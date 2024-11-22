import React from "react";
//@ts-ignore
import { OrderForm } from "vtex.order-manager";
//@ts-ignore
import styles from "./QuickFilterCategory.css";

import Slider from 'react-slick';
import "./slick.css";

interface Props {
    menuItems: MenuItem[];
}

type MenuItem = {
    link: string,
    title: string,
    newTab: boolean,
};

function QuickFilterCategory(props: Props) {
    const { menuItems } = props;

    const settingsSlider = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: false,
        arrows: true,
        cssEase: 'linear',
        focusOnSelect: true,
    };


    if (menuItems != undefined || menuItems != null) {
        return (
            <>
                <div className={styles.QuickFilterCategory}>

                    {menuItems.length > 4 ? (
                        <ul className={styles.QuickFilterCategoryList}>
                            <Slider {...settingsSlider}>
                                {menuItems?.map((link, index) => {
                                    return (
                                        <li className={styles.QuickFilterCategoryListItem}>
                                            <a href="" className={styles.QuickFilterCategoryListItemLink}>{link.title}</a>
                                        </li>
                                    );
                                })}
                            </Slider>
                        </ul>

                    ) : (
                        <ul className={styles.QuickFilterCategoryList}>

                            {menuItems?.map((link, index) => {
                                return (
                                    <li className={styles.QuickFilterCategoryListItem}>
                                        <a href="" className={styles.QuickFilterCategoryListItemLink}>{link.title}</a>
                                    </li>
                                );
                            })}

                        </ul>

                    )}


                </div>
            </>
        )
    } else {
        return (
            <></>
        )
    }
}

QuickFilterCategory.schema = {
    title: "Quick Filter",
    description: "Quick Filter",
    type: "object",
    properties: {
        menuItems: {
            type: "array",
            title: "Links",
            items: {
                type: "object",
                properties: {
                    link: {
                        title: 'Url',
                        type: 'string',
                        default: null
                    },
                    title: {
                        title: 'Titulo',
                        type: 'string',
                        default: null
                    },
                    newTab: {
                        title: 'Abrir em nova aba',
                        type: 'boolean',
                        default: false
                    }
                },
            },
        },
    }

}

export default QuickFilterCategory;
