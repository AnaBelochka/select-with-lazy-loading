import { useState, useEffect } from "react";
import { DataType } from "../../../common/types/select-types";
import { OptionType } from "../types";
import { fetchSelectDataApi } from "./api";

export const useFetchOptions = () => {
    const [options, setOptions] = useState<OptionType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchOptions = async (page: number) => {
        setLoading(true);

        await fetchSelectDataApi(page).then((data) => {
            const newOptions = data.data.map(
                ({ id, first_name, last_name, job }: DataType) => ({
                    value: id,
                    label: `${last_name} ${first_name}${job ? `, ${job}` : ""}`,
                })
            );

            setOptions((options) => [...options, ...newOptions]);
            setHasMore(data.meta.total >= data.meta.to);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchOptions(page);
    }, [page]);

    return {
        options,
        loading,
        hasMore,
        setPage,
    };
};