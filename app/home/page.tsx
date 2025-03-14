/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PostComponent from "../ui/post";

export interface Post {
    id: string;
    title: string;
    author: string;
    createdat: Date;
    favorited: boolean;
    content: string;
    views: number;
}

const imageTagRegex =
    /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;

const Home = () => {
    const [location, setLocation] = useState<number[]>([]);
    const [selectedTab, setSelectedTab] = useState("Posts");
    const tabs = ["Posts", "Recommended", "Weather"];

    const [posts, setPosts] = useState<Post[]>([]);
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [weatherInfo, setWeatherInfo] = useState();

    const [selectedFilter, setSelectedFilter] = useState("Most Recent");
    const filters = ["Most Recent", "Most Popular", "Favorited", "Images"];

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            setLocation([position.coords.latitude, position.coords.longitude]);
        });
    }, []);

    useEffect(() => {
        if (selectedTab !== "Posts") return;

        if (selectedFilter === "Most Recent") {
            setPosts(
                allPosts.sort(
                    (p1, p2) => p1.createdat.getTime() - p2.createdat.getTime()
                )
            );
        } else if (selectedFilter === "Most Popular") {
            setPosts(allPosts.sort((p1, p2) => p2.views - p1.views));
        } else if (selectedFilter === "Favorited") {
            setPosts(allPosts.filter((p) => p.favorited));
        } else {
            setPosts(allPosts.filter((p) => imageTagRegex.test(p.content)));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFilter]);

    useEffect(() => {
        const doFetch = async () => {
            if (selectedTab === "Posts") {
                const res = await fetch("/api/posts");
                const fetchedPosts: any[] = (await res.json()).data.slice(
                    0,
                    100
                );
                setPosts(
                    fetchedPosts.map((p) => ({
                        ...p,
                        createdat: new Date(p.createdat),
                    }))
                );
                if (allPosts.length === 0) {
                    setAllPosts(
                        fetchedPosts.map((p) => ({
                            ...p,
                            createdat: new Date(p.createdat),
                        }))
                    );
                }
            } else if (selectedTab === "Recommended") {
                if (location.length === 0) {
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            setLocation([
                                position.coords.latitude,
                                position.coords.longitude,
                            ]);
                            const res = await fetch(
                                `/api/recommended?lat=${position.coords.latitude}&long=${position.coords.longitude}`
                            );
                            const json = await res.json();
                            const fetchedPosts: any[] = json.data.slice(0, 100);
                            setPosts(
                                fetchedPosts.map((p) => ({
                                    ...p,
                                    createdat: new Date(p.createdat),
                                }))
                            );
                        }
                    );
                } else {
                    const res = await fetch(
                        `/api/recommended?lat=${location[0]}&long=${location[1]}`
                    );
                    const json = await res.json();
                    const fetchedPosts: any[] = json.data.slice(0, 100);
                    setPosts(
                        fetchedPosts.map((p) => ({
                            ...p,
                            createdat: new Date(p.createdat),
                        }))
                    );
                }
            } else {
                const res = await fetch(
                    `/api/weather?lat=${location[0]}&long=${location[1]}`
                );
                const weatherInfo = await res.json();
                setWeatherInfo(weatherInfo.data);
            }
        };
        doFetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTab]);

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
                    {(selectedTab === "Posts" ||
                        selectedTab === "Recommended") &&
                        posts.map((p, i) => <PostComponent key={i} p={p} />)}
                    {selectedTab === "Weather" && weatherInfo && (
                        <p>{`It's ${
                            (weatherInfo as any).temperature.value
                        } F in your area. Wind speed is ${
                            (weatherInfo as any).wind_speed.value
                        } MPH`}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
