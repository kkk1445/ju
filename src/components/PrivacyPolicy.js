import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PrivacyContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const PrivacyTitle = styled.h1`
  color: #2563eb;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #374151;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
`;

const Content = styled.div`
  line-height: 1.8;
  color: #4b5563;
`;

const List = styled.ul`
  margin-left: 1.5rem;
  margin-top: 1rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const ContactInfo = styled.div`
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
  border-left: 4px solid #2563eb;
`;

const ContactTitle = styled.h3`
  color: #2563eb;
  margin-bottom: 1rem;
`;

const ContactDetail = styled.div`
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const PrivacyPolicy = () => {
  return (
    <PrivacyContainer>
      <PrivacyTitle>개인정보 처리방침</PrivacyTitle>
      
      <Section>
        <Content>
          '태아보험 상담'는 (이하 '회사'라 합니다.) 회사가 운영하는 인터넷 사이트를 이용하는 이용자님들의 개인정보를 중요시하며, 
          아래와 같은 개인정보처리방침을 가지고 있습니다. 이 개인정보처리방침은 "정보통신망 이용촉진 및 정보보호 등에 관한 법률", 
          "개인정보 보호법" 및 "전자상거래 등에서의 소비자 보호에 관한 법률" 등 개인정보와 관련된 법령 상의 개인정보보호규정과 
          방송통신위원회 및 개인정보보호위원회 등 관계부처가 제정한 가이드라인을 준수하고 있습니다.
        </Content>
      </Section>

      <Section>
        <SectionTitle>1. 수집하는 개인정보 항목 및 수집방법</SectionTitle>
        <Content>
          회사는 회원가입, 원활한 고객상담, 각종 서비스 등 기본적인 서비스 제공을 위한 필수정보와 고객 맞춤 서비스 제공을 위한 선택정보로 구분하여 아래와 같은 개인정보를 수집하고 있습니다.
        </Content>
        <List>
          <ListItem><strong>필수항목:</strong> 이름, 연락처</ListItem>
          <ListItem><strong>선택항목:</strong> 이메일주소, 생년월일, 성별, 보험종류, 원하는가격, 보험중요도, 기타문의</ListItem>
        </List>
        <Content>
          서비스 이용과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될 수 있습니다.<br/>
          (IP Address, 쿠키, 서비스 이용 기록, 불량 이용 기록, 참여일시, 참여이벤트, 발신전화번호, 상담내역기록 등)
        </Content>
      </Section>

      <Section>
        <SectionTitle>2. 개인정보의 이용목적</SectionTitle>
        <Content>
          회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다. 이용자가 제공한 모든 정보는 하기 목적에 필요한 용도 이외로는 사용되지 않으며 이용 목적이 변경될 시에는 사전 동의를 구할 것입니다.
        </Content>
        <List>
          <ListItem>위탁업체의 전화, 문자, 이메일 및 방문을 통한 보험상품의 안내 및 가입</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>3. 개인정보의 보유 · 이용 기간</SectionTitle>
        <Content>
          회사는 개인정보제공일로부터 서비스를 제공하는 기간 동안에 한하여 이용자의 개인정보를 보유 및 이용하게 됩니다.
        </Content>
        <Content>
          단, "정보통신망 이용촉진 및 정보보호 등에 관한 법률"에 따라 3년간 회사 서비스를 이용하지 아니하는 경우에는 이용자의 개인정보를 해당 기간 경과 후 즉시 파기합니다.
        </Content>
      </Section>

      <Section>
        <SectionTitle>4. 개인정보의 제 3자 제공 및 취급위탁</SectionTitle>
        <Content>
          회사는 귀하의 개인정보를 개인정보의 이용목적에서 고지한 범위 내에서만 사용하며, 동 범위를 초과하여 이용하거나 이용목적이 다른 타인 또는 타기업, 기관에 제공하지 않습니다. 
          그러나 이용목적에 맞는 보다 나은 서비스를 제공하는 제휴사에 개인정보를 제공하거나 공유할 수 있습니다.
        </Content>
      </Section>

      <ContactInfo>
        <ContactTitle>개인정보 관리책임자</ContactTitle>
        <ContactDetail>이름: 태아보험 상담팀</ContactDetail>
        <ContactDetail>연락처: 070-4513-8888</ContactDetail>
        <ContactDetail>이메일: contact@fetal-insurance.com</ContactDetail>
      </ContactInfo>

      <Section>
        <Content style={{ fontSize: '0.9rem', color: '#666', textAlign: 'center', marginTop: '2rem' }}>
          개인정보처리방침 공고 및 시행일자: 2024년 01월 01일
        </Content>
      </Section>
    </PrivacyContainer>
  );
};

export default PrivacyPolicy;
