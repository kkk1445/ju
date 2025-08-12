import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
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
  padding-top: 0; /* 랜딩은 풀스크린 */
`;

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <MainContent>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </MainContent>
        <Toaster position="top-center" />
      </AppContainer>
    </Router>
  );
};

export default App;
