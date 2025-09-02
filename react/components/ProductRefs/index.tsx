import React, { useEffect, useState } from "react";
import style from './style.css'
import { useProduct } from 'vtex.product-context';

const ProductRefs = () => {
    const [data, setData] = useState<any>(null);

    const productContext = useProduct();
    const productId = productContext?.product?.productId;
    const items = productContext?.product?.items || [];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/_v/public/graphql/v1', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        query: `query {
              product(identifier: { field: id, value: "${productId}" })
              @context(provider:"vtex.catalog-graphql@1.106.0")
              {
                taxCode
              }
            }`
                    })
                });
                const result = await response.json();
                setData(result);
                console.log("result", result);
            } catch (error) {
                console.error(error);
            }
        };

        if (productId) {
            fetchData();
        }
    }, [productId]);

    const taxCode = data?.data?.product?.taxCode;

    return (
        <>
            <div className={style.productRefs}>
                <div className={style.flexRefs}>
                    <strong>País de origem: </strong>
                    <p>Brasil</p>
                </div>

                <div className={style.flexRefs}>
                    <strong>Indústria Brasileira</strong>
                </div>

                <div className={style.flexRefs}>
                    <strong>NCM: </strong>
                    <p>{taxCode || "—"}</p>
                </div>

                <strong>GTIN: </strong>
                <div>
                    {items.map((item: any, index: number) => (
                        <p key={index}>
                            Tamanho {item.name}: {item.ean || "—"}
                        </p>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ProductRefs;
