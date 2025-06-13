import React from 'react';

interface VideoModalProps {
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 relative max-w-2xl w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-red-600 text-2xl font-bold"
          aria-label="Kapat"
        >
          ×
        </button>
        <div className="aspect-w-16 aspect-h-9 w-full">
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/pD80sTSVh84"
            title="Arnavutköy Kiptaş Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default VideoModal; 