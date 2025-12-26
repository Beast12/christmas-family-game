export const themeOptions = [
  { id: 'christmas-eve', labelKey: 'themeChristmasEve' },
  { id: 'christmas-day', labelKey: 'themeChristmasDay' },
  { id: 'easter', labelKey: 'themeEaster' },
  { id: 'summer', labelKey: 'themeSummer' },
  { id: 'cozy', labelKey: 'themeCozy' },
  { id: 'sunset', labelKey: 'themeSunset' },
  { id: 'slate', labelKey: 'themeSlate' },
] as const;

export type ThemeId = (typeof themeOptions)[number]['id'];

const christmasThemeIds: ThemeId[] = ['christmas-eve', 'christmas-day'];

export function isChristmasTheme(theme: ThemeId) {
  return christmasThemeIds.includes(theme);
}

export function isThemeId(value: string): value is ThemeId {
  return themeOptions.some((option) => option.id === value);
}
