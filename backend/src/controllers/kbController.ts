import prisma from '../client.ts';
import catchAsync from '../utils/catchAsync.ts';
import ApiError from '../utils/ApiError.ts';
import { Storage, InfraProvider } from '@uptiqai/integrations-sdk';

const storage = new Storage({ provider: process.env.INFRA_PROVIDER as InfraProvider });

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

  const destinationKey = `kb/${Date.now()}_${(file as any).name || 'document'}`;
  
  const uploadResult = await storage.uploadFile({
    file: file as Blob,
    destinationKey,
  });

  const kbItem = await prisma.kBItem.create({
    data: {
      name: (file as any).name || 'document',
      type: ((file as any).name || '').split('.').pop()?.toUpperCase() || 'UNKNOWN',
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
  
  if (!item) throw new ApiError(404, 'Item not found');

  if (item.storageKey) {
    await storage.deleteFile({ key: item.storageKey });
  }

  await prisma.kBItem.update({
    where: { id },
    data: { isDeleted: true }
  });

  return c.json({ success: true });
});
