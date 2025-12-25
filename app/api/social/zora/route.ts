/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prisma";
import { BlobServiceClient } from "@azure/storage-blob";
import { createWalletClient, createPublicClient, http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";

// Helper to upload to Azure Blob (internal CDN)
async function uploadToCDN(buffer: Buffer, filename: string, mimeType: string): Promise<string> {
    const conn = process.env.BLOB_STORAGE_CONNECTION_STRING;
    const container = process.env.BLOB_STORAGE_CONTAINER;
    if (!conn || !container) {
        throw new Error("Azure Blob not configured");
    }

    const serviceClient = BlobServiceClient.fromConnectionString(conn);
    const containerClient = serviceClient.getContainerClient(container);

    const key = `zora/${Date.now()}_${filename}`;
    const blobClient = containerClient.getBlockBlobClient(key);

    await blobClient.uploadData(buffer, {
        blobHTTPHeaders: { blobContentType: mimeType },
    });

    return blobClient.url;
}

export async function POST(req: NextRequest) {
    // @ts-ignore - next-auth version type mismatch  
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    try {
        const { title, description, image } = await req.json();

        // 1. Get Zora Keys
        const settings = await prismadb.socialSettings.findFirst() as any;
        const zoraPrivateKey = settings?.zoraPrivateKey;

        if (!zoraPrivateKey) {
            return new NextResponse("Missing Zora private key", { status: 400 });
        }

        // 2. Upload Image to CDN
        let imageBuffer: Buffer;
        if (image.startsWith("data:")) {
            // Base64 data URL
            const base64Data = image.split(",")[1];
            imageBuffer = Buffer.from(base64Data, "base64");
        } else {
            // Remote URL - fetch it
            const res = await fetch(image);
            const arrayBuffer = await res.arrayBuffer();
            imageBuffer = Buffer.from(arrayBuffer);
        }

        const imageUrl = await uploadToCDN(imageBuffer, "image.png", "image/png");

        // 3. Create Metadata JSON and upload to CDN
        const metadata = {
            name: title || "Cast Mint",
            description: description || "Minted via CMS",
            image: imageUrl,
            content: { mime: "image/png", uri: imageUrl }
        };

        const metadataBuffer = Buffer.from(JSON.stringify(metadata), "utf-8");
        const metadataUrl = await uploadToCDN(metadataBuffer, "metadata.json", "application/json");

        // 4. Initialize Zora
        const account = privateKeyToAccount(zoraPrivateKey as `0x${string}`);

        const walletClient = createWalletClient({
            account,
            chain: base,
            transport: http()
        });

        const viemPublicClient = createPublicClient({
            chain: base,
            transport: http()
        });

        // Dynamic import for Zora SDK (may not be installed in all envs)
        const { create1155 } = await import("@zoralabs/protocol-sdk");

        // 5. Create 1155 Contract & Token (On-chain)
        const result: any = await create1155({
            contract: {
                name: title || "Cast Collection",
                uri: metadataUrl,
            },
            token: {
                tokenURI: metadataUrl,
                maxSupply: BigInt("18446744073709551615"),
                pricePerToken: parseEther("0.000777"),
                mintStart: BigInt(Math.floor(Date.now() / 1000)),
                royaltyBPS: 500,
                payoutRecipient: account.address,
            },
            account: account.address,
            publicClient: viemPublicClient
        } as any);

        const { request, contractAddress } = result;

        // 6. Execute Transaction
        const hash = await walletClient.writeContract(request);

        const zoraUrl = `https://zora.co/collect/base:${contractAddress}/1`;

        return NextResponse.json({ url: zoraUrl, collectionAddress: contractAddress, txHash: hash });

    } catch (error: any) {
        console.error("Zora Error:", error);
        return new NextResponse(error.message || "Failed to create mint", { status: 500 });
    }
}
