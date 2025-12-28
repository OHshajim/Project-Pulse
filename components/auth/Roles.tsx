import { cn } from '@/lib/utils';
import { roles } from '@/data/Roles';
import { Label } from '../ui/label';

const Roles = ({
    setSelectedRole,
    selectedRole,
}: {
    setSelectedRole: (role: string) => void;
    selectedRole:string;
}) => {
    return (
        <div className="space-y-2">
            <Label>Select your role</Label>
            <div className="grid grid-cols-3 gap-2">
                {roles.map(({ role, label, icon: Icon, description }) => (
                    <button
                        key={role}
                        type="button"
                        onClick={() => setSelectedRole(role)}
                        className={cn(
                            "p-3 rounded-lg border-2 transition-all duration-200 text-left",
                            selectedRole === role
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/30"
                        )}
                    >
                        <Icon
                            className={cn(
                                "w-5 h-5 mb-2",
                                selectedRole === role
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            )}
                        />
                        <p className="font-medium text-sm">{label}</p>
                        <p className="text-[10px] text-muted-foreground">
                            {description}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Roles;