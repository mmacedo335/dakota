import React, { useEffect, useState } from 'react';
import { ProductSummaryContext } from 'vtex.product-summary-context';


// import { ProductTypes } from 'vtex.product-context'
import productRecommendationsQuery from '../../queries/productRecommendations.gql';
import { useQuery } from 'react-apollo';
import { useProduct } from 'vtex.product-context';


// @ts-ignore
import styles from './styles.css'

interface SimilarProductsVariantsProps {
    imageLabel: string
}

const SkuSelector = ({ imageLabel }: SimilarProductsVariantsProps) => {

    console.log(imageLabel)

    const { useProductSummary, useProductSummaryDispatch } = ProductSummaryContext
    const { product } = useProductSummary()
    const dispatch = useProductSummaryDispatch()
    const [loadingg, setLoading] = useState(false);
    const productContext = useProduct();

    const productId = productContext?.product?.productId

    const { loading, error } = useQuery(productRecommendationsQuery, {
        variables: {
            identifier: { field: 'id', value: productId },
            type: `similars`,
        },
        skip: !productId,
    });

    if (loading || error) return null;

    //console.log('datinha', data);

    const removeClick = (e: { preventDefault: () => void; stopPropagation: () => void }) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleItemClick = (index) => {

        const selectedItem = product?.items[index];

        const sku = {
            ...selectedItem,
            image: product?.items[index]?.images[0],
            seller: product?.items[index]?.sellers[0],
            reference: product?.items[index]?.referenceId[0],
        }

        const newProduct = {
            ...product,
            selectedItem,
            sku,
        }


        if (dispatch) {
            dispatch({
                type: 'SET_PRODUCT',
                args: { product: newProduct },
            })

            dispatch({
                type: 'SET_PRODUCT_QUERY',
                args: { query: `skuId=${product?.items[index]?.itemId}` },
            })
        }
    };

    useEffect(() => {
        setLoading(true);
    }, []);

    return (
        <div className={styles.skucustomsummary} onClick={removeClick}>
            {loadingg === true ? (
                <div className={styles.skuslidesummary}>
                    {product?.items.map((item, index) => (
                        <div>
                            {index <= 5 ? (
                                <div onClick={() => handleItemClick(index)}>
                                    {item?.itemId == product?.sku?.itemId ? (
                                        <div className={styles.ativo}>
                                            <img src={item?.images[0]?.imageUrl} alt={item.name}></img>
                                        </div>
                                    ) : (
                                        <div>
                                            <img src={item?.images[0]?.imageUrl} alt={item.name}></img>
                                        </div>
                                    )}
                                </div>
                            ) : index === 6 ? (
                                <div className={styles.more}>
                                    <a href={'/' + product?.linkText + '/p'}>
                                        <img src="https://plastco.vtexassets.com/assets/vtex.file-manager-graphql/images/2acadd88-bd64-4e37-909f-0f241b1b76c4___691c0cd82e687729232bb4190ccb0857.png"></img>
                                    </a>
                                </div>
                            ) : (
                                null
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                null
            )}
        </div>
    )
}

export default SkuSelector