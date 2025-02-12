import React, { useEffect, useState } from 'react';
//@ts-ignore
import { OrderForm } from "vtex.order-manager";
//@ts-ignore
import styles from "./style.css";

const AlertMinicart = () => {
    const { orderForm } = OrderForm.useOrderForm();
    const items = orderForm?.items || [];
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  
    const [isShaking, setIsShaking] = useState(false);
    const [isVisible, setIsVisible] = useState(() => {
      const closedAlert = localStorage.getItem("minicartAlertClosed");
      return totalQuantity > 0 && closedAlert !== "true";
    });
  
    useEffect(() => {
      if (totalQuantity > 0 && isVisible) {
        setIsShaking(true);
        const interval = setInterval(() => {
          setIsShaking(true);
          setTimeout(() => {
            setIsShaking(false);
          }, 820);
        }, 8000);

        return () => clearInterval(interval);
      }

      if (!isVisible) {
        const timer = setTimeout(() => {
          localStorage.removeItem("minicartAlertClosed");
          setIsVisible(true);
        }, 10000); 
  
        return () => clearTimeout(timer);
      }
    }, [totalQuantity, isVisible]);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem("minicartAlertClosed", "true");
    };

  if (!isVisible) return null;

  return (
    <div className={`${styles.notification} ${isShaking ? styles.shake : ''}`}>
      <div className={styles.notificationContent}>
        <div className={styles.notificationText}>
          <p className={styles.notificationTitle}>
            Seu carrinho tem <strong>{totalQuantity} {totalQuantity === 1 ? 'item' : 'itens'}</strong>
          </p>
          <p className={styles.notificationMessage}>Produtos no carrinho <strong>não são reservados.</strong></p>
          <p className={styles.notificationMessage}>Finalize o pedido para garantir o seu!</p>
        </div>
        <button className={styles.closeButton} onClick={handleClose}>
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AlertMinicart;
