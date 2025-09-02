import { ReactNode } from 'react';
import { RouterProvider } from './RouterProvider';
import { AppRouter } from '../routes/AppRouter';
import { Navbar } from '@/widgets/navbar';
import { Header } from '@/widgets/header';

interface AppProps {
  children?: ReactNode;
}

export const App = ({ children }: AppProps) => {
  return (
    <RouterProvider>
      <div className="app-layout">
        <Header />
        
        <main className="app-content">
          <div className="container main-content-container">
            {children || <AppRouter />}
          </div>
        </main>
        
        <Navbar />
      </div>
    </RouterProvider>
  );
};