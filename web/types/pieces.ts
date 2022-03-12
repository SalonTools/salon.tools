export type AposPiece<T extends unknown> = T & {
   _id: string;
   _parentUrl: string;
   _url: string;
   createdAt: string;
   highSearchText: string;
   highSearchWords: string[];
   historicUrls: string[];
   lowSearchText: string;
   published: boolean;
   slug: string;
   tags: string[];
   title: string;
   titleSortified: string[];
   trash: boolean;
   type: string;
   updatedAt: string;
}

export interface AposHeadlessPieceResponse<T extends unknown> {
   currentPage: number;
   pages: number;
   perPage: number;
   total: number;
   results: Array<AposPiece<T>>;
}
