export type VCMSStatus = 'Validated' | 'Ambiguous' | 'Failed';

// Person
export interface VCMSContactData {
    first_name: string;
    last_name?: string;
    title?: string;
    email?: string;
    emails?: string[];
    phone_primary?: string;
    phones?: { label: string; number: string }[];
}

// Entity
export interface VCMSCompanyData {
    company_name: string;
    website_domain?: string;
    primary_industry_category?: string;
    industry_synonyms_used?: string; // Changed to string to match AI schema
    full_address?: string;
    social_linkedin?: string;
}

export interface VCMSValidationResult {
    status: VCMSStatus;
    validation_notes: string;
    contact: VCMSContactData;
    company: VCMSCompanyData;
    raw_ocr_data?: any;
}

export interface VCMSScoreComponents {
    quality_score: number; // 0-50
    reliability_score: number; // 0-35
    compliance_score: number; // 0-15
    penalty_multiplier: number; // 0.5 or 1.0
    final_score: number;
}
