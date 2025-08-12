import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderContainer = styled.header`
  display: none; /* 랜딩 전용 페이지에서는 헤더 숨김 */
`;

const Header = () => {
  return <HeaderContainer />;
};

export default Header;
