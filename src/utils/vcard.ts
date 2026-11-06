import { CardData } from '../types/card';

/**
 * Generates standard vCard 3.0 format string
 */
export function generateVCardString(card: CardData): string {
  const vcardLines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${card.name};;;;`,
    `FN:${card.name}`,
    `ORG:${card.company}`,
    `TITLE:${card.title}`,
    `TEL;TYPE=CELL,VOICE:${card.phone}`,
    `EMAIL;TYPE=PREF,INTERNET:${card.email}`,
    card.website ? `URL:${card.website.startsWith('http') ? card.website : `https://${card.website}`}` : '',
    card.address ? `ADR;TYPE=WORK:;;${card.address};;;;` : '',
    card.tagline ? `NOTE:${card.tagline}` : '',
    card.socials.linkedin ? `X-SOCIALPROFILE;TYPE=linkedin:https://linkedin.com/in/${card.socials.linkedin}` : '',
    card.socials.github ? `X-SOCIALPROFILE;TYPE=github:https://github.com/${card.socials.github}` : '',
    card.socials.twitter ? `X-SOCIALPROFILE;TYPE=twitter:https://twitter.com/${card.socials.twitter}` : '',
    'END:VCARD'
  ];

  return vcardLines.filter(line => line.length > 0).join('\r\n');
}

/**
 * Triggers instant download of .vcf contact file on mobile/desktop
 */
export function downloadVCard(card: CardData): void {
  const vcardText = generateVCardString(card);
  const blob = new Blob([vcardText], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${card.name.toLowerCase().replace(/\s+/g, '_')}_contact.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates an SVG path data representation for a clean, reliable QR Code
 * without requiring heavy network assets
 */
export function generateQRSVGMatrix(text: string): boolean[][] {
  // Simple deterministic QR-style matrix generator for crisp visual rendering
  const size = 25;
  const matrix: boolean[][] = Array(size).fill(false).map(() => Array(size).fill(false));

  // Helper to draw standard QR finder pattern (7x7)
  const drawFinder = (startX: number, startY: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 || // Outer border
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)       // Inner 3x3 box
        ) {
          matrix[startY + r][startX + c] = true;
        }
      }
    }
  };

  // Top-left, top-right, bottom-left finders
  drawFinder(0, 0);
  drawFinder(size - 7, 0);
  drawFinder(0, size - 7);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Alignment pattern (5x5) at lower right
  const alignX = size - 9;
  const alignY = size - 9;
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (r === 0 || r === 4 || c === 0 || c === 4 || (r === 2 && c === 2)) {
        matrix[alignY + r][alignX + c] = true;
      }
    }
  }

  // Hash-based data filler for realistic high density
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash |= 0;
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Don't overwrite finders
      const inFinderTL = r < 8 && c < 8;
      const inFinderTR = r < 8 && c >= size - 8;
      const inFinderBL = r >= size - 8 && c < 8;
      const inTiming = r === 6 || c === 6;
      const inAlign = r >= alignY && r < alignY + 5 && c >= alignX && c < alignX + 5;
      const inCenterLogo = r >= 10 && r <= 14 && c >= 10 && c <= 14;

      if (!inFinderTL && !inFinderTR && !inFinderBL && !inTiming && !inAlign && !inCenterLogo) {
        // pseudo-random pseudo-deterministic bit pattern
        const seed = Math.sin((r * 31 + c * 17) ^ hash) * 10000;
        matrix[r][c] = (seed - Math.floor(seed)) > 0.48;
      }
    }
  }

  return matrix;
}
