import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Hero from './components/Hero';
import ApplicationForm from './components/ApplicationForm';
import AdminPanel from './components/AdminPanel';
import PrivacyPolicy from './components/PrivacyPolicy';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f8fafc;
    color: #374151;
    line-height: 1.6;
  }

  html {
    scroll-behavior: smooth;
  }

  button {
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
`;

const MainContent = styled.main`
  padding-top: 80px; /* Header 높이만큼 여백 */
`;

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleApplyClick = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route 
              path="/" 
              element={<Hero onApplyClick={handleApplyClick} />} 
            />
            <Route 
              path="/admin" 
              element={<AdminPanel />} 
            />
            <Route 
              path="/privacy" 
              element={<PrivacyPolicy />} 
            />
          </Routes>
        </MainContent>
        
        <ApplicationForm 
          isOpen={isFormOpen} 
          onClose={handleFormClose} 
        />
        
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: '',
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: '#4aed88',
              },
            },
          }}
        />
      </AppContainer>
    </Router>
  );
};

export default App;
