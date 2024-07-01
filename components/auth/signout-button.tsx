"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/auth";

interface SignoutButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect",
    asChild?: boolean;
}
export const SignoutButton = ({
    children,
    mode = "redirect",
    asChild
}: SignoutButtonProps) => {
    const router = useRouter();
    const onClick = async () => {
        await signOut();
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