import { useEffect, useRef, useState } from 'react';
import Icon from '../ui/Icon.tsx';
import './SeasonalExperience.css';
import type { CSSVariables } from '../../types/styles.ts';
import type { SiteTheme } from '../../types/theme.ts';

interface DecorationProps { theme: SiteTheme; paused: boolean }
interface BannerProps extends DecorationProps { onToggle: () => void }

export function Santa({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 180 250" fill="none" aria-hidden="true" focusable="false">
    <path d="M45 0v67M135 0v67" stroke="#cda667" strokeWidth="3" />
    <g className="santa-body">
      <path d="M54 224l-20 10q-9 15 16 12l26-3v-24M108 221v21l30 4q25 1 13-13l-23-11" fill="#222830"/>
      <path d="M57 180v46h23l6-47M100 180l7 46h24l-7-51" fill="#c82336"/>
      <path d="M58 112Q29 100 33 60l13-1 14 34M121 112q35-20 16-55l-11 6-1 29" stroke="#d83042" strokeWidth="24" strokeLinecap="round"/>
      <path d="M33 62q-12-19 1-27 8-2 10 8 9-2 8 8l-7 13M125 63q-15-13-6-22 9-6 13 3 10-3 13 8l-8 14" fill="#fff3df"/>
      <path d="M52 116q37-27 76 0l12 70q-50 23-102 0z" fill="#d83042"/>
      <path d="M86 119v72" stroke="#fff3df" strokeWidth="13"/>
      <path d="M40 166q50 14 97 0" stroke="#252a30" strokeWidth="16"/>
      <rect x="77" y="159" width="27" height="22" rx="4" stroke="#f6c665" strokeWidth="5" fill="#252a30"/>
      <path d="M40 188q50 16 97 0" stroke="#fff3df" strokeWidth="12"/>
      <ellipse cx="90" cy="86" rx="36" ry="35" fill="#ffd2b1"/>
      <path d="M54 89q-9 39 37 48 45-12 33-48-14 14-34 7-24 7-36-7" fill="#fff6e8"/>
      <ellipse cx="70" cy="87" rx="8" ry="5" fill="#efaa9c"/><ellipse cx="109" cy="87" rx="8" ry="5" fill="#efaa9c"/>
      <path d="M73 78q4-5 9 0M99 78q5-5 9 0" stroke="#44332f" strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="90" cy="91" rx="8" ry="6" fill="#f4b393"/>
      <path d="M70 96q12-8 20-1 9-7 21 1-8 14-21 6-13 8-20-6" fill="#fff"/>
      <path d="M86 110q5 4 10 0" stroke="#aa5450" strokeWidth="3" strokeLinecap="round"/>
      <path d="M54 57q10-46 60-40l23 26-17 7-10-18-17 29" fill="#d83042"/>
      <path d="M54 61q35-9 68 0" stroke="#fff6e8" strokeWidth="14" strokeLinecap="round"/>
      <circle cx="137" cy="43" r="11" fill="#fff6e8"/>
    </g>
  </svg>;
}

function Lights({ className = '' }: { className?: string }) {
  return <div className={`seasonal-lights ${className}`} aria-hidden="true">{Array.from({ length: 26 }, (_, i) => <span key={i} style={{ '--i': i } as CSSVariables} />)}</div>;
}

export function SeasonalDecor({ theme, paused }: DecorationProps) {
  if (theme === 'padrao') return null;
  return <div className={`seasonal-decor ${paused ? 'is-paused' : ''}`} aria-hidden="true">
    {theme === 'natal' ? <><Lights /><div className="seasonal-snow">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ '--i': i } as CSSVariables} />)}</div></> : <div className="newyear-dust">{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ '--i': i } as CSSVariables} />)}</div>}
  </div>;
}

export function SeasonalHero({ theme, paused }: DecorationProps) {
  if (theme === 'padrao') return null;
  return <div className={`seasonal-hero ${paused ? 'is-paused' : ''}`} aria-hidden="true">
    {theme === 'natal' ? <><span className="holiday-hero-note">É tempo de construir bons momentos.</span><Santa className="hero-santa" /></> : <><span className="holiday-hero-note">Novos caminhos. Boas construções. Feliz 2027.</span><div className="hero-year">20<span>27</span><small>UM NOVO COMEÇO</small></div></>}
  </div>;
}

export function SeasonalBanner({ theme, paused, onToggle }: BannerProps) {
  const video = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  useEffect(() => { setFailed(false); }, [theme]);
  useEffect(() => {
    const media = video.current;
    if (!media || theme === 'padrao') return;
    let visible = false;
    const update = () => {
      if (paused || reduced || !visible || document.hidden) media.pause();
      else media.play().catch(() => { /* The poster remains available if autoplay is blocked. */ });
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(media);
    document.addEventListener('visibilitychange', update);
    update();
    return () => { media.pause(); observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, [theme, paused, reduced, failed]);
  if (theme === 'padrao') return null;
  const christmas = theme === 'natal';
  const stopped = paused || reduced;
  return <section id="boas-festas" className={`seasonal-banner ${paused ? 'is-paused' : ''}`} aria-labelledby="seasonal-title">
    <div className="seasonal-banner-inner">
      <div className="seasonal-message"><p className="seasonal-kicker">RN CONCRETAGEM · {christmas ? 'BOAS FESTAS' : 'NOVOS CAMINHOS'}</p>
        <h2 id="seasonal-title">{christmas ? <>Que os melhores<br/>momentos sejam<br/><em>construídos juntos.</em></> : <>Um novo ano.<br/>Novas possibilidades.<br/><em>Feliz 2027.</em></>}</h2>
        <p>{christmas ? 'Neste Natal, desejamos a você e sua família união, alegria e muitos motivos para celebrar.' : 'Que 2027 chegue com tranquilidade, boas conquistas e novos projetos para realizar.'}</p>
        <span className="seasonal-signature">Com carinho, equipe RN.</span>
      </div>
      <div className="seasonal-film">
        <div className="seasonal-film-frame">
          <img src={`/media/${theme}-poster.jpg`} alt={christmas ? 'Papai Noel, pinheiros e presentes em uma paisagem natalina' : 'Paisagem dourada com a mensagem Feliz 2027'} />
          {!failed && <video key={theme} ref={video} src={`/media/${theme}-greeting.mp4`} poster={`/media/${theme}-poster.jpg`} muted loop playsInline preload="metadata" aria-label={christmas ? 'Animação de Papai Noel desejando Feliz Natal' : 'Animação suave desejando Feliz 2027'} onError={() => setFailed(true)} />}
          {christmas && <Santa className="banner-santa" />}
        </div>
        <div className="seasonal-film-caption"><span>{christmas ? 'Um Feliz Natal, da nossa família para a sua.' : 'Um horizonte de bons momentos.'}</span>
          {!reduced && <button type="button" onClick={onToggle} aria-pressed={paused} aria-label={stopped ? 'Retomar animações festivas' : 'Pausar animações festivas'}><Icon name={stopped ? 'play' : 'pause'} />{stopped ? 'Retomar' : 'Pausar'}<span className="seasonal-control-detail"> animações</span></button>}
        </div>
      </div>
    </div>
    {christmas && <Lights className="banner-lights" />}
    {reduced && <p className="seasonal-motion-note">Exibição estática conforme sua preferência de movimento reduzido.</p>}
  </section>;
}
