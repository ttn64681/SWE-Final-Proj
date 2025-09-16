'use client';

interface TrailerEmbedProps {
  onClose?: () => void;
}

export default function TrailerEmbed({ onClose }: TrailerEmbedProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Popup Window with Blur */}
      <div className="w-4/5 h-4/5 relative backdrop-blur-xl rounded-3xl shadow-2xl p-8 z-10">
        {onClose && (
          <button
            className="absolute top-2 right-2 text-black text-xl"
            // onClick={onClose}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
