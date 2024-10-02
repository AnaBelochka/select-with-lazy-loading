import React, { Dispatch, SetStateAction, useMemo, useRef } from 'react';
import cs from "classnames";
import { OptionType } from "../../types";
import styles from "./fake-options.module.scss";

type OptionProps = {
    label: string;
    isSelected: boolean;
    handleOptionClick: () => void;
}

const Option = ({label, isSelected, handleOptionClick }: OptionProps) => {
    return (
        <div className={cs(styles.option, {[styles.selected]: isSelected})} onClick={handleOptionClick}>
            <div className={styles.letter}>{label[0]}</div>
            {label}
        </div>
    );
}

type FakeOptionsProps = {
    loading: boolean;
    hasMore: boolean;
    options: OptionType[];
    currentOption?: number;
    handleOptionClick: (option: OptionType) => void;
    setPage: Dispatch<SetStateAction<number>>;
}

export const FakeOptions = ({currentOption, options, loading, hasMore, setPage, handleOptionClick}: FakeOptionsProps) => {
    const optionsRef = useRef<HTMLDivElement>(null);
    const memoizedOptions = useMemo(() => options, [options]);

    const handleScroll = () => {
        const selectElement = optionsRef.current;

        if (!selectElement) return;

        const isBottom =
            selectElement.scrollTop + selectElement.clientHeight >=
            selectElement.scrollHeight;

        if (isBottom && !loading && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div className={styles.fakeOptions} ref={optionsRef} onScroll={handleScroll}>
            {memoizedOptions.map((option) => (
                <Option key={option.value} label={option.label} isSelected={currentOption === option.value} handleOptionClick={() => handleOptionClick(option)}/>
            ))}
        </div>
    );
}