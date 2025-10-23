import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./card";
import { Button } from "../button/button";

const meta = {
  title: "Components/Card",
  component: Card.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Card 컴포넌트입니다.
 * 제목, 내용, 액션 버튼을 포함합니다.
 */
export const Default: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Card.Root>
        <Card.Header>
          <Card.Title>Card Title</Card.Title>
          <Card.Metadata>
            <span>Metadata</span>
            <span>3 min read</span>
          </Card.Metadata>
        </Card.Header>
        <Card.Content>
          This is the card content. It can contain any React components or text.
        </Card.Content>
        <Card.Actions>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Action</Button>
        </Card.Actions>
      </Card.Root>
    </div>
  ),
};

/**
 * 미디어가 포함된 Card입니다.
 * 이미지, 제목, 메타데이터, 내용, 액션을 모두 포함합니다.
 */
export const WithMedia: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Card.Root>
        <Card.Media
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop"
          alt="Mountain landscape"
          aspectRatio="16/9"
        />
        <Card.Header>
          <Card.Title as="h3">Beautiful Mountain View</Card.Title>
          <Card.Metadata>
            <span>Photography</span>
            <span>2 hours ago</span>
          </Card.Metadata>
        </Card.Header>
        <Card.Content>
          Explore the majestic mountains and discover breathtaking landscapes.
        </Card.Content>
        <Card.Actions>
          <Button variant="ghost">Share</Button>
          <Button variant="primary">View</Button>
        </Card.Actions>
      </Card.Root>
    </div>
  ),
};

/**
 * Card 변형들입니다.
 * default, elevated, outlined 스타일을 제공합니다.
 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <div style={{ width: "320px" }}>
        <Card.Root variant="default">
          <Card.Header>
            <Card.Title as="h4">Default</Card.Title>
          </Card.Header>
          <Card.Content>
            기본 스타일의 카드입니다. 가벼운 border와 배경색을 가집니다.
          </Card.Content>
        </Card.Root>
      </div>

      <div style={{ width: "320px" }}>
        <Card.Root variant="elevated">
          <Card.Header>
            <Card.Title as="h4">Elevated</Card.Title>
          </Card.Header>
          <Card.Content>
            그림자가 있는 카드입니다. 페이지에서 부각되어 보입니다.
          </Card.Content>
        </Card.Root>
      </div>

      <div style={{ width: "320px" }}>
        <Card.Root variant="outlined">
          <Card.Header>
            <Card.Title as="h4">Outlined</Card.Title>
          </Card.Header>
          <Card.Content>
            두꺼운 border만 있는 카드입니다. 투명한 배경을 가집니다.
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  ),
};

/**
 * 인터랙티브 Card입니다.
 * 클릭 가능하며 hover/focus 상태를 가집니다.
 */
export const Interactive: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Card.Root
        interactive
        onClick={() => alert('Card clicked!')}
        aria-label="View article details"
      >
        <Card.Media
          src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=450&fit=crop"
          alt="Code editor"
          aspectRatio="16/9"
        />
        <Card.Header>
          <Card.Title clamp={2}>
            Interactive Card: Click anywhere to trigger action
          </Card.Title>
          <Card.Metadata maxLines={1}>
            <span>Technology</span>
            <time>5 min ago</time>
          </Card.Metadata>
        </Card.Header>
        <Card.Content clamp={3}>
          This card is fully interactive. You can click anywhere on the card,
          use keyboard navigation (Tab + Enter/Space), and see hover effects.
        </Card.Content>
      </Card.Root>
    </div>
  ),
};

/**
 * 텍스트 말줄임이 적용된 Card입니다.
 * 긴 제목과 내용을 자동으로 잘라냅니다.
 */
export const TextClamping: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Card.Root>
        <Card.Header>
          <Card.Title clamp={2}>
            This is a Very Long Title That Will Be Automatically Clamped to Two Lines Maximum to Prevent Overflow Issues
          </Card.Title>
          <Card.Metadata maxLines={1}>
            <span>Author Name</span>
            <span>Category</span>
            <span>Published Date</span>
          </Card.Metadata>
        </Card.Header>
        <Card.Content clamp={3}>
          This is a long content paragraph that will be automatically clamped to three lines.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Card.Content>
        <Card.Actions>
          <Button variant="ghost">Read More</Button>
        </Card.Actions>
      </Card.Root>
    </div>
  ),
};

/**
 * 액션 정렬 옵션입니다.
 * start, end, center, between 정렬을 제공합니다.
 */
export const ActionAlignment: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ width: "400px" }}>
        <Card.Root>
          <Card.Header>
            <Card.Title as="h4">Actions: Start</Card.Title>
          </Card.Header>
          <Card.Content>왼쪽 정렬된 액션 버튼들입니다.</Card.Content>
          <Card.Actions align="start">
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Confirm</Button>
          </Card.Actions>
        </Card.Root>
      </div>

      <div style={{ width: "400px" }}>
        <Card.Root>
          <Card.Header>
            <Card.Title as="h4">Actions: End (Default)</Card.Title>
          </Card.Header>
          <Card.Content>오른쪽 정렬된 액션 버튼들입니다.</Card.Content>
          <Card.Actions align="end">
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Confirm</Button>
          </Card.Actions>
        </Card.Root>
      </div>

      <div style={{ width: "400px" }}>
        <Card.Root>
          <Card.Header>
            <Card.Title as="h4">Actions: Center</Card.Title>
          </Card.Header>
          <Card.Content>중앙 정렬된 액션 버튼들입니다.</Card.Content>
          <Card.Actions align="center">
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Confirm</Button>
          </Card.Actions>
        </Card.Root>
      </div>

      <div style={{ width: "400px" }}>
        <Card.Root>
          <Card.Header>
            <Card.Title as="h4">Actions: Between</Card.Title>
          </Card.Header>
          <Card.Content>양쪽 끝으로 정렬된 액션 버튼들입니다.</Card.Content>
          <Card.Actions align="between">
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Confirm</Button>
          </Card.Actions>
        </Card.Root>
      </div>
    </div>
  ),
};

/**
 * 메타데이터 구분자 옵션입니다.
 * · (middle dot), | (pipe), • (bullet) 구분자를 제공합니다.
 */
export const MetadataSeparators: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ width: "400px" }}>
        <Card.Root>
          <Card.Header>
            <Card.Title as="h4">Separator: · (Default)</Card.Title>
            <Card.Metadata separator="·">
              <span>Author</span>
              <span>5 min read</span>
              <time>2025-10-23</time>
            </Card.Metadata>
          </Card.Header>
        </Card.Root>
      </div>

      <div style={{ width: "400px" }}>
        <Card.Root>
          <Card.Header>
            <Card.Title as="h4">Separator: |</Card.Title>
            <Card.Metadata separator="|">
              <span>Author</span>
              <span>5 min read</span>
              <time>2025-10-23</time>
            </Card.Metadata>
          </Card.Header>
        </Card.Root>
      </div>

      <div style={{ width: "400px" }}>
        <Card.Root>
          <Card.Header>
            <Card.Title as="h4">Separator: •</Card.Title>
            <Card.Metadata separator="•">
              <span>Author</span>
              <span>5 min read</span>
              <time>2025-10-23</time>
            </Card.Metadata>
          </Card.Header>
        </Card.Root>
      </div>
    </div>
  ),
};

/**
 * 프로덕트 카드 예제입니다.
 * 실제 사용 시나리오를 보여줍니다.
 */
export const ProductCard: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <Card.Root variant="elevated">
        <Card.Media
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=640&h=640&fit=crop"
          alt="Premium headphones"
          aspectRatio="1/1"
          loading="lazy"
        />
        <Card.Header>
          <Card.Title as="h4">Premium Wireless Headphones</Card.Title>
          <Card.Metadata maxLines={1}>
            <span>⭐ 4.8 (328 reviews)</span>
          </Card.Metadata>
        </Card.Header>
        <Card.Content>
          <div style={{ fontSize: "24px", fontWeight: "600", marginBottom: "8px" }}>
            $299.99
          </div>
          <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
            High-quality audio with active noise cancellation
          </p>
        </Card.Content>
        <Card.Actions>
          <Button variant="primary" style={{ width: "100%" }}>
            Add to Cart
          </Button>
        </Card.Actions>
      </Card.Root>
    </div>
  ),
};

/**
 * 뉴스 기사 카드 예제입니다.
 * 메타데이터와 읽기 시간을 포함합니다.
 */
export const NewsCard: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <Card.Root variant="outlined">
        <Card.Header>
          <Card.Title as="h3" clamp={2}>
            Breaking: Major Technology Breakthrough Announced
          </Card.Title>
          <Card.Metadata separator="•" maxLines={1}>
            <span>Technology</span>
            <time>2 hours ago</time>
            <span>By Jane Doe</span>
          </Card.Metadata>
        </Card.Header>
        <Card.Content clamp={4}>
          Scientists have announced a groundbreaking discovery that could revolutionize
          the field of renewable energy. The new technology promises to increase
          solar panel efficiency by up to 40%, making clean energy more accessible
          and affordable for everyone around the world.
        </Card.Content>
        <Card.Actions align="start">
          <Button variant="ghost" size="sm">
            Read More →
          </Button>
        </Card.Actions>
      </Card.Root>
    </div>
  ),
};
