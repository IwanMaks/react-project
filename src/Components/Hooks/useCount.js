import { useState } from 'react';

export const useCount = (stratCount) => {
    const [count, setCount] = useState(stratCount || 1);

    const onChange = e => setCount(e.target.value);

    return { count, setCount, onChange };
}