import { AppConfigProvider } from './AppConfigProvider';
import { AuthProvider } from './AuthProvider';

interface ProvidersProps {
  children: React.ReactNode;
}
export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <AppConfigProvider>
      <AuthProvider>{children}</AuthProvider>
    </AppConfigProvider>
  );
};
