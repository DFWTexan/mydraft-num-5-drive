import { get, create, generateQueryString } from "./apiUtility";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPlayers: async (params) =>
    get(`Player/GetPlayers${generateQueryString(params)}`),
  getPlayersDrafted: async (params) =>
    get(`v1/Report/RevenueSummary${generateQueryString(params)}`),
  getRevenueSummaryExport: async (params) =>
    create(`v1/Report/RevenueSummaryExport`, params),
  // getPaymentReconciliationExport: async params => get(`v1/Report/PaymentReconciliationExport${generateQueryString(params)}`),
  // getInvoiceRegisterDetails: async params => get(`v1/Report/InvoiceRegisterDetails${generateQueryString(params)}`),
  // getInvoiceRegisterDetailsExport: async params => get(`v1/Report/InvoiceRegisterDetailsExport${generateQueryString(params)}`),
  // getReceivables: async params => get(`v1/Report/Receivables${generateQueryString(params)}`),
  // getReceivablesExport: async params => get(`v1/Report/ReceivablesExport${generateQueryString(params)}`),
  // getLienReport: async params => get(`v1/Package/GetLienReport${generateQueryString(params)}`),
  // getInventoryReport: async params => get(`v1/Report/Inventory${generateQueryString(params)}`),
  // getInventoryReportExport: async params => get(`v1/Report/InventoryExport${generateQueryString(params)}`),
  // getInventoryReportPDF: async params => get(`v1/Inventory/GetInventoryPDF${generateQueryString(params)}`),
  // getInventoryActivity: async params => get(`v1/Report/InventoryActivity${generateQueryString(params)}`),
  // getIventoryActivitiesExport: async params => get(`v1/Report/GetInventoryActivityExcel${generateQueryString(params)}`),
  // getInventoryActivityPDF: async params => get(`v1/Report/GetInventoryActivityPDF${generateQueryString(params)}`),
  // getInvoiceRegisterPDF: async params => get(`v1/Report/GetInvoiceRegisterPDF${generateQueryString(params)}`),
  // getLienStatusPDF: async params => get(`v1/Report/GetLienStatusPDF${generateQueryString(params)}`),
  // getPaymentReconciliationPDF: async params => get(`v1/Report/GetPaymentReconciliationPDF${generateQueryString(params)}`),
  // getReceivablesPDF: async params => get(`v1/Report/GetReceivablesPDF${generateQueryString(params)}`),
  // getLienReportExport: async params => get(`v1/Package/GetLienReportExport${generateQueryString(params)}`),
  // getRevenueSummaryPDF: async params => get(`v1/Report/GetRevenueSummaryPDF${generateQueryString(params)}`),
  // getReportPowerBI: async params => get(`v1/Report/PowerBI?report_ID=1`)
};
