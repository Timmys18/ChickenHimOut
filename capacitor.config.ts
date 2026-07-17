import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.chickenhimout.game',
  appName: 'ChickenHimOut',
  webDir: 'dist',
  backgroundColor: '#071a38',
  server: { androidScheme: 'https' }
};

export default config;
