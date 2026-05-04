import { db } from './db';

export interface ResourceAsset {
  fakeid: string;
  url: string;
  file: Blob;
}

/**
 * 更新 resource 缓存
 * @param resource 缓存
 */
export async function updateResourceCache(resource: ResourceAsset): Promise<boolean> {
  return db.transaction('rw', 'resource', async () => {
    await db.resource.put(resource);
    return true;
  });
}

/**
 * 获取 resource 缓存
 * @param url
 */
export async function getResourceCache(url: string): Promise<ResourceAsset | undefined> {
  return db.resource.get(url);
}

/**
 * 清理所有图片 Blob 数据，释放存储空间
 */
export async function clearResourceBlobs(): Promise<number> {
  return db.transaction('rw', 'resource', async () => {
    const count = await db.resource.count();
    await db.resource.clear();
    return count;
  });
}

/**
 * 获取图片缓存条目数量
 */
export async function getResourceCount(): Promise<number> {
  return db.resource.count();
}
