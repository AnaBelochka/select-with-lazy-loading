import { SelectDataResponse } from "../../../common/types/select-types";

export const fetchSelectDataApi = async (pageNumber: number): Promise<SelectDataResponse> => {
    try {
        const result = await fetch(
            `https://frontend-test-middle.vercel.app/api/users?page=${pageNumber}&limit=50`,
            {
                method: "GET",
            }
        );

        return result.json();
    } catch (error) {
        throw new Error('Failed to fetch')
    }
};
