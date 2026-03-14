'use client';

import { Mic, Monitor, X } from 'lucide-react';
import { TactileButton } from '@/components/ui/TactileButton';

interface RecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartMic: () => void;
  onStartScreen: () => void;
}

export function RecordModal({ isOpen, onClose, onStartMic, onStartScreen }: RecordModalProps) {
  if (!isOpen) return null;

  const canRecordScreen = typeof navigator !== 'undefined' && navigator.mediaDevices && 'getDisplayMedia' in navigator.mediaDevices;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-[32px] bg-surface p-6 shadow-2xl border border-border animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl">What are we capturing?</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-foreground/5">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <TactileButton
            onClick={() => {
              onStartMic();
              onClose();
            }}
            className="flex items-center gap-4 p-4 rounded-2xl bg-foreground/5 hover:bg-foreground/10 transition-colors text-left"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <p className="font-medium">Voice Note</p>
              <p className="text-sm text-foreground/70">Record your thoughts directly.</p>
            </div>
          </TactileButton>

          {canRecordScreen && (
            <TactileButton
              onClick={() => {
                onStartScreen();
                onClose();
              }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-foreground/5 hover:bg-foreground/10 transition-colors text-left"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Monitor className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium">Online Meeting</p>
                <p className="text-sm text-foreground/70">Capture audio from a Google Meet, Zoom, or browser tab.</p>
              </div>
            </TactileButton>
          )}
        </div>
      </div>
    </div>
  );
}
