"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ex/form-error";
import { FormSuccess } from "@/components/ex/form-success";
import { login } from "@/actions/login";

export const LoginForm = () => {
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            login(values)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                    }
                    if (data?.success) {
                        setSuccess(data.success);
                    }

                    if (data?.twoFactor) {
                        setShowTwoFactor(true);
                    }
                })
                .catch(() => setError("Something went wrong!"))
        });
    };

    return (
        <CardWrapper
            headerLabel="Welcome back"
            backButtonHref="/auth/register"
            backButtonLabel="Don't have an account ? Create account"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        {showTwoFactor && (
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Two Factor Code</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="123456"

                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            >
                            </FormField>
                        )}

                        {!showTwoFactor && (<>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="example@gmail.com"
                                                type="email"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            >
                            </FormField>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="******"
                                                type="password"
                                            />
                                        </FormControl>
                                        <Button
                                            size="sm"
                                            variant="link"
                                            asChild
                                            className="px-0 font-normal"
                                        >
                                            <Link href="/auth/reset">Forget Password</Link>
                                        </Button>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            >
                            </FormField>
                        </>)}
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" disabled={isPending} className="w-full">{showTwoFactor ? "Confirm" : "Login"}</Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
