import { create } from 'zustand';

interface AudioState {
  isRecording: boolean;
  recordingDuration: number;
  isUploading: boolean;
  uploadProgress: number;
  currentAudioUrl: string | null;
  localSaveStatus: 'idle' | 'saving' | 'saved' | 'error';
  localDraftId: string | null;
  isDeepAnalysisEnabled: boolean;
  setIsRecording: (isRecording: boolean) => void;
  setRecordingDuration: (duration: number) => void;
  setIsUploading: (isUploading: boolean) => void;
  setUploadProgress: (progress: number) => void;
  setCurrentAudioUrl: (url: string | null) => void;
  setLocalSaveStatus: (status: 'idle' | 'saving' | 'saved' | 'error') => void;
  setLocalDraftId: (id: string | null) => void;
  setIsDeepAnalysisEnabled: (enabled: boolean) => void;
  reset: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  isRecording: false,
  recordingDuration: 0,
  isUploading: false,
  uploadProgress: 0,
  currentAudioUrl: null,
  localSaveStatus: 'idle',
  localDraftId: null,
  isDeepAnalysisEnabled: false,
  setIsRecording: (isRecording) => set({ isRecording }),
  setRecordingDuration: (recordingDuration) => set({ recordingDuration }),
  setIsUploading: (isUploading) => set({ isUploading }),
  setUploadProgress: (uploadProgress) => set({ uploadProgress }),
  setCurrentAudioUrl: (currentAudioUrl) => set({ currentAudioUrl }),
  setLocalSaveStatus: (localSaveStatus) => set({ localSaveStatus }),
  setLocalDraftId: (localDraftId) => set({ localDraftId }),
  setIsDeepAnalysisEnabled: (isDeepAnalysisEnabled) => set({ isDeepAnalysisEnabled }),
  reset: () => set({
    isRecording: false,
    recordingDuration: 0,
    isUploading: false,
    uploadProgress: 0,
    currentAudioUrl: null,
    localSaveStatus: 'idle',
    localDraftId: null,
    isDeepAnalysisEnabled: false,
  }),
}));
