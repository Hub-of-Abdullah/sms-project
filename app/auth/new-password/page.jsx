"use client";
import { NewPasswordForm } from "@/components/auth/new-password-form";
import { Suspense } from 'react'
const NewPasswordPage = () => {
    return (
        <Suspense>
            <NewPasswordForm />
        </Suspense>
    )
}
export default NewPasswordPage;



// catch (e) {
//     if (e instanceof AuthError) throw e; const error = new CallbackRouteError(e, { provider: provider.id }); logger.debug("callback route error details", { method, query, body }); throw error;
// }