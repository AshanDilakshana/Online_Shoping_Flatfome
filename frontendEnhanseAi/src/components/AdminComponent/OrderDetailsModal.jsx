import React from 'react';
import { Modal } from './ui/Modal';
import { Printer, MapPin, Phone, Mail, Package } from 'lucide-react';
import jsPDF from 'jspdf';

export function OrderDetailsModal({
  isOpen,
  onClose,
  order
}) {
  if (!order) return null;
  const generatePDF = () => {
    const doc = new jsPDF();
    // Header
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('MIMOSA FOREVER', 105, 20, {
      align: 'center'
    });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Shipping Label', 105, 30, {
      align: 'center'
    });
    // Order Info
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Order #${order.id}`, 20, 50);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${order.date}`, 150, 50);
    // Customer Address Box
    doc.rect(20, 60, 170, 60);
    doc.setFontSize(10);
    doc.text('DELIVER TO:', 30, 70);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(order.customerName.toUpperCase(), 30, 80);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const addressLines = doc.splitTextToSize(order.address, 150);
    doc.text(addressLines, 30, 90);
    doc.text(`Tel: ${order.phone}`, 30, 110);
    // Footer
    doc.setFontSize(8);
    doc.text('Thank you for shopping with Mimosa Forever!', 105, 140, {
      align: 'center'
    });
    doc.save(`Mimosa_Label_${order.id}.pdf`);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <Modal isOpen={isOpen} onClose={onClose} title={`Order Details - ${order.id}`} maxWidth="max-w-3xl">
      <div className="space-y-8">
        {/* Header Status */}
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
          <div>
            <p className="text-sm text-gray-500">
              Order placed on {order.date}
            </p>
            <p className="font-medium text-gray-900 mt-1">
              Total: LKR {order.total.toLocaleString()}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </div>

        {/* Customer & Shipping Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-playfair font-bold text-lg text-gray-900 flex items-center gap-2">
              <MapPin size={18} className="text-rose-500" /> Shipping Address
            </h3>
            <div className="bg-white border border-gray-100 p-4 rounded-lg shadow-sm">
              <p className="font-bold text-gray-800">{order.customerName}</p>
              <p className="text-gray-600 mt-1">{order.address}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-playfair font-bold text-lg text-gray-900 flex items-center gap-2">
              <Phone size={18} className="text-rose-500" /> Contact Info
            </h3>
            <div className="bg-white border border-gray-100 p-4 rounded-lg shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={16} /> {order.email}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={16} /> {order.phone}
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h3 className="font-playfair font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
            <Package size={18} className="text-rose-500" /> Order Items
          </h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-700">
                    Product
                  </th>
                  <th className="px-4 py-3 font-medium text-gray-700">
                    Details
                  </th>
                  <th className="px-4 py-3 font-medium text-gray-700 text-right">
                    Price
                  </th>
                  <th className="px-4 py-3 font-medium text-gray-700 text-right">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {order.items.map((item, idx) => <tr key={idx}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.title} className="w-12 h-16 object-cover rounded bg-gray-100" />
                        <span className="font-medium text-gray-900">
                          {item.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <div className="flex flex-col">
                        <span>Size: {item.size}</span>
                        <span>Color: {item.color}</span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      LKR {item.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">
                      LKR {(item.price * item.quantity).toLocaleString()}
                    </td>
                  </tr>)}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={3} className="px-4 py-2 text-right text-gray-600">
                    Subtotal:
                  </td>
                  <td className="px-4 py-2 text-right font-medium">
                    LKR {order.subtotal.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="px-4 py-2 text-right text-gray-600">
                    Shipping:
                  </td>
                  <td className="px-4 py-2 text-right font-medium">
                    LKR {order.shipping.toLocaleString()}
                  </td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td colSpan={3} className="px-4 py-3 text-right font-bold text-gray-900">
                    Total:
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-rose-900">
                    LKR {order.total.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button onClick={generatePDF} className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-md">
            <Printer size={18} /> Print Address Label
          </button>
        </div>
      </div>
    </Modal>;
}
