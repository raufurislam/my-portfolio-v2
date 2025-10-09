"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

type UrlPerPageSelectProps = {
  defaultLimit: number;
  options?: number[];
};

export default function UrlPerPageSelect({
  defaultLimit,
  options = [10, 20, 50],
}: UrlPerPageSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("limit", value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <Select defaultValue={String(defaultLimit)} onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue placeholder="Per page" />
      </SelectTrigger>
      <SelectContent>
        {options.map((n) => (
          <SelectItem key={n} value={String(n)}>
            {n} / page
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
