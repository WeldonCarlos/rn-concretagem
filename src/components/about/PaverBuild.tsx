import { useEffect, useRef, useState } from 'react';
import type { CSSVariables } from '../../types/styles.ts';
import Icon from '../ui/Icon.tsx';
import paverPhoto from '../../assets/products/paver.png';
import './PaverBuild.css';

// Rectify only the photographed top face into a paving tile.
// The concrete color and texture come from the original product PNG.
function PhotographicPaver() {
  return <svg viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <image href={paverPhoto} width="500" height="500" transform="matrix(0.460014 -0.451168 0.648737 0.64579 -164.7305 14.1823)" />
  </svg>;
}

export default function PaverBuild() {
  const surface = useRef<HTMLDivElement>(null);
  const [built, setBuilt] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [grid, setGrid] = useState({ columns: 10, rows: 8 });
  useEffect(() => {
    const element = surface.current;
    if (!element) return;
    const resize = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const columns = Math.max(4, Math.ceil(width / 150));
      const tileHeight = width / columns / 2;
      const rows = Math.ceil(height / tileHeight) + 1;
      setGrid(previous => previous.columns === columns && previous.rows === rows ? previous : { columns, rows });
    });
    resize.observe(element);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setBuilt(true); observer.disconnect(); }
    }, { threshold: .15 });
    observer.observe(element);
    return () => { observer.disconnect(); resize.disconnect(); };
  }, []);

  return <>
    <div ref={surface} className={`paver-surface ${built ? 'is-built' : ''}`} aria-hidden="true">
      <div className="paver-course" key={cycle}>{Array.from({ length: grid.rows }, (_, row) =>
        <div className={`paver-row ${row % 2 ? 'offset' : ''}`} style={{ '--columns': grid.columns } as CSSVariables} key={row}>{Array.from({ length: grid.columns }, (_, column) =>
          <span className="construction-paver" key={column} style={{ '--delay': `${(row * grid.columns + column) * 75}ms` } as CSSVariables}><PhotographicPaver /></span>
        )}</div>
      )}</div>
    </div>
    <button type="button" className="paver-replay" onClick={() => { setBuilt(true); setCycle(value => value + 1); }}><Icon name="forward" /> Rever montagem dos pavers</button>
  </>;
}

