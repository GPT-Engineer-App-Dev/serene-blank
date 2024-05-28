import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

Event // table: events
    id: number
    created_at: string
    name: string
    date: string
    description: string
    comments?: Comment[] // available if .select('*,comments(*)') was done

Comment // table: comments
    id: number
    created_at: string
    content: string
    event_id: number // foreign key to Event

*/

// hooks

export const useEvents = () => useQuery({
    queryKey: ['events'],
    queryFn: () => fromSupabase(supabase.from('events').select('*,comments(*)')),
});

export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEvent) => fromSupabase(supabase.from('events').insert([newEvent])),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useComments = (eventId) => useQuery({
    queryKey: ['comments', eventId],
    queryFn: () => fromSupabase(supabase.from('comments').select('*').eq('event_id', eventId)),
});

export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newComment) => fromSupabase(supabase.from('comments').insert([newComment])),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};

export const useVenues = () => useQuery({
    queryKey: ['venues'],
    queryFn: () => fromSupabase(supabase.from('venues').select('*')),
});

export const useAddVenue = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newVenue) => fromSupabase(supabase.from('venues').insert([newVenue])),
        onSuccess: () => {
            queryClient.invalidateQueries('venues');
        },
    });
};

export const useUpdateVenue = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedVenue) => fromSupabase(supabase.from('venues').update(updatedVenue).eq('id', updatedVenue.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('venues');
        },
    });
};

export const useDeleteVenue = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('venues').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('venues');
        },
    });
};