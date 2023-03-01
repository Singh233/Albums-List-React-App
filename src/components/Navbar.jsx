import React, { useContext, useState } from 'react'
import styles from '../styles/navbar.module.scss';
import logo from '../assets/img/marshlogo.png';
import design from '../assets/img/design.png';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { MouseContext } from '../context/mouse-context';
import toast, { Toaster } from 'react-hot-toast';

export default function Navbar(props) {
    const { cursorType, cursorChangeHandler } = useContext(MouseContext); // This is a hook

    const [ closeButton, setCloseButton ] = useState(false);

    const { detailsClicked, setDetailsClicked } = props.detailsState;
    const { removeView, setRemoveView } = props.removeViewState;

    const { addAlbumCard, setAddAlbumCard } = props.addAlbumCardState;

    const handleClick = (e) => {
        setDetailsClicked(false);
        setRemoveView(false);

    }

    const addAlbumButtonClick = (e) => {
        if (closeButton) {
            const div = document.querySelector(`.${styles.navbarExpanded}`);
            div.classList.remove('animate__fadeInRight');
            div.classList.add('animate__fadeOutRight');

            setTimeout(() => {
                setCloseButton(false);
            }
            , 500);
        }
        if (addAlbumCard) {
            setAddAlbumCard(false);
            return;
        }
        setAddAlbumCard(true);
        const myRef = props.passRef;
        myRef.current.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
        });
        console.log(myRef.current);

        toast('Add an album to your collection!');
    }

    // handle menu click
    const handleMenuClick = (e) => {
        if (closeButton) {
            const div = document.querySelector(`.${styles.navbarExpanded}`);
            div.classList.remove('animate__fadeInRight');
            div.classList.add('animate__fadeOutRight');

            setTimeout(() => {
                setCloseButton(false);
            }
            , 500);
            return;
        }
        setCloseButton(!closeButton);
    }

    // handle courtesy click
    const handleCourtesyClick = (e) => {
        window.open('https://dribbble.com/shots/15258832-Marshmello-Albums', '_blank');
    }

    return (
        <>
        <div className={styles.navbarContainer}>

            <div className={styles.navbarLogo}>
                <img src={logo} alt="spotify logo" />
            </div>

            {detailsClicked &&
            <div
                onMouseEnter={() => cursorChangeHandler('navbarHovered')}
                onMouseLeave={() => cursorChangeHandler('')}
                className={`${styles.navbarLinks} animate__animated animate__faster animate__fadeInDown`}
                onClick={handleClick}
            >
                <img
                    src="https://wallpapercave.com/wp/wp5029986.jpg"
                    alt="album cover"
                />
                <p>Albums</p>
            </div>}

            { !detailsClicked && 
            <div onClick={addAlbumButtonClick} className={styles.addAlbumButton}>
                <p>Add Album</p>
            </div>
            }
            
            

            <div onClick={handleMenuClick} className={styles.navbarMenu}>
                <FontAwesomeIcon icon={faBars} />
            </div>

            

            
        </div>
        {/* Navbar expanded */
        closeButton && 
        <div  className={`${styles.navbarExpanded} animate__animated animate__faster animate__fadeInRight`}>
            <div onClick={handleMenuClick} className={styles.closeButton}>
                <FontAwesomeIcon icon={faClose} />
            </div>

            { !detailsClicked && 
            <div onClick={addAlbumButtonClick} className={styles.addAlbumButton}>
                <p>Add Album</p>
            </div>
            }

            <div className={styles.courtesy}>
                <p>Design Courtesy</p>
                <img src={design} alt="Design Courtesy" onClick={handleCourtesyClick} />
                <div className={styles.developer}>
                    <p>Sanambir Singh</p>
                    <p>Proudly Developed By</p>
                </div>
                <p style={{fontSize: '1.2rem', fontWeight: 600}}>@Dribbble</p>

            </div>

        </div>
        }       
        
        </>
    )
}
