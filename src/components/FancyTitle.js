import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: min(92vw, 820px);
  margin: 0 auto;
`;

/*
  SVG 타이틀
  - 메인 텍스트: 그라디언트 + 이중 스트로크(화이트 내부, 퍼플 외곽) + 드롭섀도우
  - 서브 텍스트: 보라색 필 + 라운드 필(알약 형태) + 섀도우
*/
const FancyTitle = ({ mainText = '우리아기 태아보험', subtitle = '내 아이의 생애 첫 보험' }) => {
  return (
    <Wrapper>
      <svg viewBox="0 0 800 420" width="100%" role="img" aria-label={`${mainText} - ${subtitle}`}>
        <defs>
          <linearGradient id="textGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.22" />
          </filter>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#000" floodOpacity="0.14" />
          </filter>
        </defs>

        {/* 메인 텍스트 그룹 */}
        <g transform="translate(400 195)" textAnchor="middle" fontFamily="'Noto Sans KR', sans-serif" fontWeight="900">
          {/* 외곽 퍼플 두꺼운 스트로크 */}
          <text fontSize="120" fill="none" stroke="#ad6510" strokeWidth="22" filter="url(#shadow)">
            {mainText}
          </text>
          {/* 화이트 내부 스트로크 */}
          <text fontSize="120" fill="none" stroke="#ffffff" strokeWidth="12">
            {mainText}
          </text>
          {/* 그라디언트 필 */}
          <text fontSize="120" fill="url(#textGradient)">
            {mainText}
          </text>
        </g>

        {/* 서브 타이틀 알약 배경 */}
        <g filter="url(#softShadow)">
          <rect x="180" y="250" rx="36" ry="36" width="440" height="80" fill="#f59e0b" />
          <rect x="190" y="260" rx="28" ry="28" width="420" height="60" fill="#fdba74" />
        </g>
        {/* 서브 텍스트 */}
        <text x="400" y="300" textAnchor="middle" fontFamily="'Noto Sans KR', sans-serif" fontWeight="900" fontSize="34" fill="#3b2f2a">
          {subtitle}
        </text>
      </svg>
    </Wrapper>
  );
};

export default FancyTitle;
