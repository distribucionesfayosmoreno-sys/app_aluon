const encodePathSegments = (path: string): string =>
  path
    .split('/')
    .map(segment => encodeURIComponent(segment))
    .join('/');

const publicImagePath = (fileName: string): string => `/images/${encodePathSegments(fileName)}`;

export const openingImagePath = (doorType: string, side: 'LEFT' | 'RIGHT'): string | null => {
  if (doorType === 'VALLA') return null;
  if (doorType === 'CORREDERA') {
    return side === 'LEFT'
      ? publicImagePath('corredera izquierda.png')
      : publicImagePath('corredera derecha.png');
  }
  if (doorType === 'ABATIBLE_UNA' || doorType === 'ABATIBLE_DOS') {
    return side === 'LEFT'
      ? publicImagePath('abatible dos hojas izquierda.png')
      : publicImagePath('apertura abatible dos hojas derecha.png');
  }
  return side === 'LEFT'
    ? publicImagePath('apertura izquierda.png')
    : publicImagePath('apertura derecha.png');
};

