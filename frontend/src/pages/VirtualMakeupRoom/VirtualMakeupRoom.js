import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import './VirtualMakeupRoom.css';

const VirtualMakeupRoom = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [lipColor, setLipColor] = useState('#ff6b9d');
  const [eyeshadowColor, setEyeshadowColor] = useState('#8b4789');
  const [blushColor, setBlushColor] = useState('#ff9999');
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        toast.success('Image uploaded! Adjust colors to see the effect.');
      };
      reader.readAsDataURL(file);
    }
  };

  const applyMakeup = () => {
    if (!uploadedImage) {
      toast.error('Please upload an image first!');
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    // Simple color overlay effect (demonstration)
    ctx.globalCompositeOperation = 'multiply';
    ctx.globalAlpha = 0.3;

    // Apply lip color (bottom center)
    ctx.fillStyle = lipColor;
    ctx.fillRect(canvas.width * 0.4, canvas.height * 0.7, canvas.width * 0.2, canvas.height * 0.1);

    // Apply eyeshadow (top center)
    ctx.fillStyle = eyeshadowColor;
    ctx.fillRect(canvas.width * 0.3, canvas.height * 0.3, canvas.width * 0.4, canvas.height * 0.1);

    // Apply blush (sides)
    ctx.fillStyle = blushColor;
    ctx.fillRect(canvas.width * 0.2, canvas.height * 0.5, canvas.width * 0.15, canvas.height * 0.1);
    ctx.fillRect(canvas.width * 0.65, canvas.height * 0.5, canvas.width * 0.15, canvas.height * 0.1);

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1.0;

    toast.success('Makeup applied! This is a simple demonstration.');
  };

  return (
    <div className="virtual-makeup-page">
      <div className="virtual-makeup-header">
        <div className="container">
          <h1>Virtual Makeup Room</h1>
          <p>Try different makeup colors on your photo</p>
        </div>
      </div>

      <div className="container section">
        <div className="virtual-makeup-content">
          <div className="upload-section">
            <h2>Upload Your Photo</h2>
            <div className="upload-area">
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <label htmlFor="photo-upload" className="upload-label">
                {uploadedImage ? 'Change Photo' : 'Choose Photo'}
              </label>
            </div>

            <div className="color-controls">
              <h3>Adjust Colors</h3>
              
              <div className="color-control">
                <label>Lip Color</label>
                <input
                  type="color"
                  value={lipColor}
                  onChange={(e) => setLipColor(e.target.value)}
                />
                <span>{lipColor}</span>
              </div>

              <div className="color-control">
                <label>Eyeshadow Color</label>
                <input
                  type="color"
                  value={eyeshadowColor}
                  onChange={(e) => setEyeshadowColor(e.target.value)}
                />
                <span>{eyeshadowColor}</span>
              </div>

              <div className="color-control">
                <label>Blush Color</label>
                <input
                  type="color"
                  value={blushColor}
                  onChange={(e) => setBlushColor(e.target.value)}
                />
                <span>{blushColor}</span>
              </div>

              <button onClick={applyMakeup} className="btn btn-primary">
                Apply Makeup
              </button>
            </div>

            <div className="disclaimer">
              <p><strong>Note:</strong> This is a simple demonstration of virtual makeup. 
              For professional makeup consultation and services, please book an appointment!</p>
            </div>
          </div>

          <div className="preview-section">
            <h2>Preview</h2>
            <div className="preview-area">
              {uploadedImage ? (
                <>
                  <img
                    ref={imageRef}
                    src={uploadedImage}
                    alt="Uploaded"
                    style={{ display: 'none' }}
                    onLoad={() => applyMakeup()}
                  />
                  <canvas ref={canvasRef} className="makeup-canvas" />
                </>
              ) : (
                <div className="placeholder">
                  <p>Upload a photo to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualMakeupRoom;
