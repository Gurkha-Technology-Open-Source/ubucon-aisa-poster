import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import posterTemplate from '../assets/poster-template.png';

const CANVAS_SIZE = 1080;

const PosterCanvas = forwardRef(({ name, organization, image }, ref) => {
  const canvasRef = useRef(null);

  useImperativeHandle(ref, () => ({
    download: () => {
      const canvas = canvasRef.current;
      const link = document.createElement('a');
      link.download = 'ubucon-poster.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw template
    const templateImg = new window.Image();
    templateImg.src = posterTemplate;
    templateImg.onload = () => {
      ctx.drawImage(templateImg, 0, 0, CANVAS_SIZE, CANVAS_SIZE);

      // Draw profile image if present
      if (image) {
        const profileImg = new window.Image();
        profileImg.src = image;
        profileImg.onload = () => {
          // Position and size based on your CSS: left: 11%, top: 46%, width: 37%, height: 37%
          const px = CANVAS_SIZE * 0.11;
          const py = CANVAS_SIZE * 0.46;
          const pw = CANVAS_SIZE * 0.37;
          const ph = CANVAS_SIZE * 0.37;
          ctx.save();
          ctx.beginPath();
          ctx.rect(px, py, pw, ph);
          ctx.clip();
          ctx.drawImage(profileImg, px, py, pw, ph);
          ctx.restore();
          drawText();
        };
      } else {
        drawText();
      }
    };

    function drawText() {
      // Name and organization: vertical writing, white, Ubuntu font
      ctx.save();
      ctx.font = '700 60px Ubuntu, sans-serif';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      // Vertical writing: rotate canvas
      ctx.translate(CANVAS_SIZE * 0.11, CANVAS_SIZE * 0.14);
      ctx.rotate(Math.PI);
      ctx.save();
      ctx.font = '700 60px Ubuntu, sans-serif';
      ctx.fillText(name, 0, 0);
      ctx.restore();
      ctx.save();
      ctx.font = '400 40px Ubuntu, sans-serif';
      ctx.fillText(organization, 50, 0);
      ctx.restore();
      ctx.restore();
    }
  }, [name, organization, image]);

  return (
    <div className="poster-container">
      <div className="poster-content">
        <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
});

export default PosterCanvas;
