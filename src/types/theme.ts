export type SiteTheme = 'padrao' | 'natal' | 'reveillon';
export interface ThemeConfig { theme: SiteTheme }

export function isSiteTheme(value: unknown): value is SiteTheme {
  return value === 'padrao' || value === 'natal' || value === 'reveillon';
}

export function validateTheme(config: unknown): SiteTheme {
  return typeof config === 'object' && config !== null && 'theme' in config && isSiteTheme(config.theme)
    ? config.theme : 'padrao';
}
