// WhatsApp configuration - update the number here to change globally
export const WHATSAPP_NUMBER = '917678293353';

export function getWhatsAppUrl(message?: string, number?: string): string {
  const phone = number || WHATSAPP_NUMBER;
  const text = message || getDefaultMessage();
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function getDefaultMessage(): string {
  return 'Assalamu Alaikum, I would like to request a private consultation with Maulana Hafiz Ali regarding a personal relationship or marriage concern.';
}

export function getServiceMessage(service: string): string {
  return `Assalamu Alaikum, I would like guidance regarding ${service}.`;
}
