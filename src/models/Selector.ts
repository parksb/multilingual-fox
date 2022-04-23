export interface Selector {
  title: string;
  pronounce?: string;
  part?: string;
  description?: string[];
  example?: {
    sentence: string;
    meaning: string;
  };
}
