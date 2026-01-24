import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/modal.css';

export function Modal({ selectedPhoto, photos, onClose }) {

    const [activePhoto, setActivePhoto] = useState(null);
    const navigate = useNavigate();


    // Set selected photo
    useEffect(() => {
        const photo = photos.find(x => x.id === selectedPhoto);
        setActivePhoto(photo);
    }, [selectedPhoto, photos]); // Runs on those props change

    const advancePhoto = (i) => {
        if (!activePhoto) return null;
        const nextIndex = photos.findIndex(x => x.id === activePhoto.id) + i;
        setActivePhoto(photos[nextIndex]);
    }

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                advancePhoto(1);
            } else if (e.key === 'ArrowLeft') {
                advancePhoto(-1);
            } else if (e.key === 'Escape') {
                onClose();
            }
        }
        globalThis.addEventListener('keydown', handleKeyDown);
        return () => globalThis.removeEventListener('keydown', handleKeyDown);
    }, [advancePhoto, onClose]);


    if (!activePhoto)
        return null;

    return (
        <div className='modal-overlay' onClick={onClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <button className='modal-close' onClick={onClose}>
                    <span className="material-symbols-outlined">
                        close_small
                    </span>
                </button>
                <button className='modal-propagate-arrow' id='modal-left-arrow' onClick={() => advancePhoto(-1)}>
                    <span className="material-symbols-outlined">
                        arrow_circle_left
                    </span>
                </button>
                <button className='modal-propagate-arrow' id='modal-right-arrow' onClick={() => advancePhoto(1)}>
                    <span className="material-symbols-outlined">
                        arrow_circle_right
                    </span>
                </button>
                <div onClick={() => navigate(`/photo/${activePhoto.id}`)} style={{ cursor: 'pointer' }}>
                    <img src={activePhoto.url800} alt={activePhoto.title} />
                    <figcaption>{activePhoto.title}</figcaption>
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    selectedPhoto: PropTypes.string,
    photos: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
};