import * as React from "react";
import styles from "./card.module.css";

/**
 * Card 컴포넌트
 *
 * OpenAI Apps SDK Inline 모드 가이드라인을 준수하는 카드 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <Card.Root>
 *   <Card.Media src="/image.jpg" alt="Card image" />
 *   <Card.Header>
 *     <Card.Title as="h3">Card Title</Card.Title>
 *     <Card.Metadata separator="·">
 *       <span>Author</span>
 *       <span>3 min read</span>
 *     </Card.Metadata>
 *   </Card.Header>
 *   <Card.Content>
 *     This is the card content.
 *   </Card.Content>
 *   <Card.Actions align="end">
 *     <Button variant="ghost">Cancel</Button>
 *     <Button variant="primary">Action</Button>
 *   </Card.Actions>
 * </Card.Root>
 * ```
 */

// ============================================================================
// Card.Root
// ============================================================================

export interface CardRootProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 카드 변형 */
  variant?: 'default' | 'elevated' | 'outlined';

  /** 인터랙티브 카드 여부 (hover/focus 스타일) */
  interactive?: boolean;

  /** 자식 컴포넌트 */
  children: React.ReactNode;
}

const CardRoot = React.forwardRef<HTMLDivElement, CardRootProps>(
  (props, ref) => {
    const {
      variant = 'default',
      interactive = false,
      className,
      children,
      onClick,
      onKeyDown,
      ...rest
    } = props;

    const classNames = [
      styles.CardRoot,
      styles[`CardRoot--${variant}`],
      interactive && styles['CardRoot--interactive'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (interactive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
      }
      onKeyDown?.(e);
    };

    return (
      <div
        ref={ref}
        className={classNames}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        tabIndex={interactive ? 0 : undefined}
        role={interactive && onClick ? 'button' : undefined}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
CardRoot.displayName = "Card.Root";

// ============================================================================
// Card.Media
// ============================================================================

export interface CardMediaProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** 미디어 소스 URL */
  src: string;

  /** Alt 텍스트 (이미지) */
  alt?: string;

  /** 종횡비 (aspect ratio) */
  aspectRatio?: '16/9' | '4/3' | '1/1' | 'auto';

  /** 로딩 전략 */
  loading?: 'lazy' | 'eager';

  /** 커스텀 className */
  className?: string;
}

const CardMedia = React.forwardRef<HTMLImageElement, CardMediaProps>(
  (props, ref) => {
    const {
      aspectRatio = '16/9',
      loading = 'lazy',
      className,
      style,
      ...rest
    } = props;

    const classNames = [
      styles.CardMedia,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const aspectRatioStyle = aspectRatio !== 'auto'
      ? { aspectRatio }
      : {};

    return (
      <img
        ref={ref}
        className={classNames}
        loading={loading}
        style={{ ...aspectRatioStyle, ...style }}
        {...rest}
      />
    );
  }
);
CardMedia.displayName = "Card.Media";

// ============================================================================
// Card.Header
// ============================================================================

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 자식 컴포넌트 (Title + Metadata) */
  children: React.ReactNode;

  /** 커스텀 className */
  className?: string;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;

    const classNames = [
      styles.CardHeader,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...rest}>
        {children}
      </div>
    );
  }
);
CardHeader.displayName = "Card.Header";

// ============================================================================
// Card.Title
// ============================================================================

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** 제목 레벨 (semantic HTML) */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  /** 제목 텍스트 */
  children: React.ReactNode;

  /** 말줄임 (line clamp) */
  clamp?: number;

  /** 커스텀 className */
  className?: string;
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  (props, ref) => {
    const {
      as: Component = 'h3',
      clamp,
      className,
      style,
      children,
      ...rest
    } = props;

    const classNames = [
      styles.CardTitle,
      clamp && styles[`CardTitle--clamp-${clamp}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component
        ref={ref as any}
        className={classNames}
        style={style}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);
CardTitle.displayName = "Card.Title";

// ============================================================================
// Card.Metadata
// ============================================================================

export interface CardMetadataProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 메타데이터 항목들 */
  children: React.ReactNode;

  /** 최대 줄 수 (OpenAI 권장: 3줄) */
  maxLines?: 1 | 2 | 3;

  /** 구분자 */
  separator?: '·' | '|' | '•';

  /** 커스텀 className */
  className?: string;
}

const CardMetadata = React.forwardRef<HTMLDivElement, CardMetadataProps>(
  (props, ref) => {
    const {
      maxLines,
      separator = '·',
      className,
      children,
      ...rest
    } = props;

    const classNames = [
      styles.CardMetadata,
      maxLines && styles[`CardMetadata--max-lines-${maxLines}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // separator를 children 사이에 삽입
    const childrenArray = React.Children.toArray(children);
    const childrenWithSeparator = childrenArray.reduce<React.ReactNode[]>(
      (acc, child, index) => {
        acc.push(child);
        if (index < childrenArray.length - 1) {
          acc.push(
            <span key={`sep-${index}`} className={styles.CardMetadataSeparator}>
              {separator}
            </span>
          );
        }
        return acc;
      },
      []
    );

    return (
      <div ref={ref} className={classNames} {...rest}>
        {childrenWithSeparator}
      </div>
    );
  }
);
CardMetadata.displayName = "Card.Metadata";

// ============================================================================
// Card.Content
// ============================================================================

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 본문 내용 */
  children: React.ReactNode;

  /** 말줄임 (line clamp) */
  clamp?: number;

  /** 커스텀 className */
  className?: string;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  (props, ref) => {
    const {
      clamp,
      className,
      style,
      children,
      ...rest
    } = props;

    const classNames = [
      styles.CardContent,
      clamp && styles['CardContent--clamp'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const clampStyle = clamp ? { '--clamp': clamp } as React.CSSProperties : {};

    return (
      <div
        ref={ref}
        className={classNames}
        style={{ ...clampStyle, ...style }}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
CardContent.displayName = "Card.Content";

// ============================================================================
// Card.Actions
// ============================================================================

export interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 자식 컴포넌트 (Button 등) */
  children: React.ReactNode;

  /** 정렬 */
  align?: 'start' | 'end' | 'center' | 'between';

  /** 커스텀 className */
  className?: string;
}

const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>(
  (props, ref) => {
    const {
      align = 'end',
      className,
      children,
      ...rest
    } = props;

    const classNames = [
      styles.CardActions,
      styles[`CardActions--align-${align}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...rest}>
        {children}
      </div>
    );
  }
);
CardActions.displayName = "Card.Actions";

// ============================================================================
// Card Export
// ============================================================================

export const Card = {
  Root: CardRoot,
  Media: CardMedia,
  Header: CardHeader,
  Title: CardTitle,
  Metadata: CardMetadata,
  Content: CardContent,
  Actions: CardActions,
};
