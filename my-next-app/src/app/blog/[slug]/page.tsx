import React from "react";

export default async function Page({
    params,
    searchParams
}: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { slug } = await params;
    const { keyword } = await searchParams;
    
    return (
        <div>
            <h1>{slug}</h1>
            <h1>{keyword}</h1>
            <h1>博客页面</h1>
        </div>
    );
}
