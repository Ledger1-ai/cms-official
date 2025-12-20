import { extractVendorFromImage } from "./ai-extraction";
import { enrichVendorProfile } from "./enricher";
import { calculateVCMSScore } from "./scoring";
import { prismadb } from "@/lib/prisma";
import { VCMSContactData, VCMSStatus } from "./types";

export async function processVendorMedia(mediaId: string, userId: string) {
    try {
        // 1. Fetch Media
        const media = await prismadb.mediaItem.findUnique({ where: { id: mediaId } });
        if (!media || !media.url) throw new Error("Media not found");

        // Check if duplicate or already processed? (Skip for now to allow re-processing)

        // 2. AI Extraction (Step 1-3 Replacement)
        console.log(`[VCMS] Extracting from ${media.url}...`);
        const extraction = await extractVendorFromImage(media.url);

        // 3. Enrichment (Step 4)
        // 3. Enrichment (Step 4)
        const { contact: enrichedContact, company: enrichedCompany } = await enrichVendorProfile(extraction.contact, extraction.company);

        // 4. Scoring (Step 5)
        // Initial scores are low/zero until we get real data.
        const score = calculateVCMSScore(
            { starRating: 0, reviewCount: 0 }, // Quality
            { internalRating: 0, totalJobs: 0 }, // Reliability
            { hasCOI: false, hasContract: false, isDoNotUse: false, licenseExpired: false } // Compliance
        );

        // 5. Database Save (Step 6) - DIRECT TO VENDOR PROFILE (No crm_Contacts)
        const vendorProfile = await prismadb.vendorProfile.create({
            data: {
                // Contact Info
                name: enrichedContact.first_name + (enrichedContact.last_name ? ` ${enrichedContact.last_name}` : ""),
                email: enrichedContact.email,
                phone: enrichedContact.phone_primary,
                website: enrichedCompany.website_domain,
                title: enrichedContact.title,

                // VCMS Scores
                vcms_score: score.final_score,
                primary_industry: enrichedCompany.primary_industry_category,
                industry_synonyms: enrichedCompany.industry_synonyms_used ? [enrichedCompany.industry_synonyms_used] : [],

                // Validation
                validation_status: extraction.status === 'Validated' ? 'VALIDATED' : 'AMBIGUOUS',
                validation_notes: extraction.validation_notes,
                raw_ocr_data: extraction.raw_ocr_data || {},
                is_do_not_use: false,

                // Store expanded contact info in custom_fields
                custom_fields: {
                    all_phones: extraction.contact.phones || [],
                    all_emails: extraction.contact.emails || [],
                    full_address: extraction.company.full_address
                } as any, // Cast to any to satisfy Prisma JSON type
            }
        });

        // Update Media Logic (tag it as a business card and link to vendor)
        await prismadb.mediaItem.update({
            where: { id: mediaId },
            data: {
                isBusinessCard: true,
                vendorId: vendorProfile.id
            }
        });

        return { success: true, vendorId: vendorProfile.id };

    } catch (error) {
        console.error("[VCMS_WORKFLOW_ERROR]", error);
        return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
}
