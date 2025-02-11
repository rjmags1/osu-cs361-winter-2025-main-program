"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined
    );
    const router = useRouter();

    return (
        <form action={formAction} className="space-y-3">
            <div className="flex-1 rounded-lg bg-black text-white px-6 pb-4 pt-8">
                <h1 className={`mb-3 text-2xl`}>Please log in to continue.</h1>
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
                                minLength={6}
                            />
                        </div>
                    </div>
                </div>
                <input type="hidden" name="redirectTo" value={callbackUrl} />
                <button
                    className="mt-4 w-full bg-rose-500 rounded-md py-2 hover:opacity-70"
                    aria-disabled={isPending}
                    type="submit"
                >
                    Log in
                </button>
                <button
                    className="mt-4 w-full bg-emerald-500 rounded-md py-2 hover:opacity-70"
                    aria-disabled={isPending}
                    onClick={() => router.push("/registration")}
                >
                    Register
                </button>
                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {errorMessage && (
                        <>
                            <p className="text-sm text-red-500">
                                {errorMessage}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </form>
    );
}
