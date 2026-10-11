import { useEffect, useState } from 'react';

const themes = ['padrao', 'natal', 'reveillon'];
export function validateTheme(config) {
  return themes.includes(config?.theme) ? config.theme : 'padrao';
}

export default function useSeasonalTheme() {
  // Local review links only. Production always follows site-theme.json.
  const requestedPreview = import.meta.env?.DEV ? new URLSearchParams(location.search).get('tema') : null;
  const preview = themes.includes(requestedPreview) ? requestedPreview : null;
  const [theme, setTheme] = useState(preview || 'padrao');
  useEffect(() => {
    if (preview) { setTheme(preview); return; }
    let active = true;
    let pending = false;
    let controller;
    const refresh = async () => {
      if (document.hidden || pending) return;
      pending = true;
      controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      try {
        const response = await fetch(`/site-theme.json?t=${Date.now()}`, { cache: 'no-store', signal: controller.signal });
        if (!response.ok) throw new Error('Theme config unavailable');
        const next = validateTheme(await response.json());
        if (active) setTheme(next);
      } catch { /* Keep the last valid theme when the connection is unavailable. */ }
      finally { clearTimeout(timeout); pending = false; }
    };
    refresh();
    const interval = setInterval(refresh, 30000);
    const resume = () => { if (!document.hidden) refresh(); };
    document.addEventListener('visibilitychange', resume);
    return () => { active = false; clearInterval(interval); controller?.abort(); document.removeEventListener('visibilitychange', resume); };
  }, [preview]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    return () => { delete document.documentElement.dataset.theme; };
  }, [theme]);
  return theme;
}
