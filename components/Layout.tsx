import React, { ReactNode } from "react";
import Image from "next/image";
import circuitImage from "@/assets/images/circuit.jpg";
import NavHeader from "@/components/NavHeader";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="bg-background-color relative w-full min-h-screen">
            <NavHeader />
            <div className="absolute top-[-100px] left-[-200px] h-auto overflow-hidden">
                <Image
                    src={circuitImage}
                    alt="Circuit decoration"
                    width={500}
                    className="object-contain opacity-90"
                />
            </div>

            <div className="fixed top-1/2 right-4 transform -translate-y-1/2 h-auto">
                <Image
                    src={circuitImage}
                    alt="Circuit decoration"
                    width={700}
                    className="object-contain opacity-90"
                />
            </div>

            <div className="container mx-auto px-6 py-8 relative z-10">
                {children}
            </div>
        </div>
    );
};

export default Layout;
