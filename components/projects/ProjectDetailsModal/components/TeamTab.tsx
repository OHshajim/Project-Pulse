import { Badge } from '@/components/ui/badge';
import { TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { Briefcase, Mail, Users } from 'lucide-react';

const TeamTab = ({ client, employees }) => {
    return (
        <TabsContent value="team" className="p-6 space-y-6 m-0">
            <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Client
                </h3>
                {client && <TeamMemberCard user={client} role="client" />}
            </div>

            <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Team Members ({employees.length})
                </h3>
                <div className="space-y-3">
                    {employees.map((employee) => (
                        <TeamMemberCard
                            key={employee.id}
                            user={employee}
                            role="employee"
                        />
                    ))}
                </div>
            </div>
        </TabsContent>
    );
};

// Team Member Card Component
function TeamMemberCard({
    user,
    role,
}: {
    user: User;
    role: "client" | "employee";
}) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
            <div
                className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold",
                    role === "client"
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary text-secondary-foreground"
                )}
            >
                {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user.name}</p>
                <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground truncate">
                        {user.email}
                    </span>
                </div>
            </div>
            <Badge
                variant={role === "client" ? "default" : "secondary"}
                className="capitalize"
            >
                {role}
            </Badge>
        </div>
    );
}
export default TeamTab;