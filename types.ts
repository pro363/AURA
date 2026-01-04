// Data models for the transformation process

export enum AppState {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export enum AssetType {
  COPY = 'COPY',
  IMAGE = 'IMAGE',
  COLOR = 'COLOR',
  LAYOUT = 'LAYOUT'
}

export interface TransformationItem {
  id: string;
  type: AssetType;
  original: string;
  originalLabel: string;
  suggestion: string;
  suggestionLabel: string;
  reasoning: string;
  isApplied: boolean;
}

export interface AnalysisResult {
  url: string;
  score: number; // 0-100 "AI Score"
  detectedPatterns: string[];
  items: TransformationItem[];
}

export interface AnalysisConfig {
  url: string;
}

// Mock data used when we can't scrape client-side
export const MOCK_ANALYSIS_TEMPLATE: TransformationItem[] = [
  {
    id: '1',
    type: AssetType.COPY,
    original: "Unleash the power of synergy to elevate your workflow paradigms.",
    originalLabel: "Detected Copy",
    suggestion: "Work faster with tools that actually talk to each other.",
    suggestionLabel: "Humanized Copy",
    reasoning: "The original text uses heavy corporate jargon ('synergy', 'paradigms') often associated with generic AI writing. The suggestion is direct and conversational.",
    isApplied: true
  },
  {
    id: '2',
    type: AssetType.IMAGE,
    original: "https://picsum.photos/800/600?grayscale", // Placeholder for a generic abstract 3d blob
    originalLabel: "Detected Asset",
    suggestion: "https://picsum.photos/800/600?blur=2", // Placeholder for a real photo
    suggestionLabel: "Suggested Photography",
    reasoning: "Abstract 3D shapes in startup blue are a hallmark of template sites. Replacing them with high-grain, authentic photography adds warmth and trust.",
    isApplied: true
  },
  {
    id: '3',
    type: AssetType.COPY,
    original: "Revolutionizing the future of digital landscapes.",
    originalLabel: "Hero Header",
    suggestion: "Building the next generation of web tools.",
    suggestionLabel: "Concrete Header",
    reasoning: "Vague grandeur is a common AI hallucination. Concrete promises perform better and feel more grounded.",
    isApplied: false
  }
];