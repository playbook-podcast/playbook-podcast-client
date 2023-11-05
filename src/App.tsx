import { ProviderRouter, ProviderTheme } from './providers';

export const App = () => {
  return (
    <ProviderTheme>
      <ProviderRouter />
    </ProviderTheme>
  );
};
