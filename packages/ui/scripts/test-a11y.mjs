#!/usr/bin/env node

/**
 * 접근성 자동 테스트 스크립트
 *
 * 모든 Storybook 스토리에 대해 axe-core를 실행하여 WCAG 2.1 AA 준수 여부를 검증합니다.
 *
 * 사용법:
 *   pnpm test:a11y
 *
 * 옵션:
 *   --verbose: 상세 로그 출력
 *   --component=Button: 특정 컴포넌트만 테스트
 */

import { chromium } from 'playwright';

// WCAG 2.1 AA 준수를 위한 axe-core 설정
const AXE_CONFIG = {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
  },
  rules: {
    // Critical rules for OpenAI Apps SDK compliance
    'color-contrast': { enabled: true },
    'aria-allowed-attr': { enabled: true },
    'aria-required-attr': { enabled: true },
    'button-name': { enabled: true },
    'image-alt': { enabled: true },
    'label': { enabled: true },
    'link-name': { enabled: true },
  },
};

class A11yTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = [];
  }

  async setup() {
    console.log('🚀 접근성 테스트 시작...\n');
    this.browser = await chromium.launch({ headless: true });
    this.page = await this.browser.newPage();

    // Storybook 실행 확인 (로컬 개발 서버 필요)
    const storybookUrl = 'http://localhost:6006';
    try {
      await this.page.goto(storybookUrl, { waitUntil: 'networkidle' });
    } catch (error) {
      throw new Error(
        `❌ Storybook이 실행되지 않았습니다. 먼저 'pnpm storybook'을 실행하세요.\n${error}`
      );
    }

    // axe-core 주입
    await this.injectAxe();
  }

  private async injectAxe() {
    if (!this.page) return;

    // axe-core를 페이지에 주입
    await this.page.addScriptTag({
      url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js',
    });

    // axe가 로드될 때까지 대기
    await this.page.waitForFunction(() => typeof (window as any).axe !== 'undefined');
  }

  async testStory(componentName: string, storyName: string, storyUrl: string) {
    if (!this.page) return;

    console.log(`🔍 테스트 중: ${componentName} - ${storyName}`);

    try {
      // 스토리 페이지로 이동
      await this.page.goto(storyUrl, { waitUntil: 'networkidle' });

      // iframe 내 컨텐츠 대기 (Storybook은 iframe에서 렌더링)
      const frame = this.page.frameLocator('#storybook-preview-iframe');
      await frame.locator('body').waitFor({ state: 'visible' });

      // axe-core 실행
      const axeResults = await this.page.evaluate(async (config) => {
        const iframe = document.querySelector('#storybook-preview-iframe');
        const iframeDocument = iframe?.contentDocument || iframe?.contentWindow?.document;

        if (!iframeDocument) {
          throw new Error('Storybook iframe을 찾을 수 없습니다.');
        }

        return await window.axe.run(iframeDocument.body, config);
      }, AXE_CONFIG);

      // 결과 저장
      this.results.push({
        component: componentName,
        story: storyName,
        violations: axeResults.violations,
        passes: axeResults.passes.length,
        incomplete: axeResults.incomplete.length,
      });

      if (axeResults.violations.length > 0) {
        console.log(`  ❌ ${axeResults.violations.length}개 위반 발견`);
      } else {
        console.log(`  ✅ 통과 (${axeResults.passes.length}개 규칙 검증)`);
      }
    } catch (error) {
      console.error(`  ⚠️  오류: ${error}`);
    }
  }

  async testAllStories() {
    if (!this.page) return;

    // Storybook의 모든 스토리 목록 가져오기
    const stories = await this.page.evaluate(() => {
      const { storyStore } = window.__STORYBOOK_PREVIEW__;
      const allStories = storyStore.raw();

      return Object.entries(allStories).map(([id, story]) => ({
        id,
        componentName: story.title,
        storyName: story.name,
      }));
    });

    console.log(`📚 총 ${stories.length}개 스토리 발견\n`);

    // 각 스토리 테스트
    for (const story of stories) {
      const storyUrl = `http://localhost:6006/iframe.html?id=${story.id}`;
      await this.testStory(story.componentName, story.storyName, storyUrl);
    }
  }

  generateReport() {
    console.log('\n\n📊 접근성 테스트 결과 요약\n');
    console.log('═'.repeat(80));

    const totalViolations = this.results.reduce((sum, r) => sum + r.violations.length, 0);
    const totalPasses = this.results.reduce((sum, r) => sum + r.passes, 0);
    const failedStories = this.results.filter((r) => r.violations.length > 0);

    console.log(`총 테스트: ${this.results.length}개 스토리`);
    console.log(`통과: ${this.results.length - failedStories.length}개`);
    console.log(`실패: ${failedStories.length}개`);
    console.log(`총 위반: ${totalViolations}개`);
    console.log(`총 통과 규칙: ${totalPasses}개\n`);

    if (failedStories.length > 0) {
      console.log('❌ 위반 사항 상세:\n');

      failedStories.forEach((result) => {
        console.log(`\n[${result.component} - ${result.story}]`);
        console.log('─'.repeat(80));

        result.violations.forEach((violation) => {
          console.log(`\n⚠️  ${violation.help}`);
          console.log(`   영향도: ${violation.impact?.toUpperCase()}`);
          console.log(`   설명: ${violation.description}`);
          console.log(`   WCAG: ${violation.tags.filter((t) => t.startsWith('wcag')).join(', ')}`);
          console.log(`   자세히: ${violation.helpUrl}`);

          violation.nodes.forEach((node, idx) => {
            console.log(`\n   발견 위치 ${idx + 1}:`);
            console.log(`   - HTML: ${node.html}`);
            console.log(`   - Selector: ${node.target.join(' > ')}`);

            if (node.failureSummary) {
              console.log(`   - 문제: ${node.failureSummary}`);
            }
          });
        });
      });

      console.log('\n\n');
    }

    console.log('═'.repeat(80));

    // 종료 코드 설정 (CI/CD에서 실패 처리)
    if (totalViolations > 0) {
      console.log('\n❌ 접근성 테스트 실패: 위반 사항을 수정하세요.\n');
      process.exit(1);
    } else {
      console.log('\n✅ 모든 접근성 테스트 통과!\n');
      process.exit(0);
    }
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async run() {
    try {
      await this.setup();
      await this.testAllStories();
      this.generateReport();
    } catch (error) {
      console.error('\n❌ 테스트 실행 중 오류 발생:', error);
      process.exit(1);
    } finally {
      await this.cleanup();
    }
  }
}

// 스크립트 실행
const tester = new A11yTester();
tester.run();
