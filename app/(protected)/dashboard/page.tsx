'use client';
import React from 'react';

import { useCurrentUser } from "@/hooks/use-current-user";
function Dashboard() {
    const user = useCurrentUser();
    return (
        <>
            <div>
                <div>Admin Dashboard page</div>
                <div>User Email: {user?.email || 'Email not available'}</div>
                <div>User Role: {user?.role || 'Role not available'}</div>
                <div>User Id: {user?.id || 'Id not available'}</div>
            </div>

        </>
    );
}

export default Dashboard;
