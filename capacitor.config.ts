import type { CapacitorConfig } from '@capacitor/cli';

// La rotation d'écran est configurée dans le workflow Android au moment du build.\nconst config: CapacitorConfig = {
  appId: 'com.ebiblia.app',
  appName: 'E-Biblia',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      launchShowDuration: 0,
      launchFadeOutDuration: 0,
      showSpinner: false,
      backgroundColor: '#000000'
    }
  }
};

export default config;
