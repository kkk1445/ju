# 태아보험 신청 랜딩페이지

초간단 상담신청 랜딩페이지. 홈에서는 오직 신청 폼만 노출되며, 수집 항목은 다음과 같습니다.

- 이름 (필수)
- 연락처: 3분할 입력 (필수)
- 임신주수 (선택)
- 문의사항 (선택)
- 개인정보 수집 이용 동의 (필수)

관리자는 `/admin`에서 신청 내역을 확인합니다.

## 실행
```bash
npm install
npm start
```

## 배포
- GitHub 연결 후 Netlify로 자동 배포
- Firebase Firestore에 `applications` 컬렉션 사용

## Firestore 규칙 (개발용)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /applications/{document} {
      allow read, write: if true;
    }
  }
}
```
