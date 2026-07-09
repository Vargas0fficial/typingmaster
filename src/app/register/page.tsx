"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { registerUser } from "@/app/actions/auth";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const result = await registerUser(username, password);
        if (!result.success) {
            setError(result.error || "May nangyaring error.");
            setIsLoading(false);
            return;
        }

        const signInResult = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (signInResult?.error) {
            setError("Your account has been created, but you can't log in. Try logging in manually.");
            setIsLoading(false);
            return;
        }

        window.location.href = "/";
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-sm space-y-6"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="flex items-center gap-3 justify-center text-2xl font-bold tracking-tight text-blue-500"
                >
                    <motion.div
                        animate={{ rotate: [0, 8, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Code2 className="w-7 h-7" />
                    </motion.div>
                    <span>TypingMaster</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="bg-[#0e1322] border border-zinc-900 rounded-xl p-6 space-y-4 shadow-2xl shadow-blue-500/5"
                >
                    <h1 className="text-lg font-bold text-zinc-100">Create Account</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-xs text-zinc-500 mb-1.5 block">Username</label>
                            <motion.input
                                whileFocus={{ scale: 1.01, borderColor: "#3b82f6" }}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                minLength={3}
                                className="w-full bg-[#0b0f19] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-blue-600 transition-colors"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-zinc-500 mb-1.5 block">Password</label>
                            <motion.input
                                whileFocus={{ scale: 1.01, borderColor: "#3b82f6" }}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full bg-[#0b0f19] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-blue-600 transition-colors"
                                placeholder="Password"
                            />
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-xs text-red-400"
                            >
                                {error}
                            </motion.p>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-sm py-2.5 rounded-lg transition-colors"
                        >
                            {isLoading ? "Creating an account..." : "Sign Up"}
                        </motion.button>
                    </form>

                    <p className="text-xs text-zinc-500 text-center">
                        May account ka na?{" "}
                        <Link href="/login" className="text-blue-400 hover:underline">
                            Log in
                        </Link>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}