/**
 * @intent Handle database operations for submissions.
 * @generated AI-assisted — reviewed and validated against Vendor Isolation rule.
 */
import { supabase } from './supabaseClient';
import type { Submission } from '../types';

export interface DbResult<T> {
    data: T | null;
    error: Error | null;
}

export async function createSubmission(submissionData: Omit<Submission, 'id' | 'created_at'>): Promise<DbResult<Submission>> {
    try {
        const { data, error } = await supabase
            .from('submissions')
            .insert([submissionData])
            .select()
            .single();

        if (error) {
            throw error;
        }

        return { data, error: null };
    } catch (err: unknown) {
        console.error('Database insert error:', err);
        return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
    }
}

export async function fetchSubmissions(): Promise<DbResult<Submission[]>> {
    try {
        const { data, error } = await supabase
            .from('submissions')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        return { data, error: null };
    } catch (err: unknown) {
        console.error('Database fetch error:', err);
        return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
    }
}

export async function getUniqueContributorCount(): Promise<number> {
    try {
        const { data, error } = await supabase
            .from('submissions')
            .select('contributor_name');

        if (error) throw error;
        if (!data) return 0;

        const unique = new Set(data.map((s) => s.contributor_name.toLowerCase().trim()));
        return unique.size;
    } catch (err: unknown) {
        console.error('Count fetch error:', err);
        return 0;
    }
}

export function subscribeToSubmissions(callback: () => void) {
    const channel = supabase
        .channel("contributor-count")
        .on("postgres_changes", { event: "*", schema: "public", table: "submissions" }, callback)
        .subscribe();
    return () => {
        supabase.removeChannel(channel);
    };
}

export async function getAppSetting(key: string): Promise<string | null> {
    try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );
        const { data, error } = await supabaseAdmin
            .from('app_settings')
            .select('value')
            .eq('key', key)
            .single();

        if (error) {
            // It's possible the setting just doesn't exist yet, so we don't need to log an error for everything.
            if (error.code !== 'PGRST116') {
                console.error(`Failed to get setting ${key}:`, error);
            }
            return null;
        }
        return data?.value || null;
    } catch (err) {
        console.error(`Failed to get setting ${key}:`, err);
        return null;
    }
}

export async function setAppSetting(key: string, value: string): Promise<DbResult<null>> {
    try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );
        const { error } = await supabaseAdmin
            .from('app_settings')
            .upsert({ key, value, updated_at: new Date().toISOString() });

        if (error) throw error;
        return { data: null, error: null };
    } catch (err: unknown) {
        console.error(`Failed to set setting ${key}:`, err);
        return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
    }
}
