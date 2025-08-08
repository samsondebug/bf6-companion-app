import { detectAudio } from './audio';
import { detectVisual } from './visual';
import { detectOCR } from './ocr';

export interface DetectResult {
  score: number;
  reasons: string[];
}

export const detectHighlight = async (file: string): Promise<DetectResult> => {
  const [a, v, o] = await Promise.all([
    detectAudio(file),
    detectVisual(file),
    detectOCR(file)
  ]);
  const score = a.score * 0.3 + v.score * 0.5 + o.score * 0.2;
  const reasons = [...a.reasons, ...v.reasons, ...o.reasons];
  return { score, reasons };
};
