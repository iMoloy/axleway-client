import { jsPDF } from "jspdf";

export function generateBookingPDF(booking) {
  const doc = new jsPDF();

  // Header Banner
  doc.setFillColor(30, 41, 59); // Dark slate background
  doc.rect(0, 0, 210, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("AXLEWAY RENTAL INVOICE", 14, 25);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Invoice ID: INV-${booking._id ? booking._id.slice(-8).toUpperCase() : "AXL"}`, 140, 20);
  doc.text(`Issued Date: ${new Date().toLocaleDateString()}`, 140, 27);

  // Customer & Car Info Section
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Booking Details", 14, 55);

  doc.setLineWidth(0.5);
  doc.setDrawColor(226, 232, 240);
  doc.line(14, 58, 196, 58);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  
  const details = [
    ["Vehicle Name:", booking.carName || "N/A"],
    ["Vehicle Category:", booking.carType || "N/A"],
    ["Customer Email:", booking.userEmail || "N/A"],
    ["Rental Period:", `${booking.startDate || "N/A"} to ${booking.endDate || "N/A"}`],
    ["Rental Duration:", `${booking.rentalDays || 1} Day(s)`],
    ["Driver Included:", booking.driverNeeded || "No"],
    ["Special Notes:", booking.note || "None"],
  ];

  let startY = 68;
  details.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(label, 14, startY);
    doc.setFont("helvetica", "normal");
    doc.text(value, 60, startY);
    startY += 9;
  });

  // Financial Breakdown Box
  startY += 5;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, startY, 182, 35, 3, 3, "F");

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Payment Summary", 22, startY + 12);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Subtotal (${booking.rentalDays || 1} days):`, 22, startY + 23);
  doc.text(`$${booking.totalPrice || 0}.00`, 150, startY + 23);

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(16, 185, 129); // Emerald green for Total Paid
  doc.text("Total Paid (Completed):", 22, startY + 31);
  doc.text(`$${booking.totalPrice || 0}.00`, 150, startY + 31);

  // Footer Note
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text("Thank you for renting with AxleWay! Drive safely.", 14, 280);
  doc.text("Support: support@axleway.com | https://axleway.vercel.app", 110, 280);

  // Save the PDF file
  const fileName = `AxleWay_Invoice_${booking.carName ? booking.carName.replace(/\s+/g, "_") : "Booking"}.pdf`;
  doc.save(fileName);
}
