import prisma from "../client.js";
import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import { Storage } from '@uptiqai/integrations-sdk';
const storage = new Storage({ provider: process.env.INFRA_PROVIDER });
export const getKBItems = catchAsync(async (c) => {
    const items = await prisma.kBItem.findMany();
    return c.json(items);
});
export const uploadKBItem = catchAsync(async (c) => {
    const formData = await c.req.formData();
    const file = formData.get('file');
    if (!file || !(file instanceof Blob)) {
        throw new ApiError(400, 'File is required');
    }
    const destinationKey = `kb/${Date.now()}_${file.name || 'document'}`;
    const uploadResult = await storage.uploadFile({
        file: file,
        destinationKey,
    });
    const kbItem = await prisma.kBItem.create({
        data: {
            name: file.name || 'document',
            type: (file.name || '').split('.').pop()?.toUpperCase() || 'UNKNOWN',
            size: `${(file.size / 1024).toFixed(1)} KB`,
            uploadedDate: new Date().toISOString().split('T')[0],
            storageKey: uploadResult.key
        }
    });
    return c.json(kbItem);
});
export const deleteKBItem = catchAsync(async (c) => {
    const id = parseInt(c.req.param('id'));
    const item = await prisma.kBItem.findUnique({ where: { id } });
    if (!item)
        throw new ApiError(404, 'Item not found');
    if (item.storageKey) {
        await storage.deleteFile({ key: item.storageKey });
    }
    await prisma.kBItem.update({
        where: { id },
        data: { isDeleted: true }
    });
    return c.json({ success: true });
});
