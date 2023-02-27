import React from 'react'
import styles from '../styles/navbar.module.scss';
import logo from '../assets/img/marshlogo.png';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {


    return (
        <div className={styles.navbarContainer}>
            <div className={styles.navbarLogo}>
                <img src={logo} alt="spotify logo" />
            </div>

            <div className={styles.navbarLinks}>
                
            </div>

            <div className={styles.navbarMenu}>
                <FontAwesomeIcon icon={faBars} />
            </div>

            
        </div>
    )
}
