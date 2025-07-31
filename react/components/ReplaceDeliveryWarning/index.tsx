import { useEffect } from 'react'

const ReplaceDeliveryWarning = () => {
    useEffect(() => {
        const targetText = 'O prazo de entrega começa a contar só depois da confirmação do pagamento'

        const customText = 'O prazo de entrega começa a contar a partir da postagem do pedido, exceto os produtos de PRÉ-VENDA que serão postados de acordo com a data informada no produto.'

        const observer = new MutationObserver(() => {
            const listItems = document.querySelectorAll('ul[class*="noticesList"] li')

            listItems.forEach((li) => {
                if (li.textContent?.includes(targetText)) {
                    li.textContent = customText
                    observer.disconnect()
                }
            })
        })
        
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        })

        return () => observer.disconnect()
    }, [])

    return null
}

export default ReplaceDeliveryWarning