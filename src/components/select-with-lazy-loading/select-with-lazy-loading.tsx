import { useCallback, useState } from "react";
import { OptionType } from "./types";
import { useFetchOptions } from "./service/hooks";
import { FakeInput, FakeOptions } from "./modules";
import styles from './select-with-lazy-loading.module.scss';

export const SelectWithLazyLoading = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<OptionType | null>(null);

    const { loading, options, hasMore, setPage } = useFetchOptions();

    const handleInputClick = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, []);

    const handleOptionClick = useCallback((option: OptionType) => {
        setSelectedValue(option);
        setIsOpen(false)
    }, []);

    return (
        <div className={styles.wrapper}>
            <FakeInput isOpen={isOpen} label={selectedValue?.label} onClick={handleInputClick} />
            {isOpen && (
                <FakeOptions
                    loading={loading}
                    hasMore={hasMore}
                    currentOption={selectedValue?.value}
                    options={options}
                    handleOptionClick={handleOptionClick}
                    setPage={setPage}
                />
            )}
        </div>
    );
};
