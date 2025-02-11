"use client";

import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SetupPageProps {
    goNextPage: () => void;
    goPrevPage?: () => void;
}

const SetupPage1 = ({ goNextPage, goPrevPage }: SetupPageProps) => {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        router.push(pathname + "?page=1");
    }, []);

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="absolute top-4 right-8">
                <button
                    className="text-4xl hover:opacity-70"
                    onClick={goNextPage}
                >
                    →
                </button>
            </div>
            <div className="rounded-lg bg-black text-white px-6 py-8">
                <h1 className={`mb-3 text-2xl`}>
                    ActiveLife.com account created!
                </h1>
                <div className="w-full flex flex-col justify-start items-center">
                    <Image
                        alt="profile"
                        src="/profile.png"
                        width={100}
                        height={100}
                    />
                    <div className="w-full">
                        <label
                            className="mb-3 mt-2 block text-xs font-medium text-white"
                            htmlFor="profile-picture"
                        >
                            Profile Picture
                        </label>
                        <Input
                            className="text-black bg-white"
                            id="profile-picture"
                            type="file"
                            name="profile-picture"
                            minLength={8}
                        />
                    </div>
                    <div className="mt-4 w-full">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-white"
                            htmlFor="username"
                        >
                            Enter username:
                        </label>
                        <div className="relative">
                            <input
                                className="text-black peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="username"
                                type="text"
                                name="username"
                                placeholder="Username"
                                required
                                minLength={8}
                            />
                        </div>
                    </div>
                </div>
                <button
                    className="mt-4 w-full bg-emerald-500 rounded-md py-2 hover:opacity-70"
                    onClick={goNextPage}
                >
                    Continue
                </button>
                <Progress value={66} className="mt-6" />
            </div>
        </div>
    );
};

const SetupPage2 = ({ goNextPage, goPrevPage }: SetupPageProps) => {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        router.push(pathname + "?page=2");
    }, []);

    return (
        <div>
            Setup page 2
            <div className="absolute top-4 right-8 flex flex-row gap-8">
                <button
                    className="text-4xl hover:opacity-70"
                    onClick={goPrevPage}
                >
                    ←
                </button>
                <button
                    className="text-4xl hover:opacity-70"
                    onClick={goNextPage}
                >
                    →
                </button>
            </div>
        </div>
    );
};

const SetupPage = () => {
    const [page, setPage] = useState<1 | 2>(1);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (page !== parseInt(searchParams.get("page")!)) {
            setPage(page === 1 ? 2 : 1);
        }
    }, [searchParams]);

    return page === 1 ? (
        <SetupPage1 goNextPage={() => setPage(2)} />
    ) : (
        <SetupPage2
            goPrevPage={() => setPage(1)}
            goNextPage={() => router.push("/home")}
        />
    );
};

export default SetupPage;
