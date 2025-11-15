
import React from 'react';

interface ImageCardProps {
  src: string;
  alt: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt }) => {
  return (
    <div className="bg-gray-800 p-2 rounded-lg shadow-2xl w-full max-w-lg animate-fade-in">
      <img
        src={src}
        alt={alt}
        className="rounded-md w-full h-full object-cover"
      />
    </div>
  );
};

// Add fade-in animation to tailwind config (not possible here, so using CSS-in-JS style temporary solution which is not ideal but needed for effect)
// For a real project, this should be in tailwind.config.js
if (typeof window !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }
    `;
    document.head.appendChild(style);
}


export default ImageCard;
