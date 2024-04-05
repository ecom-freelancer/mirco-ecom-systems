export interface ISeoInfo {
  id?: number;
  title?: string;
  shortDescription?: string;
  keywords?: Array<string>;
  image?: string;
  slug?: string;
  canonical?: string;
  noIndex?: boolean;
}
