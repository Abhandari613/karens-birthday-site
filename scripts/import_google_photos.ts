import fs from "fs";
import path from "path";
import exifr from "exifr";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// We need the SERVICE RECORD KEY or a key with insert auth if RLS is on.
// For a simple script, we'll try the anon key assuming anonymous inserts are allowed (as they are for the web UI).
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const TARGET_DIR = process.argv[2];

if (!TARGET_DIR) {
    console.error("Usage: ts-node import_google_photos.ts <path_to_directory>");
    process.exit(1);
}

async function processDirectory(dirPath: string) {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isFile() && /\.(jpe?g|png|webp|heic)$/i.test(file)) {
            console.log(`Processing: ${file}...`);
            await uploadAndRecord(filePath, file);
        } else if (stat.isDirectory()) {
            await processDirectory(filePath); // Recursive for nested folders
        }
    }
}

async function uploadAndRecord(filePath: string, fileName: string) {
    try {
        const fileBuffer = fs.readFileSync(filePath);

        // 1. Extract EXIF
        let exifDate: string | null = null;
        try {
            const parsed = await exifr.parse(fileBuffer);
            if (parsed?.DateTimeOriginal) {
                exifDate = new Date(parsed.DateTimeOriginal).toISOString();
            }
        } catch (e) {
            console.log(`  No EXIF date found for ${fileName}`);
        }

        // 2. Upload to Storage
        // Sanitize filename for Supabase
        const safeName = `${Date.now()}_${fileName.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("memories")
            .upload(safeName, fileBuffer, {
                contentType: "image/jpeg", // Assuming mostly JPEG from Google Photos
                upsert: false,
            });

        if (uploadError) {
            console.error(`  Storage Error: ${uploadError.message}`);
            return;
        }

        // Get public URL
        const { data: publicData } = supabase.storage
            .from("memories")
            .getPublicUrl(uploadData.path);

        const mediaUrl = publicData.publicUrl;

        // 3. Insert into submissions
        const submissionData = {
            contributor_name: "Google Photos Import",
            message: null,
            media_url: mediaUrl,
            media_type: "photo",
            photo_year: exifDate ? new Date(exifDate).getFullYear() : null,
            exif_date: exifDate,
        };

        const { error: dbError } = await supabase
            .from("submissions")
            .insert([submissionData]);

        if (dbError) {
            console.error(`  Database Error: ${dbError.message}`);
        } else {
            console.log(`  ✅ Successfully imported ${fileName}`);
        }

    } catch (error) {
        console.error(`  Failed processing ${fileName}:`, error);
    }
}

// Start execution
console.log(`Starting import from: ${TARGET_DIR}`);
processDirectory(TARGET_DIR).then(() => {
    console.log("Import process complete.");
});
