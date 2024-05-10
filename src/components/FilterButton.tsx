"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

type Props = {
  label: string;
  value: string;
  param: "price" | "category";
};

const FilterButton: FC<Props> = ({ value, label, param }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const addParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const deleteParam = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, "");

      params.delete(name);

      return params.toString();
    },
    [searchParams],
  );

  const checked = searchParams.get(param) === value || false;

  return (
    <div
      className={`my-1 flex w-full items-center gap-2 rounded-md p-2 text-primary ${
        checked ? "bg-primary/30" : "bg-accent/30"
      }`}
    >
      <Checkbox
        checked={checked}
        onClick={(e: any) => {
          if (e.currentTarget.dataset.state === "unchecked")
            router.replace(pathname + "?" + addParam(param, value), {
              scroll: false,
            });
          if (e.currentTarget.dataset.state === "checked")
            router.replace(pathname + "?" + deleteParam(param), {
              scroll: false,
            });
        }}
        id={value}
      />
      <Label
        htmlFor={value}
        className={`flex-1 cursor-pointer p-3 font-semibold`}
      >
        {label}
      </Label>
    </div>
  );
};

export default FilterButton;
