import React, { useContext } from 'react'
import styles from '../styles/navbar.module.scss';
import logo from '../assets/img/marshlogo.png';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { MouseContext } from '../context/mouse-context';
import toast, { Toaster } from 'react-hot-toast';

export default function Navbar(props) {
    const { cursorType, cursorChangeHandler } = useContext(MouseContext); // This is a hook

    const { detailsClicked, setDetailsClicked } = props.detailsState;
    const { removeView, setRemoveView } = props.removeViewState;

    const { addAlbumCard, setAddAlbumCard } = props.addAlbumCardState;

    const handleClick = (e) => {
        setDetailsClicked(false);
        setRemoveView(false);

    }

    const addAlbumButtonClick = (e) => {
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

    return (
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
            
            

            <div className={styles.navbarMenu}>
                <FontAwesomeIcon icon={faBars} />
            </div>

            
        </div>
    )
}
