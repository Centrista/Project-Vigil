interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  badge?: string;
}

const PLACEHOLDER_DATA: LeaderboardEntry[] = [
  { rank: 1, name: "ScamBuster99", score: 2850, badge: "🥇" },
  { rank: 2, name: "VigilantV", score: 2610, badge: "🥈" },
  { rank: 3, name: "SafeKid_22", score: 2400, badge: "🥉" },
  { rank: 4, name: "NetGuard", score: 2200 },
  { rank: 5, name: "PhishSlayer", score: 2100 },
  { rank: 6, name: "TruthSeeker", score: 1950 },
  { rank: 7, name: "RedFlag_Ana", score: 1800 },
  { rank: 8, name: "DigitalShield", score: 1700 },
  { rank: 9, name: "AlertUser", score: 1550 },
  { rank: 10, name: "SafeSurfer", score: 1400 },
];

export default function Leaderboard() {
  return (
    <div
      className="rounded-xl border border-white/10 overflow-hidden"
      style={{ backgroundColor: "#1a1f2e" }}
    >
      <div
        className="px-5 py-4 border-b border-white/10 flex items-center justify-between"
        style={{ backgroundColor: "#0a0e27" }}
      >
        <h3 className="font-bold text-white text-base">Top Scam Spotters</h3>
        <span className="text-xs text-white/40">Coming Soon</span>
      </div>

      <div className="divide-y divide-white/5">
        {PLACEHOLDER_DATA.map((entry) => (
          <div
            key={entry.rank}
            className="flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-colors"
          >
            <span className="w-7 text-center text-sm font-bold">
              {entry.badge ?? (
                <span className="text-white/30">#{entry.rank}</span>
              )}
            </span>
            <span className="flex-1 text-sm font-medium text-white/80">{entry.name}</span>
            <span className="text-sm font-bold tabular-nums" style={{ color: "#00d4ff" }}>
              {entry.score.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-white/10 text-center">
        <p className="text-xs text-white/30">Real scores coming after launch</p>
      </div>
    </div>
  );
}
