import PropTypes from 'prop-types';
import '../styles/modal.css';

export function Modal({ photo, onClose }) {
    return (
        <div className='modal-overlay' onClick={onClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <button className='modal-close' onClick={onClose}>X</button>
                <button className='modal-propagate-arrow' id='modal-left-arrow'>&lt;</button>
                <button className='modal-propagate-arrow' id='modal-right-arrow'>&gt;</button>
                <img src={photo.url800} alt={photo.title} />
                <figcaption>{photo.title}</figcaption>
            </div>
        </div>
    );
}

Modal.propTypes = {
    photo: PropTypes.shape({
        url800: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};