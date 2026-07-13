// 코드 이론 엔진 — 루트 + 코드타입 공식으로 구성음/보이싱 계산 (항상 정확)

export const PITCH = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const ROOT_PC: Record<string, number> = {
  C: 0,
  "C#": 1,
  DB: 1,
  D: 2,
  "D#": 3,
  EB: 3,
  E: 4,
  F: 5,
  "F#": 6,
  GB: 6,
  G: 7,
  "G#": 8,
  AB: 8,
  A: 9,
  "A#": 10,
  BB: 10,
  B: 11,
};

export type Interval = { semi: number; label: string };
export type Quality = {
  id: string;
  suffix: string; // 이름에 붙는 기호
  label: string; // 설명
  intervals: Interval[];
};

const R: Interval = { semi: 0, label: "R" };

export const QUALITIES: Quality[] = [
  { id: "maj", suffix: "", label: "메이저", intervals: [R, { semi: 4, label: "3" }, { semi: 7, label: "5" }] },
  { id: "min", suffix: "m", label: "마이너", intervals: [R, { semi: 3, label: "♭3" }, { semi: 7, label: "5" }] },
  { id: "7", suffix: "7", label: "도미넌트 7", intervals: [R, { semi: 4, label: "3" }, { semi: 7, label: "5" }, { semi: 10, label: "♭7" }] },
  { id: "maj7", suffix: "maj7", label: "메이저 7", intervals: [R, { semi: 4, label: "3" }, { semi: 7, label: "5" }, { semi: 11, label: "7" }] },
  { id: "m7", suffix: "m7", label: "마이너 7", intervals: [R, { semi: 3, label: "♭3" }, { semi: 7, label: "5" }, { semi: 10, label: "♭7" }] },
  { id: "m7b5", suffix: "m7♭5", label: "하프디미니시드", intervals: [R, { semi: 3, label: "♭3" }, { semi: 6, label: "♭5" }, { semi: 10, label: "♭7" }] },
  { id: "dim", suffix: "dim", label: "디미니시드", intervals: [R, { semi: 3, label: "♭3" }, { semi: 6, label: "♭5" }] },
  { id: "dim7", suffix: "dim7", label: "디미니시드 7", intervals: [R, { semi: 3, label: "♭3" }, { semi: 6, label: "♭5" }, { semi: 9, label: "°7" }] },
  { id: "aug", suffix: "aug", label: "오그먼트", intervals: [R, { semi: 4, label: "3" }, { semi: 8, label: "♯5" }] },
  { id: "sus2", suffix: "sus2", label: "서스펜디드 2", intervals: [R, { semi: 2, label: "2" }, { semi: 7, label: "5" }] },
  { id: "sus4", suffix: "sus4", label: "서스펜디드 4", intervals: [R, { semi: 5, label: "4" }, { semi: 7, label: "5" }] },
  { id: "6", suffix: "6", label: "식스", intervals: [R, { semi: 4, label: "3" }, { semi: 7, label: "5" }, { semi: 9, label: "6" }] },
  { id: "m6", suffix: "m6", label: "마이너 식스", intervals: [R, { semi: 3, label: "♭3" }, { semi: 7, label: "5" }, { semi: 9, label: "6" }] },
  { id: "add9", suffix: "add9", label: "애드 나인", intervals: [R, { semi: 4, label: "3" }, { semi: 7, label: "5" }, { semi: 14, label: "9" }] },
  { id: "9", suffix: "9", label: "나인", intervals: [R, { semi: 4, label: "3" }, { semi: 7, label: "5" }, { semi: 10, label: "♭7" }, { semi: 14, label: "9" }] },
  { id: "m9", suffix: "m9", label: "마이너 나인", intervals: [R, { semi: 3, label: "♭3" }, { semi: 7, label: "5" }, { semi: 10, label: "♭7" }, { semi: 14, label: "9" }] },
  { id: "maj9", suffix: "maj9", label: "메이저 나인", intervals: [R, { semi: 4, label: "3" }, { semi: 7, label: "5" }, { semi: 11, label: "7" }, { semi: 14, label: "9" }] },
  { id: "7sus4", suffix: "7sus4", label: "세븐 서스4", intervals: [R, { semi: 5, label: "4" }, { semi: 7, label: "5" }, { semi: 10, label: "♭7" }] },
];

// 검색 입력 → 코드타입 별칭
const SUFFIX_ALIAS: Record<string, string> = {
  "": "maj",
  M: "maj",
  MAJ: "maj",
  m: "min",
  MIN: "min",
  "-": "min",
  "7": "7",
  DOM7: "7",
  MAJ7: "maj7",
  M7MAJ: "maj7",
  "Δ": "maj7",
  M7: "m7",
  MIN7: "m7",
  M7B5: "m7b5",
  "Ø": "m7b5",
  HALFDIM: "m7b5",
  DIM: "dim",
  O: "dim",
  "°": "dim",
  DIM7: "dim7",
  O7: "dim7",
  AUG: "aug",
  "+": "aug",
  SUS2: "sus2",
  SUS4: "sus4",
  SUS: "sus4",
  "6": "6",
  M6: "m6",
  ADD9: "add9",
  "9": "9",
  M9: "m9",
  MAJ9: "maj9",
  "7SUS4": "7sus4",
};

export const ROOTS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export function qualityById(id: string): Quality {
  return QUALITIES.find((q) => q.id === id) ?? QUALITIES[0];
}

export function chordName(rootPc: number, q: Quality): string {
  return PITCH[rootPc] + q.suffix;
}

export type ChordNote = { pc: number; name: string; label: string };

export function chordNotes(rootPc: number, q: Quality): ChordNote[] {
  return q.intervals.map((iv) => {
    const pc = (rootPc + iv.semi) % 12;
    return { pc, name: PITCH[pc], label: iv.label };
  });
}

// 스트럼용 보이싱: 낮은 루트 + 근접 화음
export function chordVoicing(rootPc: number, q: Quality): number[] {
  const rootMidi = 48 + rootPc; // C3~B3
  const voicing = [rootMidi - 12, ...q.intervals.map((iv) => rootMidi + iv.semi)];
  return voicing;
}

// 검색어 파싱: "C#m7", "Db9", "F#dim", "Gsus4", "A" 등
export function parseChord(
  input: string
): { rootPc: number; qualityId: string } | null {
  const s = input.trim().replace(/\s+/g, "");
  if (!s) return null;
  const m = s.match(/^([a-gA-G])([#♯b♭]?)(.*)$/);
  if (!m) return null;
  const letter = m[1].toUpperCase();
  let accidental = m[2];
  if (accidental === "♯") accidental = "#";
  if (accidental === "♭") accidental = "b";
  const rootKey = (letter + accidental).toUpperCase();
  const rootPc = ROOT_PC[rootKey];
  if (rootPc === undefined) return null;
  const qkey = m[3].toUpperCase();
  const qid = SUFFIX_ALIAS[qkey];
  if (qid === undefined) return null;
  return { rootPc, qualityId: qid };
}
