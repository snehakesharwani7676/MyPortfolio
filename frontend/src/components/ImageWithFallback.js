import React, { useState } from 'react';

const ImageWithFallback = ({ src, alt, className, onClick, fallbackSrc = '/images/placeholder.jpg' }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    console.error(`Failed to load image: ${imgSrc}`);
    console.log(`Attempted path: ${imgSrc}`);
    
    // Try to fix common path issues
    if (imgSrc && !imgSrc.startsWith('/') && imgSrc.startsWith('images/')) {
      const fixedSrc = '/' + imgSrc;
      console.log(`Trying fixed path: ${fixedSrc}`);
      setImgSrc(fixedSrc);
      return;
    }

    // If still failing, use fallback
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  const handleLoad = () => {
    console.log(`✅ Successfully loaded: ${imgSrc}`);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onClick={onClick}
      onError={handleError}
      onLoad={handleLoad}
      style={{ 
        objectFit: 'cover',
        objectPosition: 'center top',
        width: '100%',
        height: '100%'
      }}
    />
  );
};

export default ImageWithFallback;
