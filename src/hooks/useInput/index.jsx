import { useState } from 'react';

const useInput = (initialValue = '') => {
  const [input, setInput] = useState(initialValue);
  return { value: input, onChange: e => setInput(e.target.value) };
};
export default useInput;
