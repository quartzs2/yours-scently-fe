# 취향 기반 향수 추천 플랫폼(Yours, Scently) 개발 프로젝트

## 📖 프로젝트 소개

> 취향 기반 향수 추천 플랫폼(Yours, Scently) 개발 프로젝트입니다.  
> 개인 맞춤형 향수 추천, 향수 리뷰 및 평점 관리 기능을 제공합니다.

---

## :link: 배포 링크

> ### [Yours, Scently](https://yours-scently-fe.vercel.app/)

---

## 🧰 기술 스택

  <div>
    
  #### Framework / Language
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=React&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white">

#### Styling / UI

  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
  <img src="https://img.shields.io/badge/SVGR-FFB13B?style=for-the-badge">
  <img src="https://img.shields.io/badge/lucide-react-8c058f?style=for-the-badge">
  <img src="https://img.shields.io/badge/overlay-kit-acee1f?style=for-the-badge">

#### State / Data Management

  <img src="https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white">

#### Form / Validation

  <img src="https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white">
  <img src="https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white">

#### HTTP / API

  <img src="https://img.shields.io/badge/ky-e5e052?style=for-the-badge">

#### Utilities / Helpers

  <img src="https://img.shields.io/badge/clsx-000000?style=for-the-badge">

#### Components / UI Enhancement

  <img src="https://img.shields.io/badge/Swiper-52dbe5?style=for-the-badge">

#### Code Quality / Dev Tools

  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white">
  <img src="https://img.shields.io/badge/Prettier-FF4F8B?style=for-the-badge&logo=Prettier&logoColor=white">
   <img src="https://img.shields.io/badge/husky-054a76?style=for-the-badge">

#### 배포

  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white">
    
  </div>

---

## :busts_in_silhouette: 팀 소개

### FE

| <a href="https://github.com/quartzs2"/><img src="https://avatars.githubusercontent.com/u/48789173?v=4" width=100px /><br/><sub><b>@quartzs2<b/><sub/><a/><br/> | <a href="https://github.com/ella6010"/><img src="https://avatars.githubusercontent.com/u/131748669?v=4" width=100px /><br/><sub><b>@ella6010<b/><sub/><a/><br/> | <a href="https://github.com/LHM52"/><img src="https://avatars.githubusercontent.com/u/70637779?v=4" width=100px /><br/><sub><b>@LHM52<b/><sub/><a/><br/> | <a href="https://github.com/dideksql"/><img src="https://avatars.githubusercontent.com/u/205254643?v=4" width=100px /><br/><sub><b>@dideksql<b/><sub/><a/><br/> |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                             천승현                                                                             |                                                                             정상희                                                                              |                                                                          이형민                                                                          |                                                                             양단비                                                                              |
|                                                                              팀장                                                                              |                                                                              팀원                                                                               |                                                                           팀원                                                                           |                                                                              팀원                                                                               |

---

## 📑 Git & 협업 규칙

### Branch Strategy

> | 브랜치   | 설명                                                                  |
> | -------- | --------------------------------------------------------------------- |
> | chore    | 빌드 업무 수정, 패키지 매니저 수정, 패키지 관리자 구성 등 업데이트 등 |
> | design   | CSS 등 사용자 UI 디자인 변경                                          |
> | docs     | 문서 수정                                                             |
> | feature  | 새로운 기능을 추가                                                    |
> | fix      | 버그 수정                                                             |
> | refactor | 코드 리팩토링                                                         |
> | remove   | 파일을 삭제하는 작업만 수행한 경우                                    |
> | style    | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우                 |

### Issue 생성

> 1. 지라 이슈 생성 -> 담당자, 기간 지정
> 2. Issue 제목: <타입>: 이슈 제목
> 3. Labels, Assignees, Development 지정

### Branch 생성

> 기능별 브랜치를 develop 브랜치로부터 분기하여 feature/기능명 형식으로 생성

### Commit Convention

```
<타입>: <커밋 제목>(#이슈 번호)

- 무엇을 변경했는지 또는 왜 변경했는지 설명
```

> | 타입     | 설명                       |
> | -------- | -------------------------- |
> | feat     | 새로운 기능 추가           |
> | design   | CSS 등 UI 디자인 변경      |
> | fix      | 버그 수정                  |
> | chore    | 빌드, 설정 등 수정         |
> | refactor | 코드 리팩토링              |
> | style    | 코드 포맷팅, 세미콜론 추가 |
> | docs     | 문서 수정 (README.md 등)   |
> | remove   | 불필요한 파일 삭제         |

### PR Review & Merge

> - 기능 개발 완료 시 develop 브랜치로 PR
> - PR 제목: <타입>: PR 제목(#이슈 번호)
> - 2명 이상의 PR 리뷰 승인 및 CI 통과해야 merge 가능
> - Merge 후 브랜치 삭제

### Code Convention

> - 함수명: camelCase
> - 컴포넌트명: PascalCase
> - 폴더명: Kebab-case

### Communication Rules

> - Discord, ZEP: 실시간 소통
> - Notion: 데일리 스크럼, 일정, 회의록
> - JIRA: 업무 관리
