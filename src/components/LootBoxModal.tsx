import { Gift } from 'lucide-react';

interface LootBoxModalProps {
  reward: { player: string; message: string } | null;
  onClose: () => void;
}

const LootBoxModal = ({ reward, onClose }: LootBoxModalProps) => {
  if (!reward) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-2xl p-6 w-full max-w-sm border border-border shadow-2xl text-center">
        <div className="flex justify-center mb-4">
          <div className="lootbox-shake w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-4xl shadow-lg">
            🎁
          </div>
        </div>
        <p className="text-sm text-card-foreground/60">Voor {reward.player}</p>
        <h3 className="font-display text-2xl text-card-foreground mb-2">Cadeaukaart</h3>
        <p className="text-card-foreground/80 mb-4">{reward.message}</p>
        <button
          onClick={onClose}
          className="w-full px-4 py-3 rounded-lg font-semibold bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground hover:opacity-90 transition-colors flex items-center justify-center gap-2"
        >
          <Gift className="w-4 h-4" />
          Pak je cadeau
        </button>
      </div>
    </div>
  );
};

export default LootBoxModal;
