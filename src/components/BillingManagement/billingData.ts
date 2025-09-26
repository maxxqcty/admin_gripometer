// src/data/billingData.ts

export const bills = [
  { id: 1, customerName: "Rodriguez Family", meterNumber: "OW1234", previousReading: 1250, currentReading: 1275, consumption: 25, amount: 385.50, dueDate: "2024-02-15", status: "paid", paidDate: "2024-02-10" },
  { id: 2, customerName: "Lopez Household", meterNumber: "WM001235", previousReading: 980, currentReading: 1008, consumption: 28, amount: 421.20, dueDate: "2024-02-15", status: "pending", paidDate: null },
  { id: 3, customerName: "Mendoza Family", meterNumber: "WM001236", previousReading: 1420, currentReading: 1455, consumption: 35, amount: 508.75, dueDate: "2024-02-15", status: "overdue", paidDate: null },
  { id: 4, customerName: "Silva Residence", meterNumber: "WM001237", previousReading: 875, currentReading: 895, consumption: 20, amount: 315.00, dueDate: "2024-02-15", status: "paid", paidDate: "2024-02-08" },
  { id: 5, customerName: "Torres Family", meterNumber: "WM001238", previousReading: 1650, currentReading: 1688, consumption: 38, amount: 545.20, dueDate: "2024-02-15", status: "pending", paidDate: null }
];

export const paymentHistory = [
  { id: 1, customerName: "Rodriguez Family", billId: "BL-2024-001", amount: 385.50, paidDate: "2024-02-10", method: "Bank Transfer", reference: "TXN123456789" },
  { id: 2, customerName: "Silva Residence", billId: "BL-2024-004", amount: 315.00, paidDate: "2024-02-08", method: "GCash", reference: "GC987654321" },
  { id: 3, customerName: "Martinez Home", billId: "BL-2024-012", amount: 425.75, paidDate: "2024-02-05", method: "Cash", reference: "CSH001234" },
  { id: 4, customerName: "Gonzales Family", billId: "BL-2024-008", amount: 367.25, paidDate: "2024-02-03", method: "Bank Transfer", reference: "TXN987654321" },
  { id: 5, customerName: "Ramirez Household", billId: "BL-2024-015", amount: 398.50, paidDate: "2024-02-01", method: "PayMaya", reference: "PM456789123" }
];
