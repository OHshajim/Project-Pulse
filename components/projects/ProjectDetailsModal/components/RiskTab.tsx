import { TabsContent } from '@/components/ui/tabs';
import { Shield } from 'lucide-react';
import { format } from 'date-fns';
import { getUserById } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Risk } from '@/types';

const RiskTab = ({ risks, openRisks }) => {
    return (
        <TabsContent value="risks" className="p-6 space-y-4 m-0">
            {risks.length > 0 ? (
                <>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-muted-foreground">
                            {openRisks.length} Open •{" "}
                            {risks.length - openRisks.length} Resolved
                        </h3>
                    </div>
                    <div className="space-y-4">
                        {risks.map((risk) => (
                            <RiskItem key={risk.id} risk={risk} />
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center py-12">
                    <Shield className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground">
                        No risks reported for this project
                    </p>
                </div>
            )}
        </TabsContent>
    );
};

export default RiskTab;

function RiskItem({ risk }: { risk: Risk }) {
    const getSeverityConfig = (severity: string) => {
        switch (severity) {
            case "high":
                return {
                    color: "text-critical",
                    bg: "bg-critical/10",
                    border: "border-critical/30",
                };
            case "medium":
                return {
                    color: "text-warning",
                    bg: "bg-warning/10",
                    border: "border-warning/30",
                };
            case "low":
                return {
                    color: "text-muted-foreground",
                    bg: "bg-muted/50",
                    border: "border-border",
                };
            default:
                return {
                    color: "text-muted-foreground",
                    bg: "bg-muted/50",
                    border: "border-border",
                };
        }
    };
    const config = getSeverityConfig(risk.severity);
    const reporter = getUserById(risk.createdBy);

    return (
        <div
            className={cn(
                "p-4 rounded-xl border transition-all hover:shadow-soft",
                config.bg,
                config.border
            )}
        >
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                    <Shield className={cn("w-4 h-4", config.color)} />
                    <h4 className="font-medium">{risk.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                    <Badge
                        variant="outline"
                        className={cn("text-xs capitalize", config.color)}
                    >
                        {risk.severity}
                    </Badge>
                    <Badge
                        variant={risk.status === "open" ? "warning" : "success"}
                        className="text-xs capitalize"
                    >
                        {risk.status}
                    </Badge>
                </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
                {risk.description}
            </p>
            {risk.mitigationPlan && (
                <div className="p-3 rounded-lg bg-background/50 border border-border/50 mb-3">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                        Mitigation Plan
                    </p>
                    <p className="text-sm">{risk.mitigationPlan}</p>
                </div>
            )}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                    <span>Reported by</span>
                    <div className="flex items-center gap-1">
                        <div className="w-5 h-5 rounded-md bg-muted flex items-center justify-center text-[10px] font-medium">
                            {reporter?.avatar}
                        </div>
                        <span>{reporter?.name}</span>
                    </div>
                </div>
                <span>{format(new Date(risk.createdAt), "MMM d, yyyy")}</span>
            </div>
        </div>
    );
}