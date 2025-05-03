
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-12">
        <Outlet />
      </main>
      <footer className="bg-gray-50 py-6 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Recipe Bazaar - All your favorite recipes in one place</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
