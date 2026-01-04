
export type ServiceCategory = 'WHATSAPP_BOT' | 'WEBSITE' | 'DISCORD_BOT' | 'TELEGRAM_BOT' | 'ADDON_FIX';
export type DurationOption = 'FAST' | 'MEDIUM' | 'SLOW';

export interface InvoiceData {
  clientName: string;
  clientPhone: string;
  serviceCategory: ServiceCategory;
  targetPlatform?: ServiceCategory; // For addon_fix
  duration: DurationOption;
  projectDescription: string;
  features: string[];
  totalPrice: number;
  date: string;
  invoiceNumber: string;
}
