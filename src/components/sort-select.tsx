
"use client";

import { useQueryState } from "nuqs";

import { sortParser } from "@/features/ticket/search-params";

import { Select, SelectContent, SelectItem,SelectTrigger, SelectValue  } from "./ui/select";

type Option = { label: string; value: string };

type SortSelectProps = {
    options: Option[];
};

const SortSelect = ({ options }: SortSelectProps) => {
    const [sort, setSort] = useQueryState("sort", sortParser);

    const handleSort = (value: string) => {
        setSort(value);
    };

    return (
        <Select onValueChange={handleSort} defaultValue={sort}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => {
                    return (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
};

export { SortSelect };