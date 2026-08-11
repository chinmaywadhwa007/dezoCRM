export const API_CONFIG = {
  crmApiUrl: import.meta.env.VITE_CRM_API_URL || 'http://localhost:5000',
  estateApiUrl: import.meta.env.VITE_ESTATE_API_URL || 'http://localhost:5000',
  schoolycoreApiUrl: import.meta.env.VITE_SCHOOLYCORE_API_URL || import.meta.env.VITE_ESTATE_API_URL || 'http://localhost:5000',
  schoolycoreLiteApiUrl: import.meta.env.VITE_SCHOOLYCORE_LITE_API_URL || 'http://localhost:5000',
};
