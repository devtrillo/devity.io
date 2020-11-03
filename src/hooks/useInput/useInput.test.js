import useInput from './index';
import { renderHook } from '@testing-library/react-hooks';

describe('The useInput hook', function () {
  it('should start as an empty value', function () {
    const { result } = renderHook(() => useInput());
    expect(result.current.value).toBe('');
  });
  it('should update when the input changes', function () {
    const { result } = renderHook(() => useInput('Hello'));
    expect(result.current.value).toBe('Hello');
    const value = 'Hello World';
    result.current.onChange({ target: { value } });
    expect(result.current.value).toBe(value);
  });
});
