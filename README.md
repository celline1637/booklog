````markdown
# 📚 Multi Step Book Review Form

> 독서 기록 작성을 위한 멀티 폼 프로젝트입니다.  
> 독서 상태, 도서 정보, 별점, 후기를 단계별로 기록하고, 각 스텝에 대한 유효성 검증 및 상태 복원을 지원합니다.

---

## 🛠️ 기술 스택

- **Next.js 15 (Page Router X)**
- **TypeScript**
- **React Hook Form + Yup**: 폼 상태 및 검증
- **MUI (Material UI)**: UI 컴포넌트
- **Dayjs**: 날짜 처리
- **Jotai**: 전역 상태 관리 및 로컬 스토리지 persistence
- **Emotion**: 스타일링 및 SSR 대응

---

## 🧩 주요 기능

| 기능                          | 설명                                                      |
| ----------------------------- | --------------------------------------------------------- |
| 📖 멀티 스텝 폼               | 총 5단계: 책 정보 → 별점 → 독후감 → 인용구 → 공개 여부    |
| ✅ 유효성 검증                | 각 스텝마다 Yup을 통한 세부 조건 검증 지원                |
| 💾 폼 상태 저장               | Jotai + atomWithStorage로 새로고침 후에도 상태 복원       |
| 📅 날짜 유효성 처리           | 출판일, 시작일, 종료일 간의 상호 유효성 검증 포함         |
| ♻️ 재사용 가능한 RHF 컴포넌트 | RHFTextField, RHFDateTimePicker 등 추상화된 입력 컴포넌트 |
| 💡 Step Progress Bar          | 현재 위치를 직관적으로 보여주는 프로그레스 UI             |

---

## 🧪 실행 방법

```bash
pnpm install
pnpm dev
```
````

---

## 📁 프로젝트 구조 요약

```
src/
├── pages/               # Next.js 라우트 파일
├── schema/              # Yup 기반 폼 유효성 스키마
├── shared/
│   ├── components/      # RHF, Funnel, Layout 등 공용 컴포넌트
│   ├── theme/           # MUI 테마 및 emotion SSR 설정
│   └── utils/           # 타입 및 시간 유틸
├── provider/            # EmotionCache, QueryProvider
└── config/              # enum 및 상수 모음
```

---
