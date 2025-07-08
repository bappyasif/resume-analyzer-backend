export const geminiResumePromptForExtraction = (text: string, role: string) => {
    return `
    Analyze this resume and extract the following information:
- Name
- Email
- Phone
- Skills (as a list of strings)
- Experience (as a list of objects, each detailing title, company, dates, and key responsibilities/achievements)
- Education (as a list of objects, each detailing degree, institution, and dates)
- Certifications (as a list of strings)
- Projects (as a list of strings)
- Awards (as a list of strings)
- Languages (as a list of strings)
- Interests (as a list of strings)
- Achievements (as a list of strings)
- References (as a list of strings)
- Summary (few sentences that reflects candidates strengths and weaknesses as a ${role})

Format your response strictly as a JSON object and turn those props keys in lowercase.
Resume Text:
${text}
    `
}

export const geminiResumePromptForFeedback = (text: string, role: string) => {
    return `
    Given the following resume text for a candidate interested in a "${role}" position:
---
Resume Text:
${text}
---

Provide actionable feedback and suggestions for improvement related to the "${role}". Focus on:
- Skills: Identify any crucial skills for a ${role} that are missing or could be highlighted better. Suggest relevant skills to develop.
- Experience: How can the candidate better tailor their experience presentation for a ${role}? Suggest ways to quantify achievements.
- Education: Are there any additional educational qualifications or certifications that would be beneficial for a ${role}?
- Certifications: How can the candidate's certifications demonstrate their relevant skills for a ${role}?
- Projects: How can the candidate's projects demonstrate their relevant skills for a ${role}?
- Awards: How can the candidate's awards demonstrate their achievements in a ${role}?
- Interests: How can the candidate's interests align with a ${role}?
- Achievements: How can the candidate's achievements demonstrate their relevant skills for a ${role}?
- References: How can the candidate's references demonstrate their relevant skills for a ${role}?
- - ATS: calculate ATS score (out of 10) before and after reflecting then  adjusted resume as per provided feedback. Suggestions ,improvements and examples for ATS score betterment
- Summary: How can the candidate's summary demonstrate their relevant skills for a ${role}?

Format your response as a JSON object with keys in lowercase.
    `
}