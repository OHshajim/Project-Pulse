"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Plus,
    Briefcase,
    Users,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getUserData } from "@/data/userData";
import { AddUserDialog } from "@/components/auth/AddUser";
import { User } from "@/types";
import { UserCard } from "@/components/team/UserCard";

export default function Team() {
    const { user } = useUser();
    const [users, setUsers]= useState<User[]>([]);
    const employees = users.filter((u) => u.role === "EMPLOYEE");
    const clients = users.filter((u) => u.role === "CLIENT");

    const loadUsers = async () => {
        const fetchedUsers = await getUserData(user?.id ?? "");
        setUsers(fetchedUsers?.users ?? []);
    };

    useEffect(() => {
        if (user?.id) {
            loadUsers();
        }
    }, [user?.id]);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Team Management</h1>
                    <p className="text-muted-foreground mt-1">
                        {users.length} team members across all roles
                    </p>
                </div>
                <AddUserDialog
                    trigger={
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Member
                        </Button>
                    }
                    onUserAdded={loadUsers}
                />
            </div>
            {/* Employees */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold">Employees</h2>
                    <Badge variant="muted">{employees.length}</Badge>
                </div>
                {employees.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {employees.map((member) => (
                            <UserCard
                                key={member.id}
                                member={member}
                                loadUsers={loadUsers}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">No employees found.</p>
                )}
            </div>
            {/* Clients */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold">Clients</h2>
                    <Badge variant="muted">{clients.length}</Badge>
                </div>
                {clients.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {clients.map((member) => (
                            <UserCard
                                key={member.id}
                                member={member}
                                loadUsers={loadUsers}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">No clients found.</p>
                )}
            </div>
        </div>
    );
}
