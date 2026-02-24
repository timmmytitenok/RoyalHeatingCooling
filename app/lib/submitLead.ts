export type LeadPayload = {
  formType: string;
  fullName: string;
  phone: string;
  email: string;
  [key: string]: unknown;
};

export async function submitLead(payload: LeadPayload) {
  const response = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = 'Failed to submit request. Please try again.';
    try {
      const data = (await response.json()) as { message?: string };
      if (data?.message) {
        message = data.message;
      }
    } catch {
      // Fall back to default message when response is not JSON.
    }
    throw new Error(message);
  }

  return response.json();
}
