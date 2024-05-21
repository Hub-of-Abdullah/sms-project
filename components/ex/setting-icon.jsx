"use client"
import { GearIcon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"

export default function SettingButton() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                        <GearIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-100" />
                        <span className="sr-only">Setting</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Setting</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}


