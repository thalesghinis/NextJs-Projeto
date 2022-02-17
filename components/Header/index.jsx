import React from "react";
import styles from './Header.module.css';

export default ({black}) => {

    return (
     <header className={styles.Styleheader}>
         <div className={styles.headerlogo}>
                <a href="/">
                    {/* <img className="headerlogoimg" /> */}
                    Logo Clone
                </a>
            </div>
            <div className={styles.headeruser}>
                <a href="/">
                    <img className={styles.headeravatar} />
                </a>
            </div>
     </header>
    );
}