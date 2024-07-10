'use client';
// Dashboard.js

// Dashboard.tsx

import React from 'react';
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { User } from '@prisma/client';

function Dashboard() {
    const currentUser = useCurrentUser();
    const user = currentUser as User; // Assuming User is your type or interface for user data

    const onClickSignOut = async () => {
        await signOut();
        // Optionally: Reset or clear user data in local state or context if needed
    };

    return (
        <div>
            <div>Admin Dashboard page</div>
            <div>User Email: {user?.email ?? 'Email not available'}</div>
            <div>User Role: {user?.role ?? 'Role not available'}</div>
            <div>User Id: {user?.id ?? 'Id not available'}</div>
            <button onClick={onClickSignOut}>Sign Out</button>
        </div>
    );
}

export default Dashboard;




// import { auth } from "@/auth";

// const TestPage = async () => {

//     const session = await auth();
//     return (
//         <div className="">
//             {JSON.stringify(session)}
//         </div>
//     );

// }

// export default TestPage;