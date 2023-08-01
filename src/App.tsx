import { RouterProvider } from 'react-router-dom';

import { Toaster } from './components/ui/toaster';
import { Providers } from './providers';
import { router } from './routes/router';

export const App = () => {
  return (
    <>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
      <Toaster />
    </>
  );
};
