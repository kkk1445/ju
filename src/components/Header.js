import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 1rem 2rem;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2563eb;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #2563eb;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.98);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  z-index: 1001;
`;

const MobileNavLink = styled(motion.a)`
  text-decoration: none;
  color: #374151;
  font-size: 1.5rem;
  font-weight: 500;
  
  &:hover {
    color: #2563eb;
  }
`;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '#home', text: '홈' },
    { href: '#benefits', text: '혜택' },
    { href: '#process', text: '신청절차' },
    { href: '/privacy', text: '개인정보처리방침' }
  ];

  return (
    <HeaderContainer>
      <Nav>
        <Logo
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          태아보험
        </Logo>
        
        <NavLinks>
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              href={item.href}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.text}
            </NavLink>
          ))}
        </NavLinks>
        
        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </Nav>
      
      {isMobileMenuOpen && (
        <MobileMenu
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {navItems.map((item, index) => (
            <MobileNavLink
              key={index}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {item.text}
            </MobileNavLink>
          ))}
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

export default Header;
