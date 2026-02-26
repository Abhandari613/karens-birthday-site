/**
 * @intent Handle file uploads to Supabase Storage.
 * @generated AI-assisted — reviewed and validated against Vendor Isolation rule.
 */
import { supabase } from './supabaseClient';

export interface UploadResult {
    url: string | null;
    error: Error | null;
}

export async function uploadMedia(file: File, path: string): Promise<UploadResult> {
    try {
        const { data, error } = await supabase.storage
            .from('media')
            .upload(path, file, { upsert: false });

        if (error) {
            throw error;
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
            .from('media')
            .getPublicUrl(data.path);

        return { url: publicUrlData.publicUrl, error: null };
    } catch (err: unknown) {
        console.error('Storage upload error:', err);
        return { url: null, error: err instanceof Error ? err : new Error(String(err)) };
    }
}
