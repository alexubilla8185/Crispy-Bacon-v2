import { openDB } from 'idb';

const DB_NAME = 'crispy_bacon_offline_audio';
const STORE_NAME = 'audio_blobs';

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME);
  },
});

export async function saveAudioLocally(id: string, blob: Blob) {
  const db = await dbPromise;
  await db.put(STORE_NAME, blob, id);
}

export async function getAudioLocally(id: string): Promise<Blob | undefined> {
  const db = await dbPromise;
  return await db.get(STORE_NAME, id);
}

export async function deleteAudioLocally(id: string) {
  const db = await dbPromise;
  await db.delete(STORE_NAME, id);
}
