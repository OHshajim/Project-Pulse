"use client";
import { mockUsers, mockProjects } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Plus,
    Mail,
    FolderKanban,
    Shield,
    Briefcase,
    Users,
    Pen,
    Trash,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { deleteUserData, getUserData } from "@/data/userData";
import { AddUserDialog } from "@/components/auth/AddUser";
import { User } from "@/types";
import { UpdateUserDialog } from "@/components/auth/updateUser";

export default function Team() {
    const { user } = useUser();
    const [users, setUsers]= useState<User[]>([]);

    const getRoleIcon = (role: string) => {
        switch (role) {
            case "ADMIN":
                return Shield;
            case "EMPLOYEE":
                return Briefcase;
            case "CLIENT":
                return Users;
            default:
                return Users;
        }
    };

    const getRoleBadgeVariant = (role: string) => {
        switch (role) {
            case "admin":
                return "default";
            case "employee":
                return "secondary";
            case "client":
                return "outline";
            default:
                return "muted";
        }
    };

    const getProjectCount = (userId: string, role: string) => {
        if (role === "CLIENT") {
            return mockProjects.filter((p) => p.clientId === userId).length;
        }
        if (role === "EMPLOYEE") {
            return mockProjects.filter((p) => p.employeeIds.includes(userId))
                .length;
        }
        return mockProjects.length;
    };
    const DeleteUser = async (userId: string) => {
        await deleteUserData(userId);
        loadUsers();

    }

    const employees = users.filter((u) => u.role === "EMPLOYEE");
    const clients = users.filter((u) => u.role === "CLIENT");

    const UserCard = ({ member }: { member: (typeof mockUsers)[0] }) => {
        const Icon = getRoleIcon(member.role);
        const projectCount = getProjectCount(member.id, member.role);

        return (
            <Card className="animate-fade-in hover:shadow-medium transition-all duration-200">
                <CardContent>
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center text-lg">
                            {member.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 justify-between">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold truncate">
                                        {member.name}
                                    </h3>
                                    <Badge
                                        variant={getRoleBadgeVariant(
                                            member.role
                                        )}
                                        className="capitalize text-[10px]"
                                    >
                                        <Icon className="w-3 h-3 mr-1" />
                                        {member.role}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <UpdateUserDialog
                                        trigger={
                                            <Button>
                                                <Pen />
                                            </Button>
                                        }
                                        onUserAdded={loadUsers}
                                        userData={member}
                                    />
                                    <Button
                                        onClick={() => DeleteUser(member.id)}
                                    >
                                        <Trash />
                                    </Button>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {member.email}
                            </p>
                            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                                <FolderKanban className="w-3 h-3" />
                                <span>
                                    {projectCount} project
                                    {projectCount !== 1 ? "s" : ""}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    };

    const loadUsers = async () => {
        const fetchedUsers = await getUserData(user?.id ?? "");
        console.log(fetchedUsers);
        setUsers(fetchedUsers.users);
    };

    useEffect(() => {
        loadUsers();
    }, [user?.id]);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Team Management</h1>
                    <p className="text-muted-foreground mt-1">
                        {mockUsers.length} team members across all roles
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {employees.map((member) => (
                        <UserCard key={member.id} member={member} />
                    ))}
                </div>
            </div>
            {/* Clients */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold">Clients</h2>
                    <Badge variant="muted">{clients.length}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {clients.map((member) => (
                        <UserCard key={member.id} member={member} />
                    ))}
                </div>
            </div>
        </div>
    );
}
