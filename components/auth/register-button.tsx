"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface RegisterButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect",
    asChild?: boolean;
}
export const RegisterButton = ({
    children,
    mode = "redirect",
    asChild
}: RegisterButtonProps) => {
    const router = useRouter();
    const onClick = () => {
        router.push("/auth/login");
    }
    if (mode === 'modal') {
        return (
            <span>TODO: Implement modal</span>
        )
    }
    return (
        <span onClick={onClick} className="cursor-pointer">{children}</span>
    )
}