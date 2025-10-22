import { Button } from '@lyra/ui'

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Lyra Design System</h1>
      <p>Lyra UI 컴포넌트를 사용한 앱입니다.</p>
      <div style={{ marginTop: '1rem' }}>
        <Button onClick={() => alert('클릭했습니다!')}>
          버튼 클릭
        </Button>
      </div>
    </div>
  )
}

export default App


