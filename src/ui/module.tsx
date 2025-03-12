"use client";

import { useState, useRef } from "react";
import { SkillModelShema } from "../model";
import cx from "clsx";

const ToggleIcon = ({
    isOpen,
    className,
}: {
    isOpen: boolean;
    className: string;
}) => {
    return isOpen ? (
        <svg
            className={className}
            width="18"
            height="2"
            viewBox="0 0 18 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="18"
                height="2"
                rx="1"
                fill="var(--accent-foreground)"
            />
        </svg>
    ) : (
        <svg
            className={className}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10 1V19M18.9706 10H1"
                stroke="#D9D9D9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const Module = ({
    title,
    model,
}: {
    title: string;
    model: SkillModelShema[];
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row lg:justify-between gap-[16px] lg:gap-[80px]">
            <div
                ref={headerRef}
                tabIndex={0}
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                className={cx(
                    "flex items-center md:items-start gap-[24px] md:bg-transparent md:text-primary-foreground px-[24px] py-[16px] md:pt-[30px] md:border-t-2 md:border-t-accent cursor-pointer md:cursor-auto",
                    isOpen
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary-muted",
                    "focus:ring-2 focus:ring-accent md:focus:ring-[none]"
                )}
            >
                <ToggleIcon isOpen={isOpen} className="size-[18px] md:hidden" />
                <h3 className="whitespace-nowrap font:light md:font-normal text-[18px] md:text-[32px]">
                    {title}
                </h3>
            </div>
            <ul
                className={cx(
                    `flex flex-col gap-[10px] lg:mt-[36px] transition-all duration-300 overflow-hidden md:max-h-[500px]`,
                    isOpen ? "max-h-[500px]" : "max-h-0"
                )}
            >
                {model.map((value) => (
                    <li className="text-[16px] font-light" key={value.id}>
                        {value.string}
                    </li>
                ))}
            </ul>
        </div>
    );
};
