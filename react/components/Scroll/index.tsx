import React from 'react'
//@ts-ignore 
import styles from './style.css'

const Scroll = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.contentscroll}> 
      <button className={styles.scroll} onClick={scrollToTop}>
          Voltar ao Topo
      </button>
    </div>
    
  ) 
} 
   
export default Scroll
 