// Three organic blob masks (objectBoundingBox units) used via .blob-1 / .blob-2 / .blob-3
export default function BlobDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <defs>
        <clipPath id="blob-1" clipPathUnits="objectBoundingBox"><path d="M0.52,0.01 C0.78,-0.02 0.99,0.16 0.97,0.43 C0.95,0.7 1,0.9 0.74,0.97 C0.5,1.03 0.3,0.92 0.12,0.82 C-0.03,0.73 0,0.5 0.04,0.32 C0.08,0.12 0.3,0.04 0.52,0.01 Z" /></clipPath>
        <clipPath id="blob-2" clipPathUnits="objectBoundingBox"><path d="M0.3,0.03 C0.55,-0.04 0.85,0.02 0.95,0.25 C1.04,0.5 0.9,0.75 0.74,0.9 C0.55,1.03 0.25,0.98 0.1,0.78 C-0.04,0.58 0,0.3 0.1,0.17 C0.15,0.1 0.2,0.06 0.3,0.03 Z" /></clipPath>
        <clipPath id="blob-3" clipPathUnits="objectBoundingBox"><path d="M0.45,0 C0.7,0.04 0.98,0.1 1,0.4 C1.02,0.7 0.84,0.95 0.56,0.99 C0.3,1.03 0.04,0.88 0,0.58 C-0.04,0.3 0.2,-0.03 0.45,0 Z" /></clipPath>
      </defs>
    </svg>
  );
}
