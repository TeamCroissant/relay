"use client";

import * as React from "react";
import {
    CaretSortIcon,
    CheckIcon,
    PlusCircledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Box } from "lucide-react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
    
export default function CompanySwitcher({ companies }: { companies: any }) {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);

    const params = useParams<{ company: string }>();

    if (!params.company) {
        return null;
    }

    const selectedCompany = companies.find(
        (company: any) => company.id === params.company
    );

    if (!selectedCompany) {
        return null;
    }

    return (
        <React.Suspense fallback={<Loading />}>
            <Dialog
                open={showNewTeamDialog}
                onOpenChange={setShowNewTeamDialog}
            >
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            aria-label="Select a compant"
                            className="w-[190px] justify-between"
                        >
                            <Box className="h-5 w-5 mr-2" />
                            {selectedCompany.label}
                            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[190px] p-0">
                        <Command>
                            <CommandList>
                                <CommandInput placeholder="Search company..." />
                                <CommandEmpty>No company found.</CommandEmpty>
                                {companies.map((company: any) => (
                                    <CommandItem
                                        key={company.id}
                                        onSelect={() => {
                                            setOpen(false);
                                            router.push(`/${company.id}`);
                                        }}
                                        className="text-sm px-3"
                                    >
                                        <Box className="h-5 w-5 mr-2" />
                                        {company.label}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                selectedCompany.id ===
                                                    company.id
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandList>
                            <CommandSeparator />
                            <CommandList>
                                <CommandGroup>
                                    <DialogTrigger asChild>
                                        <CommandItem
                                            onSelect={() => {
                                                setOpen(false);
                                                setShowNewTeamDialog(true);
                                            }}
                                        >
                                            <PlusCircledIcon className="mr-2 h-5 w-5" />
                                            Create company
                                        </CommandItem>
                                    </DialogTrigger>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create team</DialogTitle>
                        <DialogDescription>
                            Add a new team to manage products and customers.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <div className="space-y-4 py-2 pb-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Team name</Label>
                                <Input id="name" placeholder="Acme Inc." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="plan">Subscription plan</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a plan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="free">
                                            <span className="font-medium">
                                                Free
                                            </span>{" "}
                                            -{" "}
                                            <span className="text-muted-foreground">
                                                Trial for two weeks
                                            </span>
                                        </SelectItem>
                                        <SelectItem value="pro">
                                            <span className="font-medium">
                                                Pro
                                            </span>{" "}
                                            -{" "}
                                            <span className="text-muted-foreground">
                                                $9/month per user
                                            </span>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowNewTeamDialog(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Continue</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </React.Suspense>
    );
}

function Loading() {
    return (
        <Skeleton className="w-[190px] h-10" />
    );
}
