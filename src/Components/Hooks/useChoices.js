import { useState } from 'react';

export const useChoices = () => {
    const [choice, setChoice] = useState();

    const changeChoices = e => {
        setChoice(e.target.value);
    }

    return {choice, changeChoices};
}