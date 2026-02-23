import { useState } from 'react';
import { englishKeyboard, hindiKeyboard } from '@/data/aacData';

interface KeyboardProps {
  language: 'english' | 'hindi';
  onAddWord: (word: string) => void;
}

export default function Keyboard({ language, onAddWord }: KeyboardProps) {
  const [buffer, setBuffer] = useState('');
  const [shiftActive, setShiftActive] = useState(false);
  const layout = language === 'english' ? englishKeyboard : hindiKeyboard;

  const typeKey = (key: string) => {
    setBuffer(prev => prev + key);
    if (shiftActive && language === 'english') setShiftActive(false);
  };

  const handleSubmit = () => {
    if (buffer.trim()) {
      onAddWord(buffer.trim());
      setBuffer('');
    }
  };

  return (
    <div className="p-4 bg-muted/50 space-y-3">
      <input
        type="text"
        value={buffer}
        onChange={e => setBuffer(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        placeholder={language === 'english' ? 'Type here...' : 'यहाँ टाइप करें...'}
        className="w-full p-3 text-lg border-[3px] border-info rounded-lg bg-card text-foreground focus:outline-none focus:border-primary"
      />
      
      <div className="space-y-1.5">
        {layout.map((row, ri) => (
          <div key={ri} className="flex gap-1.5 justify-center">
            {row.map((key, ki) => {
              if (key === 'SPACE') {
                return (
                  <button key={ki} onClick={() => typeKey(' ')} className="px-8 py-3 min-w-[150px] bg-card border-2 border-border rounded-lg font-bold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                    Space
                  </button>
                );
              }
              if (key === 'ENTER') {
                return (
                  <button key={ki} onClick={handleSubmit} className="px-6 py-3 min-w-[80px] bg-warning text-warning-foreground border-2 border-warning rounded-lg font-bold hover:brightness-95 transition-all">
                    Enter
                  </button>
                );
              }
              if (key === 'SHIFT') {
                return (
                  <button key={ki} onClick={() => setShiftActive(!shiftActive)} className={`px-4 py-3 min-w-[70px] rounded-lg font-bold border-2 transition-colors ${shiftActive ? 'bg-success text-success-foreground border-success' : 'bg-muted text-foreground border-border'}`}>
                    ⇧
                  </button>
                );
              }
              if (key === '⌫') {
                return (
                  <button key={ki} onClick={() => setBuffer(b => b.slice(0, -1))} className="px-4 py-3 min-w-[60px] bg-warning text-warning-foreground border-2 border-warning rounded-lg font-bold hover:brightness-95 transition-all">
                    ⌫
                  </button>
                );
              }
              const display = shiftActive && language === 'english' ? key : language === 'english' ? key.toLowerCase() : key;
              return (
                <button key={ki} onClick={() => typeKey(display)} className="px-3 py-3 min-w-[40px] bg-card border-2 border-border rounded-lg font-bold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors active:scale-95">
                  {display}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
