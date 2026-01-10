"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { postProjectData } from "@/data/projectData";
import { User } from "@/types";
import { z } from "zod";
import { MultiSelect } from "../ui/multi-select";
import { toast } from "sonner";

interface AddProjectDialogProps {
    trigger: React.ReactNode;
    clients: User[];
    employees: User[];
    onProjectAdded?: () => void;
}
export const projectSchema = z.object({
    name: z.string().min(3, "Project name is required"),
    description: z.string().optional(),
    clientId: z.string().min(1, "Client is required"),
    employeeIds: z.array(z.string()).min(1, "Select at least one employee"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

export function AddProjectDialog({
    trigger,
    clients,
    employees,
    onProjectAdded,
}: AddProjectDialogProps) {
    const { user } = useUser();
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [projectName, setProjectName] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            employeeIds: [],
        },
    });
    const onSubmit = async (data: ProjectFormValues) => {
        try {
            const res = await postProjectData({
                ...data,
                createdBy: user?.id || "SYSTEM",
            });
            if (res.status === 201) {
                setProjectName(data.name);
                setSuccess(true);
                onProjectAdded?.();
                toast.success("Project created successfully");
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.error || "Something went wrong");
        }
    };

    const handleOpenChange = (val: boolean) => {
        setOpen(val);
        if (!val) {
            reset();
            // setSuccess(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild onClick={()=>setSuccess(false)}>{trigger}</DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Add New Project</DialogTitle>
                    <DialogDescription>
                        {success
                            ? `Project "${projectName}" created successfully`
                            : "Fill project details and assign team"}
                    </DialogDescription>
                </DialogHeader>

                {success ? (
                    <div className="space-y-4 py-4">
                        <div className="p-4 rounded-lg bg-success/10 border border-success/20 flex gap-2">
                            <CheckCircle className="text-success" />
                            <p className="text-success font-medium">
                                {projectName} created successfully
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSuccess(false);
                                    reset();
                                }}
                                className="flex-1"
                            >
                                Add another
                            </Button>
                            <Button
                                className="flex-1"
                                onClick={() => handleOpenChange(false)}
                            >
                                Done
                            </Button>
                        </div>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 py-4"
                    >
                        {/* Name */}
                        <div className="space-y-2">
                            <Label>Project Name</Label>
                            <Input {...register("name")} />
                            {errors.name && (
                                <p className="text-sm text-destructive">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea {...register("description")} />
                        </div>

                        {/* Client */}
                        <div className="space-y-2">
                            <Label>Client</Label>
                            <Select
                                onValueChange={(val) =>
                                    setValue("clientId", val)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select client" />
                                </SelectTrigger>
                                <SelectContent>
                                    {clients?.map((c) => (
                                        <SelectItem key={c.id} value={c.dbId}>
                                            {c.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.clientId && (
                                <p className="text-sm text-destructive">
                                    {errors.clientId.message}
                                </p>
                            )}
                        </div>

                        {/* Employees */}
                        <div className="space-y-2">
                            <Label>Assign Employees</Label>
                            <Controller
                                control={control}
                                name="employeeIds"
                                render={({ field }) => (
                                    <MultiSelect
                                        onValueChange={field.onChange}
                                        options={employees.map((e) => ({
                                            label: e.name,
                                            value: e.dbId,
                                        }))}
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Choose employees..."
                                    />
                                )}
                            />
                            {errors.employeeIds && (
                                <p className="text-sm text-destructive">
                                    {errors.employeeIds.message}
                                </p>
                            )}
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input type="date" {...register("startDate")} />
                            </div>
                            <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input type="date" {...register("endDate")} />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating..." : "Create Project"}
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
