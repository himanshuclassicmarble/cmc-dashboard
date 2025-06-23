
export interface PerformanceMetricType {
    cy: number;
    py: number;
    goly: number;
    budget: number;
    ach: number;
  };

export type PerformanceCardTypes = {
  title: string;
  subtitle : string;
  unit: string;
  metrics : PerformanceMetricType
};
