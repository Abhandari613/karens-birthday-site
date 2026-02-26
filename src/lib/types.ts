export interface Submission {
  id: string;
  contributor_name: string;
  message: string | null;
  media_url: string | null;
  media_type: 'photo' | 'video' | 'none';
  photo_year: number | null;
  exif_date: string | null;
  created_at: string;
}

export interface SubmissionFormData {
  contributor_name: string;
  message: string;
  media_type: 'photo' | 'video' | 'none';
  photo_year: number | null;
  file: File | null;
}
