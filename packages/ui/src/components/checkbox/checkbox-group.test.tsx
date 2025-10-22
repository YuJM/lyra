import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { CheckboxGroup } from './checkbox-group';
import { Checkbox } from './checkbox';

describe('CheckboxGroup', () => {
  const fruits = [
    { value: 'apple', label: '사과' },
    { value: 'banana', label: '바나나' },
    { value: 'orange', label: '오렌지' },
  ];

  const renderFruitCheckboxes = (groupProps = {}) => {
    return render(
      <CheckboxGroup {...groupProps}>
        {fruits.map((fruit) => (
          <div key={fruit.value}>
            <Checkbox value={fruit.value} id={fruit.value} />
            <label htmlFor={fruit.value}>{fruit.label}</label>
          </div>
        ))}
      </CheckboxGroup>
    );
  };

  describe('렌더링', () => {
    it('여러 체크박스를 렌더링한다', () => {
      renderFruitCheckboxes();

      fruits.forEach((fruit) => {
        expect(screen.getByLabelText(fruit.label)).toBeInTheDocument();
      });
    });

    it('기본 상태에서 모든 체크박스가 unchecked이다', () => {
      renderFruitCheckboxes();

      fruits.forEach((fruit) => {
        expect(screen.getByLabelText(fruit.label)).not.toBeChecked();
      });
    });

    it('defaultValue로 초기 선택 상태를 설정할 수 있다', () => {
      renderFruitCheckboxes({ defaultValue: ['apple', 'orange'] });

      expect(screen.getByLabelText('사과')).toBeChecked();
      expect(screen.getByLabelText('바나나')).not.toBeChecked();
      expect(screen.getByLabelText('오렌지')).toBeChecked();
    });
  });

  describe('다중 선택', () => {
    it('여러 체크박스를 선택할 수 있다', async () => {
      const user = userEvent.setup();
      renderFruitCheckboxes();

      await user.click(screen.getByLabelText('사과'));
      await user.click(screen.getByLabelText('오렌지'));

      expect(screen.getByLabelText('사과')).toBeChecked();
      expect(screen.getByLabelText('바나나')).not.toBeChecked();
      expect(screen.getByLabelText('오렌지')).toBeChecked();
    });

    it('선택된 체크박스를 다시 클릭하면 선택 해제된다', async () => {
      const user = userEvent.setup();
      renderFruitCheckboxes({ defaultValue: ['apple'] });

      expect(screen.getByLabelText('사과')).toBeChecked();

      await user.click(screen.getByLabelText('사과'));

      expect(screen.getByLabelText('사과')).not.toBeChecked();
    });
  });

  describe('onValueChange 이벤트', () => {
    it('체크박스 선택 시 값이 변경된다', async () => {
      const TestComponent = () => {
        const [selected, setSelected] = React.useState<string[]>([]);

        return (
          <>
            <CheckboxGroup value={selected} onValueChange={setSelected}>
              {fruits.map((fruit) => (
                <div key={fruit.value}>
                  <Checkbox value={fruit.value} id={fruit.value} />
                  <label htmlFor={fruit.value}>{fruit.label}</label>
                </div>
              ))}
            </CheckboxGroup>
            <div data-testid="selected-values">{selected.join(', ')}</div>
          </>
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      expect(screen.getByTestId('selected-values')).toHaveTextContent('');

      await user.click(screen.getByLabelText('사과'));

      expect(screen.getByTestId('selected-values')).toHaveTextContent('apple');
    });

    it('여러 체크박스 선택 시 모든 값이 포함된다', async () => {
      const TestComponent = () => {
        const [selected, setSelected] = React.useState<string[]>([]);

        return (
          <>
            <CheckboxGroup value={selected} onValueChange={setSelected}>
              {fruits.map((fruit) => (
                <div key={fruit.value}>
                  <Checkbox value={fruit.value} id={fruit.value} />
                  <label htmlFor={fruit.value}>{fruit.label}</label>
                </div>
              ))}
            </CheckboxGroup>
            <div data-testid="selected-values">{selected.join(', ')}</div>
          </>
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      await user.click(screen.getByLabelText('사과'));
      await user.click(screen.getByLabelText('바나나'));

      expect(screen.getByTestId('selected-values')).toHaveTextContent('apple, banana');
    });

    it('선택 해제 시 해당 값이 제거된다', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      renderFruitCheckboxes({
        defaultValue: ['apple', 'banana'],
        onValueChange: handleChange,
      });

      await user.click(screen.getByLabelText('사과'));

      expect(handleChange).toHaveBeenCalledWith(['banana'], expect.anything());
    });
  });

  describe('제어 컴포넌트', () => {
    it('value prop으로 제어할 수 있다', () => {
      const { rerender } = render(
        <CheckboxGroup value={['apple']}>
          {fruits.map((fruit) => (
            <div key={fruit.value}>
              <Checkbox value={fruit.value} id={fruit.value} />
              <label htmlFor={fruit.value}>{fruit.label}</label>
            </div>
          ))}
        </CheckboxGroup>
      );

      expect(screen.getByLabelText('사과')).toBeChecked();
      expect(screen.getByLabelText('바나나')).not.toBeChecked();

      rerender(
        <CheckboxGroup value={['banana', 'orange']}>
          {fruits.map((fruit) => (
            <div key={fruit.value}>
              <Checkbox value={fruit.value} id={fruit.value} />
              <label htmlFor={fruit.value}>{fruit.label}</label>
            </div>
          ))}
        </CheckboxGroup>
      );

      expect(screen.getByLabelText('사과')).not.toBeChecked();
      expect(screen.getByLabelText('바나나')).toBeChecked();
      expect(screen.getByLabelText('오렌지')).toBeChecked();
    });

    it('제어 모드에서 onValueChange와 함께 작동한다', async () => {
      const TestComponent = () => {
        const [selected, setSelected] = React.useState<string[]>([]);

        return (
          <CheckboxGroup value={selected} onValueChange={setSelected}>
            {fruits.map((fruit) => (
              <div key={fruit.value}>
                <Checkbox value={fruit.value} id={fruit.value} />
                <label htmlFor={fruit.value}>{fruit.label}</label>
              </div>
            ))}
          </CheckboxGroup>
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);

      await user.click(screen.getByLabelText('사과'));
      expect(screen.getByLabelText('사과')).toBeChecked();

      await user.click(screen.getByLabelText('바나나'));
      expect(screen.getByLabelText('사과')).toBeChecked();
      expect(screen.getByLabelText('바나나')).toBeChecked();
    });
  });

  describe('Parent Checkbox 기능', () => {
    // TODO: Base UI CheckboxGroup의 parent checkbox 기능 동작 확인 필요
    it.skip('parent prop이 있는 체크박스는 전체 선택/해제를 제어한다', async () => {
      const user = userEvent.setup();

      render(
        <CheckboxGroup allValues={['apple', 'banana', 'orange']}>
          <Checkbox parent id="all" aria-label="전체 선택" />
          <Checkbox value="apple" id="apple" aria-label="사과" />
          <Checkbox value="banana" id="banana" aria-label="바나나" />
          <Checkbox value="orange" id="orange" aria-label="오렌지" />
        </CheckboxGroup>
      );

      // 전체 선택 클릭
      await user.click(screen.getByRole('checkbox', { name: '전체 선택' }));

      // 모든 체크박스가 선택됨
      expect(screen.getByRole('checkbox', { name: '사과' })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: '바나나' })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: '오렌지' })).toBeChecked();

      // 전체 선택 다시 클릭
      await user.click(screen.getByRole('checkbox', { name: '전체 선택' }));

      // 모든 체크박스가 해제됨
      expect(screen.getByRole('checkbox', { name: '사과' })).not.toBeChecked();
      expect(screen.getByRole('checkbox', { name: '바나나' })).not.toBeChecked();
      expect(screen.getByRole('checkbox', { name: '오렌지' })).not.toBeChecked();
    });

    it.skip('일부 선택 시 parent 체크박스가 indeterminate 상태가 된다', async () => {
      const user = userEvent.setup();

      render(
        <CheckboxGroup allValues={['apple', 'banana', 'orange']}>
          <Checkbox parent id="all" aria-label="전체 선택" />
          <Checkbox value="apple" id="apple" aria-label="사과" />
          <Checkbox value="banana" id="banana" aria-label="바나나" />
          <Checkbox value="orange" id="orange" aria-label="오렌지" />
        </CheckboxGroup>
      );

      // 일부만 선택
      await user.click(screen.getByRole('checkbox', { name: '사과' }));

      const parentCheckbox = screen.getByRole('checkbox', { name: '전체 선택' });
      expect(parentCheckbox).toHaveAttribute('data-indeterminate', '');
    });
  });

  describe('disabled 상태', () => {
    it('그룹 전체를 disabled 할 수 있다', () => {
      renderFruitCheckboxes({ disabled: true });

      fruits.forEach((fruit) => {
        expect(screen.getByLabelText(fruit.label)).toBeDisabled();
      });
    });

    it('disabled 상태에서 선택할 수 없다', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      renderFruitCheckboxes({ disabled: true, onValueChange: handleChange });

      await user.click(screen.getByLabelText('사과'));

      expect(handleChange).not.toHaveBeenCalled();
      expect(screen.getByLabelText('사과')).not.toBeChecked();
    });
  });
});
