import axios from 'axios';
import { useQuery } from 'react-query';

import { AposHeadlessPieceResponse } from './pieces';
import { SortOrder } from './types';

export interface ClientPiece {
   email: string;
   firstName: string;
   lastName: string;
   mobile: string;
   notes: string;
   type: 'client';
}

export function useClients(query: string, sort: string, sortOrder: SortOrder) {
   return useQuery({
      queryKey: ['client', {query, sort, sortOrder}],
      async queryFn({queryKey, signal}) {
         const params: Record<string, string> = {};

         if (queryKey[1] && typeof queryKey[1] !== 'string') {
            params[`sort[${queryKey[1].sort}]`] = sortOrder === 'asc' ? '1' : '-1';
         }

         const res = await axios.get<AposHeadlessPieceResponse<ClientPiece>>(`/api/v1/${queryKey[0]}`, {
            signal,
            params,
         });

         return res.data;
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
   });
}
