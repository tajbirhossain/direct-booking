import React from 'react';

const VideoModal = ({ showVideoModal, setShowVideoModal }) => {

    const handleClose = () => {
        setShowVideoModal(false);
    };

    return (
        <div
            className='w-screen h-screen fixed top-0 left-0 items-center justify-center z-[200]'
            style={{ display: showVideoModal ? 'flex' : 'none' }}
        >
            <div
                className="size-full absolute top-0 left-0 bg-[rgba(0,0,0,0.6)]"
                onClick={handleClose}
            />
            <div className='w-[70%] h-[70%] max-w-[1500px] max-h-[1000px] min-h-[500px] rounded-lg shadow-2xl p-5 pt-12 bg-gray-700 relative max-[450px]:w-[90%] max-[450px]:h-[300px] max-[450px]:min-h-[300px]'>
                <button className='cursor-pointer absolute top-3 right-3' onClick={handleClose}>
                    <img src="/images/icons/close.png" alt="" className='size-6 invert' />
                </button>

                {showVideoModal && (
                    <iframe
                        key={showVideoModal}
                        className='size-full rounded-md'
                        src="https://www.youtube.com/embed/7Bm_7YAVBpg?si=EeKEdiS7kto08SpS"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                )}
            </div>
        </div>
    );
};

export default VideoModal;
