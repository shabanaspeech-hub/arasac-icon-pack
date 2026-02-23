import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import type { VoiceSettings } from '@/hooks/useSpeech';

interface VoiceSettingsDialogProps {
  open: boolean;
  onClose: () => void;
  settings: VoiceSettings;
  onSettingsChange: (settings: VoiceSettings) => void;
  onTest: () => void;
}

export default function VoiceSettingsDialog({ open, onClose, settings, onSettingsChange, onTest }: VoiceSettingsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">🎙️ Voice Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Speed: <span className="text-primary">{settings.rate.toFixed(1)}</span></label>
            <Slider value={[settings.rate]} min={0.5} max={2} step={0.1} onValueChange={([v]) => onSettingsChange({ ...settings, rate: v })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Pitch: <span className="text-primary">{settings.pitch.toFixed(1)}</span></label>
            <Slider value={[settings.pitch]} min={0.5} max={2} step={0.1} onValueChange={([v]) => onSettingsChange({ ...settings, pitch: v })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Volume: <span className="text-primary">{settings.volume.toFixed(1)}</span></label>
            <Slider value={[settings.volume]} min={0} max={1} step={0.1} onValueChange={([v]) => onSettingsChange({ ...settings, volume: v })} />
          </div>
          <div className="flex gap-3">
            <button onClick={onTest} className="px-5 py-2 bg-success text-success-foreground rounded-lg font-bold hover:brightness-95 transition-all">
              🔊 Test Voice
            </button>
            <button onClick={onClose} className="px-5 py-2 bg-success text-success-foreground rounded-lg font-bold hover:brightness-95 transition-all">
              Save
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
