export async function parseFile(file: File): Promise<string | { content: string; isAudio: boolean }> {
  const extension = file.name.split('.').pop()?.toLowerCase();
  const isAudio = file.type.startsWith('audio/') || extension === 'mp3' || extension === 'webm';

  if (isAudio) {
    return { content: "[AUDIO FILE - AWAITING AI TRANSCRIPTION]", isAudio: true };
  }

  if (extension === 'txt' || extension === 'md') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error('Failed to read file content'));
        }
      };
      reader.onerror = () => reject(new Error('File reading error'));
      reader.readAsText(file);
    });
  }

  throw new Error(`Unsupported file type: ${extension}`);
}
