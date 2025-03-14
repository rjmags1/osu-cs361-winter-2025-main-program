/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Post } from "../home/page";

export const imageTagRegex =
    /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/;

const PostComponent = ({ p }: { p: Post }) => {
    const [images, setImages] = useState<any[]>([]);
    const taggedImageIds = p.content.match(imageTagRegex);
    useEffect(() => {
        const getImages = async () => {
            if (!taggedImageIds || images.length > 0) return;

            const fetches = taggedImageIds.map((imageId) =>
                fetch(`/api/image?id=${imageId}`)
            );
            const results = await Promise.all(fetches);
            const blobs = await Promise.all(results.map((r) => r.blob()));
            const urls = blobs.map((b) => URL.createObjectURL(b));
            const imageTags = urls.map((url) => (
                <img
                    alt={url}
                    key={url}
                    src={url}
                    style={{ height: 120, width: 120 }}
                />
            ));
            setImages(imageTags);
            return;
        };

        getImages();
    }, [taggedImageIds]);

    return (
        <div className="flex flex-col w-full py-1">
            <h3 className="font-bold text-xl">{p.title}</h3>
            <p className="text-sm">
                {p.author} -{" "}
                {`${p.createdat.getMonth()}/${p.createdat.getDate()}/${p.createdat.getFullYear()}`}
            </p>
            <p className="text-sm">{`${p.views} views`}</p>
            {...images}
            <p>{(p.content + "").replace(imageTagRegex, "")}</p>
        </div>
    );
};

export default PostComponent;
