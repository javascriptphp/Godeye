import React, { ReactNode } from "react";
import Image from "next/image";
import circuitImage from "@/assets/images/circuit.webp";
import NavHeader from "@/components/NavHeader";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="bg-background-color relative w-full min-h-screen">
            <NavHeader />
            <div className="absolute top-[-50px] sm:top-[-75px] md:top-[-100px] left-[-100px] sm:left-[-150px] md:left-[-200px] h-auto overflow-hidden">
                <Image
                    src={circuitImage}
                    alt="Circuit decoration"
                    width={300}
                    className="object-contain opacity-90 w-[250px] sm:w-[350px] md:w-[500px]"
                />
            </div>

            <div className="fixed top-1/2 right-[-50px] sm:right-[-25px] md:right-4 transform -translate-y-1/2 h-auto">
                <Image
                    src={circuitImage}
                    alt="Circuit decoration"
                    width={700}
                    className="object-contain opacity-90 w-[300px] sm:w-[500px] md:w-[700px]"
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
                {children}
            </div>
        </div>
    );
};

export default Layout;
