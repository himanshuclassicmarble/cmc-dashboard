// ========================
// Filter Option Types
// ========================
export default interface FilterSelectProps {
  filterOptions: string[];
}

// ========================
// Color Types
// ========================
export type ColorType = {
  color: string | null;
  count: number | null;
  imgUrl: string | null;
};

export interface ColorProps {
  item: ColorType;
  className?: string;
}

// ========================
// Qualities Data Types
// ========================
export type QualitiesType = {
  color: string | null;
  qualityGroup: string | null;
  count: number | null;
  imageName: string | null;
};

export interface QualityCardProps {
  color: string;
  count: number;
  qualityGroup: string;
  className?: string;
}

// ========================
// Application Images Types
// ========================
export type ApplnImgType = {
  code: string | null;
  qual: string | null;
  appln: string | null;
  color: string | null;
  qualityGroup: string | null;
  filename: string | null;
};

export interface ApplnImgCardProps {
  code: string;
  color: string;
  qualityGroup: string;
  appln: string;
  imageName: string;
  className?: string;
}

// ========================
// Quality Search Component Types
// ========================
export interface QualitySearchProps {
  qualities: QualitiesType[];
  className?: string;
  placeholder?: string;
}
