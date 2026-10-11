import { useEffect, useState } from 'react';
import { isSiteTheme, validateTheme } from '../../types/theme.ts';
import type { SiteTheme } from '../../types/theme.ts';

export default function useSeasonalTheme() {
  // Local review links only. Production always follows site-theme.json.
  const requestedPreview = import.meta.env?.DEV ? new URLSearchParams(location.search).get('tema') : null;
  const preview = isSiteTheme(requestedPreview) ? requestedPreview : null;
  const [theme, setTheme] = useState<SiteTheme>(preview || 'padrao');
  useEffect(() => {
    if (preview) { setTheme(preview); return; }
    let active = true;
    let pending = false;
    let controller: AbortController | undefined;
    const refresh = async () => {
      if (document.hidden || pending) return;
      pending = true;
      const requestController = new AbortController();
      controller = requestController;
      const timeout = setTimeout(() => requestController.abort(), 5000);
      try {
        const response = await fetch(`/site-theme.json?t=${Date.now()}`, { cache: 'no-store', signal: requestController.signal });
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
