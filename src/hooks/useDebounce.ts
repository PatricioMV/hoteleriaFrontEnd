import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): [T, boolean] {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const [isDoneWriting, setIsDoneWriting] = useState<boolean>(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
            setIsDoneWriting(true);
        }, delay);

        return () => {
            clearTimeout(handler);
            setIsDoneWriting(false);
        };
    }, [value, delay]);

    return [debouncedValue, isDoneWriting];
}

export default useDebounce;
