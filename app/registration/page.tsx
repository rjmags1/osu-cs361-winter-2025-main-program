"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";

const Registration = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validCreds, setValidCreds] = useState<boolean | null>(null);

    const handleClick = () => {
        if (
            password !== confirmPassword ||
            password.length === 0 ||
            confirmPassword.length === 0
        ) {
            setValidCreds(false);
            return;
        }

        setValidCreds(true);
        router.push("/setup?page=1");
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="rounded-lg bg-black text-white px-6 py-8">
                <h1 className={`mb-3 text-2xl`}>Sign up for ActiveLife.com</h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-white"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="text-black peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-white"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="text-black peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                required
                                minLength={8}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-white"
                            htmlFor="password"
                        >
                            Confirm password
                        </label>
                        <div className="relative">
                            <input
                                className="text-black peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="confirm-password"
                                type="password"
                                name="confirm-password"
                                placeholder="Confirm password"
                                required
                                minLength={8}
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>
                {validCreds === false && (
                    <p className="text-sm text-red-500 mt-2">
                        Passwords don&apos;t match
                    </p>
                )}
                <button
                    className="mt-8 w-full bg-emerald-500 rounded-md py-2 hover:opacity-70"
                    onClick={handleClick}
                >
                    Register
                </button>
                <Progress value={33} className="mt-6" />
            </div>
        </div>
    );
};

export default Registration;
