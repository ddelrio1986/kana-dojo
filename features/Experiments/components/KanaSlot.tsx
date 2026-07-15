'use client';
import { useState } from 'react';
import clsx from 'clsx';
import { allKana } from '../data/kanaData';

/**
 * Kana Slot - Slot machine with kana symbols!
 * Match 3 to win big!
 */
const KanaSlot = () => {
  const [reels, setReels] = useState([0, 0, 0]);
  const [spinning, setSpinning] = useState([false, false, false]);
  const [flicker, setFlicker] = useState([0, 0, 0]);
  const [coins, setCoins] = useState(100);
  const [message, setMessage] = useState('');
  const [win, setWin] = useState(false);

  const slotKana = allKana.slice(0, 8); // Use 8 different kana

  const spin = () => {
    if (spinning.some(s => s) || coins < 10) return;

    setCoins(c => c - 10);
    setMessage('');
    setWin(false);
    setSpinning([true, true, true]);
    setFlicker([
      Math.floor(Math.random() * slotKana.length),
      Math.floor(Math.random() * slotKana.length),
      Math.floor(Math.random() * slotKana.length),
    ]);

    // Determine final positions
    const finals = [
      Math.floor(Math.random() * slotKana.length),
      Math.floor(Math.random() * slotKana.length),
      Math.floor(Math.random() * slotKana.length),
    ];

    // Stop reels at different times
    [0, 1, 2].forEach(i => {
      setTimeout(
        () => {
          setReels(prev => {
            const newReels = [...prev];
            newReels[i] = finals[i];
            return newReels;
          });
          setSpinning(prev => {
            const newSpinning = [...prev];
            newSpinning[i] = false;
            return newSpinning;
          });
          setFlicker([
            Math.floor(Math.random() * slotKana.length),
            Math.floor(Math.random() * slotKana.length),
            Math.floor(Math.random() * slotKana.length),
          ]);

          // Check win on last reel
          if (i === 2) {
            setTimeout(() => {
              if (finals[0] === finals[1] && finals[1] === finals[2]) {
                setCoins(c => c + 100);
                setMessage('🎉 JACKPOT! +100 coins!');
                setWin(true);
              } else if (
                finals[0] === finals[1] ||
                finals[1] === finals[2] ||
                finals[0] === finals[2]
              ) {
                setCoins(c => c + 25);
                setMessage('✨ Nice! +25 coins!');
                setWin(true);
              } else {
                setMessage('Try again!');
              }
            }, 200);
          }
        },
        500 + i * 500,
      );
    });
  };

  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-6 p-4'>
      <h2 className='text-2xl text-(--main-color)'>🎰 Kana Slot</h2>

      {/* Coins */}
      <div className='text-xl text-(--accent-color)'>💰 Coins: {coins}</div>

      {/* Slot Machine */}
      <div className='flex gap-2 rounded-2xl border-4 border-(--border-color) bg-(--card-color) p-4'>
        {reels.map((reel, i) => (
          <div
            key={i}
            className={clsx(
              'flex h-24 w-20 items-center justify-center rounded-xl',
              'border-2 border-(--border-color) bg-(--bg-color)',
              win && 'animate-pulse border-yellow-400',
            )}
          >
            <span
              lang='ja'
              className={clsx(
                'text-5xl transition-all duration-100',
                spinning[i] && 'animate-spin-slot',
              )}
            >
              {spinning[i] ? slotKana[flicker[i]].kana : slotKana[reel].kana}
            </span>
          </div>
        ))}
      </div>

      {/* Message */}
      <p
        className={clsx(
          'h-8 text-xl transition-all',
          win ? 'text-yellow-400' : 'text-(--secondary-color)',
        )}
      >
        {message}
      </p>

      {/* Spin Button */}
      <button
        onClick={spin}
        disabled={spinning.some(s => s) || coins < 10}
        className={clsx(
          'rounded-xl px-8 py-4 text-xl text-white transition-all',
          spinning.some(s => s) || coins < 10
            ? 'cursor-not-allowed bg-gray-500'
            : 'bg-(--accent-color) hover:scale-105',
        )}
      >
        {coins < 10 ? '💸 No coins!' : '🎰 Spin! (-10)'}
      </button>

      {/* Reset */}
      {coins < 10 && (
        <button
          onClick={() => setCoins(100)}
          className='text-sm text-(--secondary-color) underline'
        >
          Get 100 free coins
        </button>
      )}

      <style jsx>{`
        @keyframes spin-slot {
          0% {
            transform: translateY(-50%);
            opacity: 0.5;
          }
          50% {
            transform: translateY(50%);
            opacity: 1;
          }
          100% {
            transform: translateY(-50%);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default KanaSlot;
