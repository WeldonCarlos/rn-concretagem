import { useEffect, useRef, useState } from 'react';
import Icon from '../ui/Icon.tsx';
import poster from '../../assets/optimized/pavimento.jpg';

// Local media: no third-party player, analytics or optional cookies.
export default function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [wideScreen, setWideScreen] = useState(() => window.matchMedia('(min-width: 1441px)').matches);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1441px)');
    const update = () => setWideScreen(wide.matches);
    wide.addEventListener('change', update);
    return () => wide.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let visible = true;
    let active = true;
    const update = () => {
      if (paused || !visible || document.hidden) video.pause();
      else video.play().catch(() => { if (active) setPaused(true); });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(video);
    document.addEventListener('visibilitychange', update);
    return () => {
      active = false;
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      video.pause();
    };
  }, [paused, reduceMotion, failed, wideScreen]);

  return <>
    <img className="hero-photo" src={poster} alt="Pavimento de pavers em execução, foto do acervo RN" fetchPriority="high" />
    {!wideScreen && !reduceMotion && !failed && <>
      <video
        ref={videoRef}
        className="hero-photo hero-video"
        src="/media/rn-hero.mp4"
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onError={() => setFailed(true)}
      />
      <button className="video-toggle" type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Reproduzir vídeo de fundo' : 'Pausar vídeo de fundo'}>
        <Icon name={paused ? 'play' : 'pause'} /> {paused ? 'Reproduzir vídeo' : 'Pausar vídeo'}
      </button>
    </>}
  </>;
}
