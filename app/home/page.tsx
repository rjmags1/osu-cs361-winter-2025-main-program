"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Post {
    id: string;
    title: string;
    author: string;
    createdAt: Date;
    favorited: boolean;
    content: string;
    imageLinks: string[];
    views: number;
}

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedTab, setSelectedTab] = useState("Posts");
    const tabs = ["Posts", "Recommended", "Weather"];

    const [selectedFilter, setSelectedFilter] = useState("Most Recent");
    const filters = ["Most Recent", "Most Popular", "Favorited", "Images"];

    useEffect(() => {
        const doFetch = async () => {
            const res = await fetch("/api/posts");
            const fetchedPosts: any[] = await res.json();
            const parsed = fetchedPosts.map((p) => ({
                ...p,
                createdAt: new Date(p.createdat),
            }));
            setPosts(parsed);
        };
        doFetch();
    }, []);

    const orderedPosts = posts.sort((p1, p2) => {
        if (selectedFilter === "Most Recent") {
            return p2.createdAt.getTime() - p1.createdAt.getTime();
        } else if (selectedFilter === "Most Popular") {
            return p2.views - p1.views;
        } else {
            return 0;
        }
    });

    const renderedPosts = orderedPosts.filter((p) => {
        if (selectedFilter === "Favorited") {
            return p.favorited;
        } else if (selectedFilter === "Images") {
            return p.imageLinks.length > 0;
        } else {
            return true;
        }
    });

    console.log(renderedPosts);

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="flex gap-3 absolute top-3 right-6">
                <Image
                    className="hover:cursor-pointer hover:opacity-70"
                    src="/settings.png"
                    alt="settings"
                    width={56}
                    height={56}
                />
                <Image
                    src="/profile.png"
                    alt="profile-picture"
                    width={56}
                    height={56}
                />
            </div>
            {selectedTab === "Posts" && (
                <div className="flex py-4 w-5/6 justify-start gap-4 flex-row">
                    {filters.map((f) => (
                        <button
                            onClick={() => setSelectedFilter(f)}
                            key={f}
                            className="bg-emerald-600 rounded px-2 hover:opacity-70"
                            style={{
                                backgroundColor:
                                    f === selectedFilter ? "#ffcccb" : "",
                                color: selectedFilter === f ? "black" : "",
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            )}
            <div className="flex flex-col py-4 w-5/6 justify-between max-h-[80%] h-fit">
                <div className="flex w-full">
                    {tabs.map((t) => (
                        <button
                            onClick={() => setSelectedTab(t)}
                            className="px-2 py-1 rounded-t border-white border"
                            key={t}
                            style={{
                                backgroundColor:
                                    selectedTab === t ? "gray" : "inherit",
                            }}
                        >
                            {t}
                        </button>
                    ))}
                </div>
                <div className="flex w-full flex-col p-3 border border-white rounded overflow-y-auto">
                    {renderedPosts.map((p, i) => (
                        <div
                            key={`${p.title}-${i}`}
                            className="flex flex-col w-full py-1"
                        >
                            <h3 className="font-bold text-xl">{p.title}</h3>
                            <p className="text-sm">
                                {p.author} -{" "}
                                {`${p.createdAt.getMonth()}/${p.createdAt.getDate()}/${p.createdAt.getFullYear()}`}
                            </p>
                            <p className="text-sm">{`${p.views} views`}</p>
                            <p>{p.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
