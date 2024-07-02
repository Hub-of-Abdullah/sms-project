"use client"
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { newVerificaition } from "@/actions/new-verification";
import { FormError } from "@/components/ex/form-error";
import { FormSuccess } from "@/components/ex/form-success";

export const NewVerificationForm = () => {

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onsubmit = useCallback(() => {

        if (!token) {
            setError("Missing token !");
            return;
        }
        newVerificaition(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Somthing went wrong !")
            })

    }, [token]);

    useEffect(() => {
        onsubmit();
    }, [onsubmit])

    return (
        <CardWrapper
            headerLabel="Confirming your verificaiton"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                    <BeatLoader />
                )}
                <FormSuccess message={success} />
                <FormError message={error} />
            </div>
        </CardWrapper>
    )
}

