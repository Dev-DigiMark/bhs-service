/**
 * Mock Chatbot service.
 *
 * Simulates an OpenAI-compatible chat completion endpoint.
 * Replace the commented-out real implementation once API credentials are ready.
 *
 * To switch to real API:
 *   1. Set real values in src/config/env.ts
 *   2. Uncomment `realSendMessage` and export it instead of `sendMessage`.
 */

// ── Real implementation (uncomment when ready) ────────────────────────────────
// import { ENV } from '../config/env';
//
// const SYSTEM_PROMPT = `You are CLEAR, an AI advocacy companion created by BHSS.
// You support Black communities in the UK to navigate healthcare, housing, education,
// and the workplace. Provide rights-based guidance in plain English. Always include
// a disclaimer that your guidance does not replace legal or medical advice.`;
//
// export async function realSendMessage(
//   history: Array<{ role: 'user' | 'assistant'; content: string }>,
//   userMessage: string,
// ): Promise<ChatbotResponse> {
//   const res = await fetch(ENV.CHATBOT_API_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${ENV.CHATBOT_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: ENV.CHATBOT_MODEL,
//       messages: [
//         { role: 'system', content: SYSTEM_PROMPT },
//         ...history,
//         { role: 'user', content: userMessage },
//       ],
//     }),
//   });
//   if (!res.ok) throw new Error(`Chatbot API error: ${res.status}`);
//   const json = await res.json();
//   return parseApiResponse(json.choices[0].message.content);
// }
// ─────────────────────────────────────────────────────────────────────────────

import type { ChatbotResponse } from '../types';

// ── Keyword matchers ──────────────────────────────────────────────────────────

type Scenario = {
  keywords: RegExp;
  build: () => ChatbotResponse;
};

const scenarios: Scenario[] = [
  {
    keywords: /\b(gp|doctor|hospital|health|nhs|appointment|symptom|dismiss|not taken seriously)\b/i,
    build: buildHealthResponse,
  },
  {
    keywords: /\b(manager|racist|discriminat|workplace|work|colleague|hr|grievance|complaint|ignoring)\b/i,
    build: buildWorkplaceResponse,
  },
  {
    keywords: /\b(landlord|rent|evict|housing|repair|flat|property|tenant)\b/i,
    build: buildHousingResponse,
  },
  {
    keywords: /\b(school|exclusion|child|education|send|teacher|headteacher)\b/i,
    build: buildEducationResponse,
  },
];

// ── Mock delay ────────────────────────────────────────────────────────────────

function simulateDelay(): Promise<void> {
  const ms = 900 + Math.random() * 700;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function sendMessage(userMessage: string): Promise<ChatbotResponse> {
  await simulateDelay();

  const match = scenarios.find(({ keywords }) => keywords.test(userMessage));
  return match ? match.build() : buildDefaultResponse();
}

// ── Response builders ─────────────────────────────────────────────────────────

function buildHealthResponse(): ChatbotResponse {
  return {
    content: `It sounds like your concerns haven't been taken seriously — and that matters.\n\n**Your NHS rights include:**\n- The right to a second opinion from another GP\n- The right to request a specialist referral\n- The right to access your medical records\n- The right to make a formal complaint\n\n**Practical next steps:**\n1. Request that any refusal of referral is documented in your notes\n2. Contact your GP practice manager in writing\n3. Reach out to the Patient Advice and Liaison Service (PALS) at your local trust\n\nI've prepared a structured letter you can adapt and send.`,
    actionDocument: {
      title: 'Letter: Request for Referral & Formal Concern',
      type: 'letter',
      body: `[Your Name]
[Your Address]
[Date]

Dear [GP Name / Practice Manager],

I am writing to formally raise a concern regarding my recent consultation on [DATE].

During this appointment, my concerns about [your symptoms/condition] were not addressed to my satisfaction. I felt that my symptoms were dismissed without adequate investigation.

I am requesting:
  1. A formal referral to a specialist in [relevant area]
  2. Written documentation of the clinical reasons if this is refused
  3. A copy of my consultation notes under my right of access

If I do not receive a satisfactory response within 10 working days, I will escalate this to the NHS Patient Advice and Liaison Service (PALS).

Yours sincerely,
[Your Name]
[Contact Details]

────────────────────────────────
⚠ This is guidance only. For urgent health concerns contact 111 or 999.
PALS: Contact your local NHS trust — nhs.uk/nhs-services/hospitals/pals`,
    },
  };
}

function buildWorkplaceResponse(): ChatbotResponse {
  return {
    content: `What you're describing is serious — and you have legal protections.\n\n**Under the Equality Act 2010** you are protected from:\n- Direct and indirect racial discrimination\n- Harassment related to race\n- Victimisation for raising concerns\n\n**Steps to take now:**\n1. Start a private log — dates, what was said, witnesses\n2. Put your concerns to HR in writing (creates a paper trail)\n3. Raise a formal grievance if informal routes fail\n4. ACAS offers free, confidential advice on 0300 123 1100\n\nBelow is a structured script for your next conversation plus a formal grievance letter template.`,
    actionDocument: {
      title: 'Script + Grievance Letter: Workplace Discrimination',
      type: 'script',
      body: `CONVERSATION SCRIPT
────────────────────────────────
"I'd like to raise a formal concern about what happened on [DATE].
[Describe clearly and factually what occurred.]
I believe this constitutes [racial harassment / discrimination] under the Equality Act 2010.
I am requesting this is treated as a formal grievance with a written response within 10 working days."

────────────────────────────────
FORMAL GRIEVANCE LETTER
────────────────────────────────
[Your Name]
[Date]

Dear [HR Manager / Line Manager],

I am writing to formally raise a grievance regarding incidents of [racial discrimination / harassment] in the workplace.

On [DATE(S)], the following occurred:
[Describe each incident clearly, factually, with dates]

I believe this conduct violates the Equality Act 2010 and your organisation's equality policy.

I am requesting:
  1. A formal investigation into these incidents
  2. A written response within 10 working days (ACAS Code of Practice)
  3. Details of any interim measures to ensure this does not continue

I am happy to provide supporting evidence and witness accounts.

Yours sincerely,
[Your Name]

────────────────────────────────
📌 Keep a copy. Contact ACAS: acas.org.uk | 0300 123 1100
⚠ This is guidance, not legal advice. For complex cases, consult an employment solicitor.`,
    },
  };
}

function buildHousingResponse(): ChatbotResponse {
  return {
    content: `You have strong rights as a tenant — let's make sure you can use them.\n\n**Key tenant rights:**\n- Your landlord must keep the property in good repair (Landlord and Tenant Act 1985)\n- They cannot evict you without proper legal process\n- Unlawful eviction is a criminal offence\n\n**If repairs are being ignored:**\n1. Send a formal written request (letter or email — both count)\n2. Contact your local council's housing team if ignored\n3. Escalate to the Housing Ombudsman\n\nHere's a formal repair notice you can send today.`,
    actionDocument: {
      title: 'Formal Repair Request to Landlord',
      type: 'letter',
      body: `[Your Name]
[Property Address]
[Date]

Dear [Landlord / Agent Name],

I am writing to formally request that the following repairs are carried out at the above property:

  - [Issue 1, e.g. broken boiler]
  - [Issue 2, e.g. damp in bedroom]
  - [Issue 3]

I have raised these issues previously on [DATE(S)]. As my landlord, you have a legal obligation under the Landlord and Tenant Act 1985 to keep the property in good repair.

I am requesting these works are completed within 14 days of this letter. If they are not addressed, I will escalate to the local council's housing enforcement team and the Housing Ombudsman, and I may seek a rent reduction for the period the property has been substandard.

Please confirm receipt of this letter in writing.

Yours sincerely,
[Your Name]

────────────────────────────────
📌 Shelter: shelter.org.uk | 0808 800 4444 (free advice)
⚠ Guidance only — not legal advice.`,
    },
  };
}

function buildEducationResponse(): ChatbotResponse {
  return {
    content: `Your child's rights — and yours as their parent — are legally protected.\n\n**If your child has been excluded:**\n- You have the right to written reasons\n- Fixed-term exclusions of more than 5 days: you can request a meeting\n- Permanent exclusion: you can appeal to an Independent Review Panel\n\n**If SEND needs aren't being met:**\n- Request an Education, Health and Care (EHC) needs assessment in writing\n- The school must respond within 15 working days\n- You can escalate to the Local Authority SEND team\n\nHere's a letter to challenge an exclusion or request an assessment.`,
    actionDocument: {
      title: 'Letter: Challenge School Exclusion / Request Assessment',
      type: 'letter',
      body: `[Parent / Guardian Name]
[Address]
[Date]

Dear [Headteacher Name],

I am writing regarding the [exclusion / failure to meet SEND needs] of my child, [Child's Name], [Year Group].

[EXCLUSION]: On [DATE], my child was excluded from school. I have not received adequate written reasons, and I wish to formally challenge this decision. I request:
  1. Full written documentation of the reasons and evidence used
  2. Details of the formal appeals process
  3. Confirmation that educational provision will continue during this period (as required by law)

[SEND]: My child's needs are not being adequately met. I am formally requesting an Education, Health and Care (EHC) needs assessment under the Children and Families Act 2014. I expect a response within 15 working days.

Please respond in writing at the address above.

Yours sincerely,
[Your Name]

────────────────────────────────
📌 IPSEA (free SEND legal advice): ipsea.org.uk
📌 Gov exclusions guidance: gov.uk/school-discipline-exclusions
⚠ Guidance only — not legal advice.`,
    },
  };
}

function buildDefaultResponse(): ChatbotResponse {
  return {
    content: `I'm here to help — tell me a little more so I can give you more specific guidance.\n\n**CLEAR can support you with:**\n- Health appointments and NHS complaints\n- Workplace discrimination and grievances\n- Housing rights and landlord disputes\n- School exclusions and SEND\n\n**A useful place to start:**\n1. Write down exactly what happened — dates, people involved\n2. Note what you've already tried\n3. Tell me which area of life this affects\n\nYou can also tap one of the example prompts to see CLEAR in action.`,
    actionDocument: {
      title: 'General Advocacy Checklist',
      type: 'checklist',
      body: `ADVOCACY CHECKLIST
────────────────────────────────
□ Write down everything that happened (dates, names, what was said)
□ Keep all correspondence — emails, letters, texts
□ Put all future requests in writing
□ Ask for decisions and refusals to be documented
□ Know who to escalate to if you're ignored at the first step
□ You do not have to accept a first refusal as final

────────────────────────────────
KEY CONTACTS
────────────────────────────────
Citizens Advice:  citizensadvice.org.uk | 0800 144 8848
ACAS (work):      acas.org.uk           | 0300 123 1100
Shelter (housing):shelter.org.uk        | 0808 800 4444
NHS PALS:         Contact your local trust
IPSEA (education):ipsea.org.uk

────────────────────────────────
⚠ This is guidance only. For urgent or complex matters, seek professional advice.`,
    },
  };
}
