import { useState } from 'react'
import { Button, Card, Text, toast, Toast } from '@comneed/lyra-ui'


function App() {
  const [count, setCount] = useState(0)

  const handleToast = () => {
    toast.success('버튼을 클릭했습니다!')
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <Toast.Provider />

      <Text.h1 style={{ marginBottom: '32px' }}>
        Lyra UI Demo
      </Text.h1>

      <div style={{ display: 'grid', gap: '24px' }}>
        <Card.Root>
          <Card.Header>
            <Card.Title>버튼 컴포넌트</Card.Title>
          </Card.Header>
          <Card.Content>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button onClick={() => setCount(count + 1)}>
                카운터 증가 ({count})
              </Button>
              <Button variant="secondary" onClick={handleToast}>
                Toast 표시
              </Button>
              <Button variant="ghost" onClick={() => setCount(0)}>
                리셋
              </Button>
            </div>
          </Card.Content>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <Card.Title>텍스트 컴포넌트</Card.Title>
          </Card.Header>
          <Card.Content>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Text.h3>제목 레벨 3</Text.h3>
              <Text>
                이것은 Lyra UI 컴포넌트 라이브러리를 사용하는 데모 앱입니다.
              </Text>
              <Text variant="description">
                OpenAI Apps SDK 디자인을 따르는 React 컴포넌트들입니다.
              </Text>
            </div>
          </Card.Content>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <Card.Title>현재 카운트</Card.Title>
            <Card.Metadata>실시간 상태 관리</Card.Metadata>
          </Card.Header>
          <Card.Content>
            <Text.h2>{count}</Text.h2>
          </Card.Content>
          <Card.Actions>
            <Button size="sm" onClick={() => setCount(count + 1)}>
              +1
            </Button>
            <Button size="sm" variant="secondary" onClick={() => setCount(count - 1)}>
              -1
            </Button>
          </Card.Actions>
        </Card.Root>
      </div>
    </div>
  )
}

export default App
