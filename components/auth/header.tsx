import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["300"],
});

interface HeaderProps {
    label: string;
}

export const Header = ({
    label,
    // imageUrl,
    // imageAlt,
}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            {/* <img src={imageUrl} alt={imageAlt} className="w-32 h-32 object-cover" /> */}
            <h1 className={cn("text-2xl", font.className)}>Knowledge Center</h1>
            <hr className="w-full border-t-1 border-gray-300" />
            <p className="text-muted-foreground text-sm">{label}</p>
        </div>
    )
}