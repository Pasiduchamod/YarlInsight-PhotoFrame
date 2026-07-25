// Official YarlInsight Single Frame Overlay Engine
// Uses user-provided official YarlInsight logo (/sample_logo.png)
// Brand Colors: Royal Blue (#135398), Amber Gold (#f3a41d), Dark Midnight Navy (#0b1424)

let logoImage = null;
if (typeof window !== 'undefined') {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = '/sample_logo.png';
  img.onload = () => {
    logoImage = img;
  };
}

export const OFFICIAL_FRAME = {
  id: 'yarl-official-single',
  name: 'Official YarlInsight Event Frame',
  subtitle: 'Exclusive Swag Contest Participant Overlay',
  drawOverlay: (ctx, width, height, customBadgeText = 'ATTENDING YARLINSIGHT 2026') => {
    const borderWidth = Math.max(18, width * 0.038);

    // 1. Dual Gradient Outer Border Frame (Royal Blue to Golden Yellow)
    const borderGrad = ctx.createLinearGradient(0, 0, width, height);
    borderGrad.addColorStop(0, '#135398'); // Royal Blue
    borderGrad.addColorStop(0.5, '#1e68b8');
    borderGrad.addColorStop(1, '#f3a41d'); // Amber Gold

    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderGrad;
    ctx.strokeRect(borderWidth / 2, borderWidth / 2, width - borderWidth, height - borderWidth);

    // 2. Bottom Vignette Overlay for Text Legibility
    const shadowGrad = ctx.createLinearGradient(0, height * 0.6, 0, height);
    shadowGrad.addColorStop(0, 'rgba(11, 20, 36, 0)');
    shadowGrad.addColorStop(1, 'rgba(11, 20, 36, 0.94)');
    ctx.fillStyle = shadowGrad;
    ctx.fillRect(0, height * 0.55, width, height * 0.45);

    // 3. Top Header Badge Container with Official Logo
    const topBarH = Math.max(75, height * 0.125);
    const topBarY = borderWidth * 0.6;
    const topBarW = width * 0.90;
    const topBarX = (width - topBarW) / 2;

    ctx.save();
    ctx.shadowColor = 'rgba(19, 83, 152, 0.4)';
    ctx.shadowBlur = 15;

    // Top Bar Box Fill
    ctx.fillStyle = 'rgba(11, 20, 36, 0.95)';
    ctx.beginPath();
    ctx.roundRect(topBarX, topBarY, topBarW, topBarH, [0, 0, 18, 18]);
    ctx.fill();

    // Top Bar Gold Accent Border
    ctx.strokeStyle = '#f3a41d';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.restore();

    // Render Official User Logo (/sample_logo.png) in Top Bar
    if (logoImage && logoImage.complete && logoImage.naturalWidth > 0) {
      const logoH = topBarH * 0.60;
      const maxLogoW = topBarW * 0.85;
      const aspect = logoImage.naturalWidth / logoImage.naturalHeight;
      let logoW = logoH * aspect;
      if (logoW > maxLogoW) {
        logoW = maxLogoW;
      }
      const logoX = width / 2 - logoW / 2;
      const logoY = topBarY + (topBarH - logoH) / 2;
      ctx.drawImage(logoImage, logoX, logoY, logoW, logoH);
    }

    // 4. Bottom Main Badge Container
    const bottomBoxH = Math.max(88, height * 0.155);
    const bottomY = height - borderWidth * 0.6 - bottomBoxH;
    const bottomW = width * 0.92;
    const bottomX = (width - bottomW) / 2;

    ctx.save();
    ctx.shadowColor = 'rgba(243, 164, 29, 0.35)';
    ctx.shadowBlur = 20;

    // Pill Box Fill
    ctx.fillStyle = 'rgba(11, 20, 36, 0.96)';
    ctx.beginPath();
    ctx.roundRect(bottomX, bottomY, bottomW, bottomBoxH, 20);
    ctx.fill();

    // Pill Border: Blue to Gold Gradient
    ctx.strokeStyle = borderGrad;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();

    // Swag Tag Banner Pill
    const tagW = Math.max(170, width * 0.40);
    const tagH = Math.max(26, height * 0.04);
    
    // Tag background in Royal Blue
    ctx.fillStyle = '#135398';
    ctx.beginPath();
    ctx.roundRect(width / 2 - tagW / 2, bottomY - tagH / 2, tagW, tagH, 12);
    ctx.fill();
    ctx.strokeStyle = '#f3a41d';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Tag Text in Gold
    ctx.fillStyle = '#f3a41d';
    ctx.font = `900 ${Math.max(11, width * 0.024)}px 'Outfit', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎁 OFFICIAL SWAG CONTEST', width / 2, bottomY);

    // Custom Attendee Text
    ctx.fillStyle = '#ffffff';
    ctx.font = `800 ${Math.max(18, width * 0.042)}px 'Outfit', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(customBadgeText.toUpperCase(), width / 2, bottomY + bottomBoxH * 0.44);

    // Updated Hashtags Line on Frame
    ctx.fillStyle = '#f3a41d';
    ctx.font = `700 ${Math.max(11, width * 0.024)}px 'Inter', sans-serif`;
    ctx.fillText('#IEEEUOJ  •  #YarlInsight2026  •  #YarlInsight', width / 2, bottomY + bottomBoxH * 0.8);

    // 5. Corner Accent Elements (Gold & Blue Triangles)
    ctx.fillStyle = '#f3a41d';
    ctx.beginPath();
    ctx.moveTo(borderWidth, borderWidth);
    ctx.lineTo(borderWidth + 42, borderWidth);
    ctx.lineTo(borderWidth, borderWidth + 42);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#135398';
    ctx.beginPath();
    ctx.moveTo(width - borderWidth, borderWidth);
    ctx.lineTo(width - borderWidth - 42, borderWidth);
    ctx.lineTo(width - borderWidth, borderWidth + 42);
    ctx.closePath();
    ctx.fill();
  }
};
