import { useContext, useEffect } from 'react';
import { MouseContext } from '../context/mouse-context';
import useMousePosition from '../hooks/useMousePosition';
import '../styles/customCursor.css';
import 'animate.css';

const CustomCursor = () => {
    const { cursorType } = useContext(MouseContext);
    const { x, y } = useMousePosition();

    useEffect(() => {
        let timeout = null;
            if (cursorType === 'hovered') {
                timeout = setTimeout(() => {
                    document.getElementsByClassName('dot')[0].classList.remove('temp');
                    document.getElementsByClassName('dot')[0].classList.add('temp');
                }, 500);
            } else { 
                document.getElementsByClassName('dot')[0].classList.remove('shrink');
                document.getElementsByClassName('dot')[0].classList.add('shrink');
                document.getElementsByClassName('dot')[0].classList.remove('temp');

            }
            
        
        return () => {
            clearTimeout(timeout);
        };
    }, [cursorType]);

    
    return (
        <>
            {/* <div
                style={{ left: `${x}px`, top: `${y}px` }}
                className={`ring ${cursorType}`}
            ></div> */}
            <div
                className={`dot animate__animated  ${cursorType === 'hovered' ? 'hovered '  : ''}`}
                style={{ left: `${x}px`, top: `${y}px` }}
                
            >
                <div className="dotInner">
                    {cursorType === 'hovered' && <p>
                        Next
                        </p>}
                </div>
            </div>
        </>
    );
};

export default CustomCursor;
