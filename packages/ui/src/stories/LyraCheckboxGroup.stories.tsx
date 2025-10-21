import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { CheckboxGroup } from '../checkbox-group';
import { Checkbox } from '../checkbox';
import * as React from 'react';

const meta = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: '전체 그룹 비활성화 여부',
    },
  },
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <CheckboxGroup {...args}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox value="apple" id="apple" />
          <label htmlFor="apple">사과</label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox value="banana" id="banana" />
          <label htmlFor="banana">바나나</label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox value="orange" id="orange" />
          <label htmlFor="orange">오렌지</label>
        </div>
      </div>
    </CheckboxGroup>
  ),
};

export const WithDefaultValue: Story = {
  render: (args) => (
    <CheckboxGroup {...args} defaultValue={['apple', 'orange']}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox value="apple" id="default-apple" />
          <label htmlFor="default-apple">사과</label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox value="banana" id="default-banana" />
          <label htmlFor="default-banana">바나나</label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox value="orange" id="default-orange" />
          <label htmlFor="default-orange">오렌지</label>
        </div>
      </div>
    </CheckboxGroup>
  ),
};

export const DisabledGroup: Story = {
  render: (args) => (
    <CheckboxGroup {...args} disabled>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox value="apple" id="disabled-apple" />
          <label htmlFor="disabled-apple">사과</label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox value="banana" id="disabled-banana" />
          <label htmlFor="disabled-banana">바나나</label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox value="orange" id="disabled-orange" />
          <label htmlFor="disabled-orange">오렌지</label>
        </div>
      </div>
    </CheckboxGroup>
  ),
};

export const WithTitle: Story = {
  render: (args) => (
    <div style={{ minWidth: '300px' }}>
      <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
        좋아하는 과일을 선택하세요
      </h3>
      <CheckboxGroup {...args}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Checkbox value="apple" id="title-apple" />
            <label htmlFor="title-apple">사과</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Checkbox value="banana" id="title-banana" />
            <label htmlFor="title-banana">바나나</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Checkbox value="orange" id="title-orange" />
            <label htmlFor="title-orange">오렌지</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Checkbox value="grape" id="title-grape" />
            <label htmlFor="title-grape">포도</label>
          </div>
        </div>
      </CheckboxGroup>
    </div>
  ),
};

export const InteractiveExample: Story = {
  render: () => {
    const [selectedFruits, setSelectedFruits] = React.useState<string[]>([]);

    return (
      <div style={{ minWidth: '300px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          좋아하는 과일을 선택하세요
        </h3>
        <CheckboxGroup value={selectedFruits} onValueChange={setSelectedFruits}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox value="apple" id="interactive-apple" />
              <label htmlFor="interactive-apple">사과</label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox value="banana" id="interactive-banana" />
              <label htmlFor="interactive-banana">바나나</label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox value="orange" id="interactive-orange" />
              <label htmlFor="interactive-orange">오렌지</label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox value="grape" id="interactive-grape" />
              <label htmlFor="interactive-grape">포도</label>
            </div>
          </div>
        </CheckboxGroup>

        <div style={{
          marginTop: '24px',
          padding: '12px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px'
        }}>
          <strong>선택된 과일:</strong>{' '}
          {selectedFruits.length > 0 ? selectedFruits.join(', ') : '없음'}
        </div>
      </div>
    );
  },
};

export const ParentCheckbox: Story = {
  render: () => {
    const [selectedPermissions, setSelectedPermissions] = React.useState<string[]>([]);

    const allPermissions = ['read', 'write', 'delete'];

    return (
      <div style={{ minWidth: '300px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          사용자 권한 설정
        </h3>
        <CheckboxGroup value={selectedPermissions} onValueChange={setSelectedPermissions}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Parent Checkbox */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox
                parent
                allValues={allPermissions}
                id="parent-all-permissions"
              />
              <label htmlFor="parent-all-permissions" style={{ fontWeight: 600 }}>
                모든 권한
              </label>
            </div>

            {/* Child Checkboxes */}
            <div style={{
              marginLeft: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Checkbox value="read" id="permission-read" />
                <label htmlFor="permission-read">읽기 권한</label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Checkbox value="write" id="permission-write" />
                <label htmlFor="permission-write">쓰기 권한</label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Checkbox value="delete" id="permission-delete" />
                <label htmlFor="permission-delete">삭제 권한</label>
              </div>
            </div>
          </div>
        </CheckboxGroup>

        <div style={{
          marginTop: '24px',
          padding: '12px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px'
        }}>
          <strong>선택된 권한:</strong>{' '}
          {selectedPermissions.length > 0 ? selectedPermissions.join(', ') : '없음'}
        </div>
      </div>
    );
  },
};

export const NestedParentCheckbox: Story = {
  render: () => {
    const [selectedPermissions, setSelectedPermissions] = React.useState<string[]>([]);

    const allUserPermissions = ['users-view', 'users-edit', 'users-delete'];
    const allContentPermissions = ['content-view', 'content-edit', 'content-delete'];
    const allPermissions = [...allUserPermissions, ...allContentPermissions];

    return (
      <div style={{ minWidth: '320px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          상세 권한 설정
        </h3>
        <CheckboxGroup value={selectedPermissions} onValueChange={setSelectedPermissions}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Root Parent Checkbox */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox
                parent
                allValues={allPermissions}
                id="nested-all"
              />
              <label htmlFor="nested-all" style={{ fontWeight: 700 }}>
                모든 권한
              </label>
            </div>

            {/* User Permissions Group */}
            <div style={{
              marginLeft: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Checkbox
                  parent
                  allValues={allUserPermissions}
                  id="nested-user-all"
                />
                <label htmlFor="nested-user-all" style={{ fontWeight: 600 }}>
                  사용자 관리
                </label>
              </div>

              <div style={{
                marginLeft: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Checkbox value="users-view" id="users-view" />
                  <label htmlFor="users-view">사용자 조회</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Checkbox value="users-edit" id="users-edit" />
                  <label htmlFor="users-edit">사용자 수정</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Checkbox value="users-delete" id="users-delete" />
                  <label htmlFor="users-delete">사용자 삭제</label>
                </div>
              </div>
            </div>

            {/* Content Permissions Group */}
            <div style={{
              marginLeft: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Checkbox
                  parent
                  allValues={allContentPermissions}
                  id="nested-content-all"
                />
                <label htmlFor="nested-content-all" style={{ fontWeight: 600 }}>
                  콘텐츠 관리
                </label>
              </div>

              <div style={{
                marginLeft: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Checkbox value="content-view" id="content-view" />
                  <label htmlFor="content-view">콘텐츠 조회</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Checkbox value="content-edit" id="content-edit" />
                  <label htmlFor="content-edit">콘텐츠 수정</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Checkbox value="content-delete" id="content-delete" />
                  <label htmlFor="content-delete">콘텐츠 삭제</label>
                </div>
              </div>
            </div>
          </div>
        </CheckboxGroup>

        <div style={{
          marginTop: '24px',
          padding: '12px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px'
        }}>
          <strong>선택된 권한:</strong>{' '}
          <div style={{ marginTop: '8px', fontSize: '0.875rem' }}>
            {selectedPermissions.length > 0 ? (
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {selectedPermissions.map((perm) => (
                  <li key={perm}>{perm}</li>
                ))}
              </ul>
            ) : (
              '없음'
            )}
          </div>
        </div>
      </div>
    );
  },
};
