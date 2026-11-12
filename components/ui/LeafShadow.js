// Original leaf silhouettes, decorative only. Sways very slowly (static for reduced motion).
const Leaf = ({ x, y, r, s = 1 }) => <path d="M0 0 C24 -34 74 -34 104 0 C74 34 24 34 0 0 Z" transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} />;
export default function LeafShadow({ className = '', tone = 'forest', flip = false }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 420 420" className={`pointer-events-none absolute ${flip ? '-scale-x-100' : ''} ${className}`} fill="currentColor" style={{ color: tone === 'forest' ? 'var(--forest-800)' : 'var(--sage-300)' }}>
      <g className="sway" opacity=".07">
        <path d="M10 410 C120 300 200 170 300 20" stroke="currentColor" strokeWidth="5" fill="none" />
        <Leaf x={70} y={340} r={-35} s={1.1} /><Leaf x={110} y={290} r={-75} s={1} /><Leaf x={150} y={240} r={-30} s={1.15} />
        <Leaf x={190} y={190} r={-70} s={1} /><Leaf x={235} y={135} r={-28} s={1} /><Leaf x={270} y={80} r={-68} s={.9} />
      </g>
    </svg>
  );
}
