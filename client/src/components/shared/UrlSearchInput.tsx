"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

type UrlSearchInputProps = {
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
};

export default function UrlSearchInput({
  name = "searchTerm",
  placeholder = "Search...",
  defaultValue = "",
  className,
}: UrlSearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>(defaultValue);

  // Debounce
  useEffect(() => {
    const id = setTimeout(() => {
      const params = new URLSearchParams(searchParams?.toString());
      if (value) params.set(name, value);
      else params.delete(name);
      // reset to first page on new search
      params.set("page", "1");
      router.push(`?${params.toString()}`);
    }, 400);
    return () => clearTimeout(id);
  }, [value, name, router, searchParams]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return (
    <Input
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      className={className}
    />
  );
}
