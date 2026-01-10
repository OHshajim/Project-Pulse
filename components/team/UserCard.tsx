import { Briefcase, FolderKanban, Mail, Pen, Trash, Users } from "lucide-react";
import { UpdateUserDialog } from "../auth/updateUser";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { deleteUserData } from "@/data/userData";
import { mockProjects, mockUsers } from "@/data/mockData";

export const UserCard = ({ member, loadUsers }: { member: (typeof mockUsers)[0] , loadUsers: () => void }) => {
    const getRoleIcon = (role: string) => {
        switch (role) {
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
            case "EMPLOYEE":
                return "secondary";
            case "CLIENT":
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

    const Icon = getRoleIcon(member.role);
    const projectCount = getProjectCount(member.id, member.role);


    const DeleteUser = async (userId: string) => {
        await deleteUserData(userId);
        loadUsers();
    };
    return (
        <Card className="animate-fade-in hover:shadow-medium transition-all duration-200">
            <CardContent>
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center text-lg">
                        {member.name[0].toLocaleUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 justify-between">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold truncate">
                                    {member.name}
                                </h3>
                                <Badge
                                    variant={getRoleBadgeVariant(member.role)}
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
                                <Button onClick={() => DeleteUser(member.id)}>
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
