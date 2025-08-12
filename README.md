# 태아보험 신청 랜딩페이지

태아보험 신청자를 받는 현대적이고 반응형 랜딩페이지입니다. Firebase를 백엔드로 사용하여 신청 데이터를 관리하고, 관리자 패널을 통해 신청 현황을 모니터링할 수 있습니다.

## 🚀 주요 기능

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기에서 최적화
- **현대적 UI/UX**: Framer Motion을 활용한 부드러운 애니메이션
- **Firebase 연동**: 실시간 데이터베이스 및 관리자 기능
- **폼 검증**: React Hook Form을 사용한 강력한 폼 검증
- **관리자 패널**: 신청 현황 관리 및 상태 업데이트

## 🛠️ 기술 스택

- **Frontend**: React 18, Styled Components
- **Backend**: Firebase (Firestore, Authentication)
- **UI/UX**: Framer Motion, React Hot Toast
- **폼 관리**: React Hook Form
- **라우팅**: React Router DOM

## 📦 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. Firebase 설정
1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
2. Firestore Database 활성화
3. `src/firebase/config.js` 파일에서 Firebase 설정 정보 업데이트:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 3. 개발 서버 실행
```bash
npm start
```

### 4. 빌드
```bash
npm run build
```

## 📱 페이지 구조

- **메인 페이지** (`/`): 태아보험 소개 및 신청 폼
- **관리자 패널** (`/admin`): 신청 현황 관리

## 🔧 Firebase 설정

### Firestore 규칙
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /applications/{document} {
      allow read, write: if true; // 개발용 - 프로덕션에서는 인증 필요
    }
  }
}
```

### 컬렉션 구조
```
applications/
  ├── documentId/
  │   ├── applicantName: string
  │   ├── phone: string
  │   ├── email: string
  │   ├── dueDate: timestamp
  │   ├── budget: string
  │   ├── additionalInfo: string
  │   ├── status: string (pending/contacted/completed/cancelled)
  │   └── createdAt: timestamp
```

## 🚀 배포

### Netlify 배포 (권장)
1. GitHub에 코드 푸시
2. [Netlify](https://netlify.com)에서 GitHub 저장소 연결
3. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `build`

### 환경 변수 설정
Netlify에서 다음 환경 변수 설정:
```
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

## 📋 신청 폼 필드

- **신청자 성명** (필수)
- **연락처** (필수)
- **이메일** (선택)
- **예정일** (필수)
- **보험료 예산** (선택)
- **추가 문의사항** (선택)

## 🔐 보안 고려사항

- 프로덕션 환경에서는 Firebase Authentication 활성화
- Firestore 보안 규칙 설정
- API 키 환경 변수로 관리
- HTTPS 사용

## 📞 지원

문제가 있거나 질문이 있으시면 이슈를 생성해주세요.

## �� 라이선스

MIT License
