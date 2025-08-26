import React, { useEffect, useState } from 'react'
// @ts-ignore
import styles from './styles.css'
import { useProduct } from 'vtex.product-context'

const UltimasUnidades = () => {
    const productContext = useProduct()
    const product = productContext?.selectedItem
    const [availableQty, setAvailableQty] = useState<number | null>(null)
    const [cont, setCont] = useState(0)

    useEffect(() => {
        const qty = product?.sellers?.[0]?.commertialOffer?.AvailableQuantity
        if (qty !== undefined) {
            setAvailableQty(qty);
        }
        setCont(prev => prev + 1);
        //console.log('cont', cont, product);
    }, [product])

    useEffect(() => {
        if (typeof document !== 'undefined') {
            const tamanhos = document.querySelectorAll<HTMLDivElement>(
                '.vtex-store-components-3-x-skuSelectorItem:not(.vtex-store-components-3-x-unavailable)'
            )
            const handleClick = () => {
                setCont(2);
            }
            tamanhos.forEach(el => el.addEventListener('click', handleClick))
            // Cleanup
            return () => {
                tamanhos.forEach(el => el.removeEventListener('click', handleClick))
            }
        }
    }, [product])

    return (
        <>
            {availableQty !== null && availableQty <= 3 && cont > 1 && (
                <div className={styles.ultimasUnidades}>
                    <span className={styles.ultimas}>últimas unidades</span>
                    <span className={styles.disponível}>
                        {availableQty === 1
                            ? 'Resta 1 item em estoque'
                            : `Restam ${availableQty} itens em estoque`}
                    </span>
                </div>
            )}
        </>
    )
}

export default UltimasUnidades;
