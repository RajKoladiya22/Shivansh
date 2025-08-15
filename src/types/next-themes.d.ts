// types/next-themes.d.ts
declare module 'next-themes' {
  import React from 'react';

  interface UseThemeProps {
    theme?: string;
    resolvedTheme?: string;
    systemTheme?: string;
    themes: string[];
    setTheme: (theme: string) => void;
    forcedTheme?: string;
  }

  interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: string;
    attribute?: string;
    value?: Record<string, string>;
    storageKey?: string;
    enableSystem?: boolean;
    forcedTheme?: string;
    disableTransitionOnChange?: boolean;
    themes?: string[];
    nonce?: string;
    scriptProps?: Record<string, any>;
  }

  export const useTheme: () => UseThemeProps;
  export const ThemeProvider: React.FC<ThemeProviderProps>;
}
