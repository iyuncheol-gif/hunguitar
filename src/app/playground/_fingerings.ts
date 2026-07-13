// 코드 운지 폼(fingering) — 오픈 코드는 검증값, 나머지는 이동식 바레 폼 생성
import { PITCH, qualityById } from "./_chords";

export type Fingering = {
  // 6번줄(저음 E)~1번줄(고음 e), null = 음소거(x), 0 = 개방현
  frets: (number | null)[];
  // 바레: fret 위치, from~to 줄 인덱스(0=6번줄 .. 5=1번줄)
  barre?: { fret: number; from: number; to: number };
};

// ── 오픈/대표 코드 (검증된 표준 운지) ──────────────
const OPEN: Record<string, (number | null)[]> = {
  C: [null, 3, 2, 0, 1, 0],
  G: [3, 2, 0, 0, 0, 3],
  D: [null, null, 0, 2, 3, 2],
  A: [null, 0, 2, 2, 2, 0],
  E: [0, 2, 2, 1, 0, 0],
  Am: [null, 0, 2, 2, 1, 0],
  Em: [0, 2, 2, 0, 0, 0],
  Dm: [null, null, 0, 2, 3, 1],
  C7: [null, 3, 2, 3, 1, 0],
  A7: [null, 0, 2, 0, 2, 0],
  G7: [3, 2, 0, 0, 0, 1],
  E7: [0, 2, 0, 1, 0, 0],
  D7: [null, null, 0, 2, 1, 2],
  B7: [null, 2, 1, 2, 0, 2],
  Cmaj7: [null, 3, 2, 0, 0, 0],
  Amaj7: [null, 0, 2, 1, 2, 0],
  Gmaj7: [3, 2, 0, 0, 0, 2],
  Emaj7: [0, 2, 1, 1, 0, 0],
  Dmaj7: [null, null, 0, 2, 2, 2],
  Fmaj7: [null, null, 3, 2, 1, 0],
  Am7: [null, 0, 2, 0, 1, 0],
  Em7: [0, 2, 0, 0, 0, 0],
  Dm7: [null, null, 0, 2, 1, 1],
  Dsus4: [null, null, 0, 2, 3, 3],
  Dsus2: [null, null, 0, 2, 3, 0],
  Asus4: [null, 0, 2, 2, 3, 0],
  Asus2: [null, 0, 2, 2, 0, 0],
  Esus4: [0, 2, 2, 2, 0, 0],
  Gsus4: [3, 3, 0, 0, 1, 3],
  Csus4: [null, 3, 3, 0, 1, 1],
  Cadd9: [null, 3, 2, 0, 3, 0],
};

// ── 이동식 바레 폼 (루트 프렛 기준 상대값) ──────────
// E폼: 루트가 6번줄, A폼: 루트가 5번줄(6번 음소거)
const MOVABLE: Record<
  string,
  { E: (number | null)[]; A: (number | null)[] }
> = {
  maj: { E: [0, 2, 2, 1, 0, 0], A: [null, 0, 2, 2, 2, 0] },
  min: { E: [0, 2, 2, 0, 0, 0], A: [null, 0, 2, 2, 1, 0] },
  "7": { E: [0, 2, 0, 1, 0, 0], A: [null, 0, 2, 0, 2, 0] },
  m7: { E: [0, 2, 0, 0, 0, 0], A: [null, 0, 2, 0, 1, 0] },
  maj7: { E: [0, 2, 1, 1, 0, 0], A: [null, 0, 2, 1, 2, 0] },
};

export function getFingering(
  rootPc: number,
  qualityId: string
): Fingering | null {
  const name = PITCH[rootPc] + qualityById(qualityId).suffix;
  if (OPEN[name]) return { frets: OPEN[name] };

  const shapes = MOVABLE[qualityId];
  if (!shapes) return null;

  const fretE = ((rootPc - 4) % 12 + 12) % 12; // 6번줄 개방 = E(pc4)
  const fretA = ((rootPc - 9) % 12 + 12) % 12; // 5번줄 개방 = A(pc9)

  const cands: { fret: number; rel: (number | null)[]; from: number }[] = [];
  if (fretE >= 1 && fretE <= 11)
    cands.push({ fret: fretE, rel: shapes.E, from: 0 });
  if (fretA >= 1 && fretA <= 11)
    cands.push({ fret: fretA, rel: shapes.A, from: 1 });
  if (!cands.length) return null;

  cands.sort((a, b) => a.fret - b.fret);
  const c = cands[0];
  const frets = c.rel.map((x) => (x === null ? null : c.fret + x));
  return { frets, barre: { fret: c.fret, from: c.from, to: 5 } };
}
