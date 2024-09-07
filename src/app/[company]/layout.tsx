import "../globals.css";
import Aside from "../../components/Aside";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Aside />
            <div className="flex flex-col">{children}</div>
        </div>
    );
}
