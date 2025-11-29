<script setup lang="ts">
import { ref } from 'vue';
import dayjs from 'dayjs';

// 타입 정의
interface Project {
  name: string;
  period: string;
  technologies: string;
  description: string[];
  responsibilities?: string[];
}

// 자기소개 데이터
const keywordData = ref([
  {
    title: '오너십',
    description: '주인의식을 갖고 일합니다. 모든 면에서 완성도가 높은 제품을 만들어서 사용자가 좋은 경험을 가져가는 것을 목표로 합니다. 이를 위해 필요한 업무라면 영역을 가리지 않고 협업합니다. 제거해야할 방해요소가 있거나 좋은 아이디어가 있을 때 성장을 위해 적극적으로 목소리를 냅니다.'
  },
  {
    title: '신뢰',
    description: '업무를 빠르고 정확하게 수행하는 믿고 맡길 수 있는 동료입니다. 신뢰할 수 있는 동료가 되기 위해서 변명하지 않고 부족한 점을 빠르게 인정합니다. 팀이 좋은 방향으로 나아갈 수 있도록 적극적으로 동료들과 피드백을 주고받고 투명하게 업무를 처리하는 문화를 주도합니다.'
  },
  {
    title: '커뮤니케이션',
    description: '대화가 잘 통합니다. 코딩만 하는 개발자가 아니라 비즈니스를 이해하여 넓은 시선으로 제품을 바라봅니다. 이러한 지식을 기반으로 여러 직군의 동료들과 소통하면서 일합니다. 정확한 메시지로 오해 없는 커뮤니케이션을 하는 것이 저의 강점입니다.'
  },
  {
    title: '효율성',
    description: '우선순위를 정하여 선택과 집중합니다. 비효율적인 프로세스를 개선하고 업무를 간소화시키기 위해 노력합니다. 불필요한 요소들을 찾아 제거하고 생산성을 높이기 위한 좋은 방법을 제안합니다.',
  }
]);

// 기술 스택 데이터
const techStackData = ref([
  { name: 'Vue3', isMain: true },
  { name: 'TypeScript', isMain: false },
  { name: 'C++', isMain: false },
  { name: 'Java', isMain: false },
  { name: 'Android Kotlin', isMain: false },
  { name: 'React', isMain: false },
  { name: 'AWS', isMain: false },
  { name: 'Github Actions', isMain: false },
  { name: 'Datadog', isMain: false },
  { name: 'Git', isMain: false },
  { name: 'Storybook', isMain: false },
  { name: 'Atlassian', isMain: false },
  { name: 'Figma', isMain: false },
]);

// 경력 데이터
const careerData = ref([
  {
    company: '주식회사 리코',
    period: '2021년 1월 ~ 재직중',
    duration: '약 4년 8개월',
    position: '프론트엔드 개발자',
    projects: [
      {
        name: '업박스 클라우드 개발 - 폐기물 매니지먼트 서비스',
        period: '2021년 1월 ~ 진행중',
        technologies: 'Vite, Vue3, Android Kotlin, Webview, Github Actions, AWS, TailwindCSS, i18n, Storybook',
        description: ['폐기물 처리 과정의 모든 데이터를 투명하게 관리하는 클라우드 서비스. 어드민, 드라이버, 커스터머 앱을 통해 수거 관리부터 정산까지 자동화된 시스템을 제공합니다.'],
        responsibilities: [
          '프론트엔드 리드로서 1.0부터 현재 2.15.0까지 핵심 멤버로 참여',
          'TypeScript, Vue3 등 기술 스택 의사결정',
          '권한 기반 데이터 관리, 지도 기반 수거 일정 시스템 등 핵심 기능 개발',
          '안드로이드 Kotlin 네이티브 개발 및 WebView 연동',
          'UDS(Upbox Design System) 기반의 컴포넌트 및 레이아웃 설계 및 구현',
          'i18n 도입 및 tailwindcss 도입으로 디자인 통일성 강화',
          '데이터독 도입 및 Github Actions CICD 구축',
        ]
      },
      {
        name: '업박스 홈페이지 제작',
        period: '2021년 1월 ~ 상시 진행',
        technologies: 'VanilaJS, EJS, AWS',
        description: ['회사의 정보가 담긴 리코 홈페이지와 제품 측면에서 인바운드에 초점 맞춘 업박스 홈페이지를 유지보수했습니다.'],
        responsibilities: [
          '각 홈페이지를 유지보수하고, 인바운드 측정을 위해 마케팅팀과 협업하여 데이터를 수집'
        ]
      }
    ]
  },
  {
    company: '주식회사 뱅크비',
    period: '2017년 1월 ~ 2020년 12월',
    duration: '약 4년',
    position: 'C++ 개발자',
    projects: [
      {
        name: '뱅크비 - 베트남 통합계좌관리 솔루션',
        period: '2019년 9월 ~ 2020년 12월',
        technologies: 'C/C++',
        description: ['베트남 은행을 자동으로 연결해주고 입출금내역을 조회하여 계좌를 한눈에 볼 수 있는 모바일 어플리케이션. BIDV, Vietcom, TP 은행 등 약 11개 은행에 대한 계좌조회를 제공합니다.'],
        responsibilities: [
          '은행을 연결하고 내역을 조회하는 스크래핑 모듈을 담당하고(C/C++), 모바일 앱은 베트남 현지 협력사에서 개발',
          '크로스 플랫폼 CMAKE 빌드 구성',
          '2019년 10월 직접 베트남에 가서 현지 직원과 업무를 같이 진행',
          '베트남 은행에서 제공하는 데이터를 크롤링하여 계좌 정보와 이체 기능을 제공',
          '기존 C 코드를 Modern C++로 리팩터링'
        ]
      },
      {
        name: 'Omnidoc - 문서발급 솔루션',
        period: '2019년 4월 ~ 2020년 12월',
        technologies: 'C/C++',
        description: ['17여개의 민원사이트에서 40여개의 민원문서를 발급할 수 있는 솔루션. 타사의 서비스에 탑재되어 고객의 민간업무를 대행해주는 편리한 서비스 제공합니다.'],
        responsibilities: [
          '금융결제원 Payinfo, 신용조회 KCB, 범죄자조회 Crime 등의 사이트 스크래핑 담당'
        ]
      },
      {
        name: '오픈망 직승인 프로젝트',
        period: '2018년 8월 ~ 2019년 3월',
        technologies: 'SpringBoot, JPA',
        description: ['VAN사를 통하지 않고 가맹점과 카드사 간의 E2E 보안을 위한 클라우드 POS 서비스입니다.'],
        responsibilities: [
          '카드사와의 승인 및 매입 관련 프로세스를 테스트하기 위한 더미카드사 서버를 제작 (Spring boot, JPA, MySQL)',
          'VAN사에서 제공하는 가맹점 관리, 결제내역 조회 등의 기능을 직접 구현',
          // '카드사의 결제 시스템을 이해하고 그 안의 보안 시스템을 직접 적용'
        ]
      },
      {
        name: '하나1QPay NFC 결제모듈',
        period: '2017년 6월 ~ 2018년 8월',
        technologies: 'Java, C/C++',
        description: ['하나카드 1QPay 앱에 탑재되는 NFC 모듈로 지불카드의 token화 보안 서비스와, HCE 스펙을 따라 NFC 결제 통신을 제공합니다.'],
        responsibilities: [
          'VISA token 발급 및 EMV 카드 결제 스펙을 이해하여 NFC 결제 모듈을 유지보수 (Android java, JNI)',
          '보안 모듈인 Whitebox 암호화 모듈을 LLVM 난독화 컴파일러로 컴파일하여 SharedObject의 분석 방지 (C++)',
          '라이브러리를 JNI로 연동하여 제공'
        ]
      },
      {
        name: 'TaSIM - 대형가맹점 직승인 프로젝트',
        period: '2017년 1월 ~ 2017년 6월',
        technologies: 'Java Card OS, MFC',
        description: ['카드사와 가맹점 사이의 E2E 암호화를 수행하는 임베디드 카드 암호화 모듈입니다. 중간 VAN사의 영향을 받지 않고, 가맹점 단말기와 카드사 간의 암호화를 제공합니다. 여신협회 taSIM Application Specification 인증, EMVCo 및 CC(Common Criteria) 인증을 취득하고 구현했습니다.'],
        responsibilities: [
          'JavaCOS 에 Applet을 탑재하여 가맹점의 카드 리더 단말기에 장착',
          'Java COS의 작동을 이해하고, 해당 제품을 유지보수 및 대응',
          'Applet 설치용 MFC UI 제작'
        ]
      }
    ]
  }
]);

// 프리랜서 프로젝트 데이터
const freelanceData = ref([
  {
    name: 'MGX 모바일 게임 시세조회 어플리케이션',
    period: '2021년 1월 ~ 2021년 3월',
    technologies: 'ReactNative',
    description: ['리니지m, 리니지2m, 바람의나라 등 모바일 게임의 시세조회, 시세추이, 거래소 아이템 검색 등을 제공하는 어플리케이션. 소식 전하기, 커뮤니티 기능을 제공합니다.'],
    responsibilities: [
      '어플리케이션 제작 담당',
      '구글 로그인을 위한 Firebase 연동 및 카카오 로그인 연동'
    ]
  },
  {
    name: 'KlookPay - KlookPay POC 어플리케이션',
    period: '2020년 9월 ~ 2020년 11월',
    technologies: 'NodeJS, Angular, NativeScript, ExpressJS, Docker',
    description: ['KB카드에서 진행하는 KlookPay 프로젝트의 POC 어플리케이션. KlookPay는 KB카드의 마일리지, 포인트 및 결제 시스템을 Klook에 연동하는 서비스입니다.'],
    responsibilities: [
      'KB카드와 협업하여 안드로이드 앱 기술지원을 진행 (Nativescript-ng)',
      '기존 Angular 개인프로젝트로 진행했던 경험을 바탕으로 현재 버전의 Angular에 맞는 스터디를 다시 진행하고, 어플리케이션 제작',
      '자체 일정관리를 위한 개인 JIRA를 사용하여 프로젝트 진행을 관리'
    ]
  }
]);

// 발표 및 컨퍼런스 데이터
const presentationData = ref([
  {
    title: '데이터독 Observability Day 2024 발표',
    event: 'Datadog Korea Observability Day 2024 - 웨이스트 매니지먼트 스타트업 프론트엔드 개발자의 Datadog을 활용한 효율적인 모니터링 시스템 구축기',
    period: '2024년 9월',
    description: ['O2O 환경의 리코 특성을 살려 데이터독을 에러 분석과 사용성 측정 면에서 활용한 경험을 공유했습니다.'],
    topics: [
      '에러 대응: HEIC 파일 형식 에러 해결, 대시보드 구성, 알림 시스템',
      '데이터 기반 의사결정: 패치 시간 변경, OS 비율 분석',
      '사용성 측정: Custom Action 활용, Funnel 전환율 측정'
    ],
    link: 'https://tech.e3view.com/content/files/2024/10/--------------------------------------------------------------------------------------.pdf',
    eventLink: 'https://www.datadoghq.com/ko/event/datadogliveseoul2024/#speakers'
  }
]);
</script>

<template>
  <div class="resume-background">
    <div class="resume-container">
      <!-- Header Section with Profile -->
      <header class="resume-header">
        <div class="profile-section">
          <div class="profile-background"></div>
          <!-- <div class="profile-photo">
          <img src="/assets/img/boxing.jpg" />
        </div> -->
          <div class="profile-info flex flex-col md:flex-row md:justify-between pb-4 gap-4 md:gap-0">
            <div>
              <div class="profile-info-header">
                <h1 class="name">이현수</h1>
                <h2 class="title">프론트엔드 개발자</h2>
              </div>
              <!-- <h2 class="title text-sm">토스 플레이스의 시작을 함께 만들어갈 프론트엔드 개발자</h2> -->
              <!-- <div class="text-xs">토스 플레이스의 시작을 함께 만들어갈 개발자입니다.</div> -->
              <!-- <h2 class="title text-sm">초기 멤버로서 겪는 시행착오를 성장 동력으로 삼는 능동적인 프론트엔드 개발자</h2> -->
              <!-- <h2 class="title text-sm">시작부터 안정화까지 경험한 프론트엔드 개발자</h2> -->
              <!-- <h2 class="title text-xs mt-2">
                스타트업의 시작부터 안정화까지 경험하며 겪은 시행착오를 성장 동력으로 삼고 발전했습니다. <br />
                이제는 토스 플레이스팀에 기여하고 함께 성장하고 싶습니다.
              </h2> -->
              <h2 class="title text-xs mt-2">
                스타트업 초기 멤버로서의 경험을 바탕으로
                무신사 프론트엔드팀에서 글로벌 패션 플랫폼의 성장과 혁신에 기여하겠습니다.
              </h2>
            </div>
            <div class="contact-info mt-4 md:mt-0 md:text-right">
              <div class="contact-item">
                <span class="label">Email</span>
                <span class="value">iddms5446@gmail.com</span>
              </div>
              <!-- <div class="contact-item">
                <span class="label">Phone</span>
                <span class="value">010-8209-2048</span>
              </div> -->
              <div class="contact-item">
                <span class="label">GitHub</span>
                <span class="value">github.com/lhs-source</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- 자기소개 Section -->
      <section class="section">
        <h2 class="section-title">일하는 방식</h2>

        <div class="subsection">
          <div class="keywords-grid">
            <div v-for="keyword in keywordData" :key="keyword.title" class="keyword-item">
              <h4 class="keyword-title">{{ keyword.title }}</h4>
              <p class="keyword-description">{{ keyword.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 기술 스택 Section -->
      <section class="section">
        <h2 class="section-title">기술 스택</h2>

        <div class="tech-stack-horizontal">
          <div v-for="tech in techStackData" :key="tech.name" class="tech-item-horizontal"
            :class="{ 'main-tech': tech.isMain }">
            {{ tech.name }}
          </div>
        </div>
      </section>

      <!-- 경력 Section -->
      <section class="section">
        <h2 class="section-title">경력 (총 {{ dayjs().diff(dayjs("2017-01-01"), 'year') }}년 {{
          dayjs().diff(dayjs("2021-01-01"), 'month') % 12 }}개월)</h2>

        <div class="career-summary">
          <div class="career-timeline">
            <div class="career-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <span class="company">주식회사 리코</span>
                <div class="text-sm ml-2">
                  폐기물 매니지먼트 클라우드 서비스 기업
                </div>
                <div class="flex-1"></div>
                <span class="period">2021년 1월 ~ 재직중 (약 {{ dayjs().diff(dayjs("2021-01-01"), 'year') }}년
                  {{ dayjs().diff(dayjs("2021-01-01"), 'month') % 12 }}개월)</span>
              </div>
            </div>
            <div class="career-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <span class="company">주식회사 뱅크비</span>
                <div class="text-sm ml-2">
                  스크래핑 전문 핀테크 기업
                </div>
                <div class="flex-1"></div>
                <span class="period">2017년 1월 ~ 2020년 12월 (약 4년)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 각 회사별 상세 경력 -->
        <div v-for="career in careerData" :key="career.company" class="company-detail">
          <div class="company-header">
            <h3 class="company-name">{{ career.company }}</h3>
            <div class="company-info">
              <span class="position">{{ career.position }}</span>
              <span class="duration">{{ career.period }} ({{ career.duration }})</span>
            </div>
          </div>

          <!-- 프로젝트별 상세 -->
          <div class="projects">
            <div v-for="project in career.projects" :key="project.name" class="project-item">
              <div class="project-header">
                <h4 class="project-name">{{ project.name }}</h4>
                <div class="project-meta">
                  <span class="project-period">{{ project.period }}</span>
                  <span class="project-tech">{{ project.technologies }}</span>
                </div>
              </div>

              <div>
                <p v-for="description in project.description" :key="description" class="project-description">
                  {{ description }}
                </p>
              </div>

              <div v-if="project.responsibilities" class="project-responsibilities">
                <h5 class="responsibilities-title">기여 및 성과</h5>
                <ul class="responsibilities-list">
                  <li v-for="responsibility in project.responsibilities" :key="responsibility"
                    class="responsibility-item">
                    {{ responsibility }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 발표 및 컨퍼런스 Section -->
      <section class="section">
        <h2 class="section-title">발표 & 컨퍼런스</h2>

        <div class="presentations">
          <div v-for="presentation in presentationData" :key="presentation.title" class="presentation-item">
            <div class="presentation-header">
              <h3 class="presentation-name">{{ presentation.title }}</h3>
              <div class="presentation-meta">
                <span class="presentation-period white-space-nowrap">{{ presentation.period }}</span>
                <span class="presentation-event">{{ presentation.event }}</span>
              </div>
            </div>

            <div>
              <p v-for="description in presentation.description" :key="description" class="presentation-description">
                {{ description }}
              </p>
            </div>

            <div class="presentation-topics">
              <h4 class="topics-title">주요 내용</h4>
              <ul class="topics-list">
                <li v-for="topic in presentation.topics" :key="topic" class="topic-item">
                  {{ topic }}
                </li>
              </ul>
            </div>

            <div class="presentation-links">
              <div v-if="presentation.link" class="presentation-link">
                <a :href="presentation.link" target="_blank" class="link">
                  발표 자료 보기 →
                </a>
              </div>
              <div v-if="presentation.eventLink" class="presentation-link">
                <a :href="presentation.eventLink" target="_blank" class="link event-link">
                  컨퍼런스 소개 보기 →
                </a>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </section>

      <!-- 프리랜서 프로젝트 Section -->
      <section class="section">
        <h2 class="section-title">기타 프로젝트</h2>

        <div class="freelance-projects">
          <div v-for="project in freelanceData" :key="project.name" class="freelance-item">
            <div class="project-header">
              <h3 class="project-name">{{ project.name }}</h3>
              <div class="project-meta">
                <span class="project-period">{{ project.period }}</span>
                <span class="project-tech">{{ project.technologies }}</span>
              </div>
            </div>

            <p v-for="description in project.description" :key="description" class="project-description">{{
              description }}</p>

            <div class="project-responsibilities">
              <h4 class="responsibilities-title">기여 및 성과</h4>
              <ul class="responsibilities-list">
                <li v-for="responsibility in project.responsibilities" :key="responsibility"
                  class="responsibility-item">
                  {{ responsibility }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

.resume-background {
  min-height: 120vh;
  // background: white;
  width: 100%;
}

.resume-container {
  // max-width: 1000px; // Removed max-width constraint
  width: 100%;
  margin: 0 auto;
  padding-bottom: 240px;
  // background: white;
  color: #666;
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 1.4;
  box-sizing: border-box;
}

/* Header Section */
.resume-header {
  margin-bottom: 0px;

  .profile-section {
    display: flex;
    gap: 30px;
    align-items: flex-end;
    padding-bottom: 16px;
    background-color: #f9f9f9;
    min-height: 320px;
    position: relative; // Added for absolute background

    .profile-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%; // Changed from 100vw
      height: 320px;
      background-color: #f9f9f9;
    }

    .profile-info {
      z-index: 1;
      flex: 1;
      padding: 0 40px; // Added padding since container padding was removed

      .profile-info-header {
        display: flex;
        align-items: end;
        gap: 8px;

        .name {
          font-size: 36px;
          font-weight: 600;
          color: #333;
        }

        .title {
          font-size: 16px;
          font-weight: 400;
          color: #333;
        }
      }

      .contact-info {
        font-size: 14px;
        margin-top: 12px;
        display: flex;
        flex-direction: column;

        .contact-item {
          display: flex;
          gap: 8px;

          .label {
            font-weight: 500;
            min-width: 60px;
            color: #666;
          }

          .value {
            color: #666;
          }
        }
      }
    }
  }
}

/* Common Styles */
.section {
  padding: 0 40px; // Added padding
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 48px 0 20px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #666;
}

.subsection-title {
  font-size: 18px;
  font-weight: 600;
  color: #666;
  margin: 0 0 15px 0;
}

.content-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 12px 0 8px 0;
}

.content-description {
  color: #555;
  margin: 0 0 4px 0;
  font-size: 13px;
}

.content-list {
  margin: 0;
  padding-left: 18px;

  .content-item {
    position: relative;
    padding-left: 12px;
    margin-bottom: 6px;
    color: #555;
    font-size: 13px;

    &:last-child {
      margin-bottom: 0;
    }


    &::before {
      content: '·';
      position: absolute;
      left: -4px;
      color: #666;
      font-weight: bold;
      font-size: 16px;
    }
  }
}

.item-header {
  margin-bottom: 12px;
}

.item-name {
  border-left: 3px solid #666;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-left: -16px;
  padding-left: 16px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -3px;
    top: 6px;
    bottom: 4px;
    width: 3px;
    background: #666;
  }
}

/* Keywords Grid */
.keywords-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  .keyword-item {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;

    .keyword-title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
    }

    .keyword-description {
      font-size: 13px;
      color: #666;
      line-height: 1.5;
    }
  }
}

/* Tech Stack Horizontal */
.tech-stack-horizontal {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .tech-item-horizontal {
    background: #f0f0f0;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    color: #555;

    &.main-tech {
      background: #333;
      color: white;
      font-weight: 500;
    }
  }
}

/* Career Timeline */
.career-summary {
  margin-bottom: 40px;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;

  .career-timeline {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .career-item {
      display: flex;
      align-items: center;
      gap: 15px;

      .timeline-dot {
        width: 8px;
        height: 8px;
        background: #333;
        border-radius: 50%;
      }

      .timeline-content {
        display: flex;
        align-items: center;
        flex: 1;
        flex-wrap: wrap;
        gap: 10px;

        .company {
          font-weight: 600;
          color: #333;
        }

        .period {
          font-size: 13px;
          color: #888;
        }
      }
    }
  }
}

/* Company Detail */
.company-detail {
  margin-bottom: 60px;

  .company-header {
    margin-bottom: 30px;

    .company-name {
      font-size: 22px;
      font-weight: 700;
      color: #333;
      margin-bottom: 8px;
    }

    .company-info {
      display: flex;
      gap: 15px;
      font-size: 14px;
      color: #666;

      .position {
        font-weight: 500;
        color: #333;
      }
    }
  }
}

/* Projects */
.projects {
  display: flex;
  flex-direction: column;
  gap: 40px;

  .project-item {
    border-left: 2px solid #eee;
    padding-left: 20px;

    &.main-project {
      border-left: 2px solid #333;
    }

    .project-header {
      margin-bottom: 15px;

      .project-name {
        font-size: 18px;
        font-weight: 600;
        color: #333;
        margin-bottom: 5px;
      }

      .project-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        font-size: 13px;
        color: #888;

        .project-tech {
          color: #666;
        }
      }
    }

    .project-description {
      font-size: 14px;
      color: #555;
      margin-bottom: 15px;
      line-height: 1.6;
    }

    .project-responsibilities {
      .responsibilities-title {
        font-size: 14px;
        font-weight: 600;
        color: #333;
        margin-bottom: 8px;
      }

      .responsibilities-list {
        padding-left: 18px;

        .responsibility-item {
          font-size: 13px;
          color: #555;
          margin-bottom: 4px;
          line-height: 1.5;
        }
      }
    }
  }
}

/* Responsibility Categories */
.section-divider {
  height: 1px;
  background: #eee;
  margin: 20px 0;
}

.responsibility-categories {
  margin-top: 20px;

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin-top: 15px;

    .category-card {
      background: #f9f9f9;
      padding: 15px;
      border-radius: 8px;

      .category-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;

        .category-title {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }
      }

      .category-items {
        padding-left: 16px;
        margin: 0;

        .category-item {
          font-size: 12px;
          color: #555;
          margin-bottom: 4px;
          line-height: 1.4;
        }
      }
    }
  }
}

/* Problem Solving Section */
.problem-solving-section {
  margin-top: 20px;

  .problem-solving-categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin-top: 15px;

    .problem-category-card {
      background: #f0f4f8; // Slightly different background
      padding: 15px;
      border-radius: 8px;

      .problem-category-header {
        margin-bottom: 10px;

        .problem-category-title {
          font-size: 14px;
          font-weight: 600;
          color: #2c3e50;
        }
      }

      .problem-category-items {
        padding-left: 16px;
        margin: 0;

        .problem-category-item {
          font-size: 12px;
          color: #555;
          margin-bottom: 4px;
          line-height: 1.4;
        }
      }
    }
  }
}

/* Presentations */
.presentations {
  display: flex;
  flex-direction: column;
  gap: 30px;

  .presentation-item {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;

    .presentation-header {
      margin-bottom: 15px;

      .presentation-name {
        font-size: 18px;
        font-weight: 600;
        color: #333;
        margin-bottom: 5px;
      }

      .presentation-meta {
        font-size: 13px;
        color: #888;
        display: flex;
        gap: 10px;
      }
    }

    .presentation-description {
      font-size: 14px;
      color: #555;
      margin-bottom: 15px;
    }

    .presentation-topics {
      margin-bottom: 15px;

      .topics-title {
        font-size: 13px;
        font-weight: 600;
        color: #333;
        margin-bottom: 5px;
      }

      .topics-list {
        padding-left: 18px;

        .topic-item {
          font-size: 13px;
          color: #555;
          margin-bottom: 3px;
        }
      }
    }

    .presentation-links {
      display: flex;
      gap: 15px;

      .link {
        font-size: 13px;
        color: #2196f3;
        text-decoration: none;
        font-weight: 500;

        &:hover {
          text-decoration: underline;
        }

        &.event-link {
          color: #9c27b0;
        }
      }
    }
  }
}

/* Freelance Projects */
.freelance-projects {
  display: flex;
  flex-direction: column;
  gap: 30px;

  .freelance-item {
    .project-header {
      margin-bottom: 10px;

      .project-name {
        font-size: 16px;
        font-weight: 600;
        color: #333;
        margin-bottom: 5px;
      }

      .project-meta {
        font-size: 13px;
        color: #888;

        .project-tech {
          color: #666;
          margin-left: 10px;
        }
      }
    }

    .project-description {
      font-size: 14px;
      color: #555;
      margin-bottom: 10px;
    }

    .project-responsibilities {
      .responsibilities-title {
        font-size: 13px;
        font-weight: 600;
        color: #333;
        margin-bottom: 5px;
      }

      .responsibilities-list {
        padding-left: 18px;

        .responsibility-item {
          font-size: 13px;
          color: #555;
          margin-bottom: 3px;
        }
      }
    }
  }
}
</style>
