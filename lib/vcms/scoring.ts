import { VCMSScoreComponents } from "./types";

/**
 * Calculates the VCMS Score based on the weighted formula:
 * Score = ((0.5 * Quality) + (0.35 * Reliability) + (0.15 * Compliance)) * Penalty
 */
export function calculateVCMSScore(
    qualityData: { starRating: number; reviewCount: number },
    reliabilityData: { internalRating: number; totalJobs: number },
    complianceData: { hasCOI: boolean; hasContract: boolean; isDoNotUse: boolean; licenseExpired: boolean }
): VCMSScoreComponents {

    // 1. Quality Score (Max 50)
    // Rating contributes up to 40, Volume contributes up to 10
    const ratingScore = (qualityData.starRating / 5) * 40;
    // Logarithmic scale for reviews: 100 reviews = max 10 pts
    const volumeScore = Math.min(10, Math.log10(qualityData.reviewCount + 1) * 5);
    const qualityScore = Math.min(50, ratingScore + volumeScore);

    // 2. Reliability Score (Max 35)
    // Internal rating avg * 7 = 35 max
    const reliabilityScore = Math.min(35, (reliabilityData.internalRating / 5) * 35);

    // 3. Compliance Score (Max 15)
    let complianceScore = 0;
    if (complianceData.hasCOI) complianceScore += 10;
    if (complianceData.hasContract) complianceScore += 5;

    // 4. Penalty Multiplier
    let penaltyMultiplier = 1.0;
    if (complianceData.licenseExpired || complianceData.isDoNotUse) {
        penaltyMultiplier = 0.5;
    }

    // Final Calculation
    const finalScore = (
        (0.50 * qualityScore) +
        (0.35 * reliabilityScore) +
        (0.15 * complianceScore)
    ) * penaltyMultiplier;

    return {
        quality_score: Math.round(qualityScore * 10) / 10,
        reliability_score: Math.round(reliabilityScore * 10) / 10,
        compliance_score: complianceScore,
        penalty_multiplier: penaltyMultiplier,
        final_score: Math.round(finalScore) // Integer score 0-100
    };
}
