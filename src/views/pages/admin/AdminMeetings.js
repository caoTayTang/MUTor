import React, { useState } from "react";
import { Check, X, Eye } from "lucide-react";

const mockMeetings = [
  { id: 1, tutor: "Nguyễn Văn A", tutee: "Trần Thị B", date: "2025-10-28", status: "pending", note: "Thảo luận bài tập 3" },
  { id: 2, tutor: "Lê Văn C", tutee: "Phạm Văn D", date: "2025-10-29", status: "approved", note: "Hướng dẫn đồ án" },
];

export default function AdminMeetings() {
  const [meetings, setMeetings] = useState(mockMeetings);
  const [selected, setSelected] = useState(null);

  const updateStatus = (id, newStatus) => {
    setMeetings((m) => m.map(x => x.id === id ? { ...x, status: newStatus } : x));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Duyệt buổi meeting</h1>

      <div className="bg-white rounded-2xl shadow p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-700">
              <th className="py-3">Tutor</th>
              <th>Học viên</th>
              <th>Ngày</th>
              <th>Ghi chú</th>
              <th>Trạng thái</th>
              <th className="text-right">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map(m => (
              <tr key={m.id} className="border-b text-gray-600">
                <td className="py-3">{m.tutor}</td>
                <td>{m.tutee}</td>
                <td>{m.date}</td>
                <td>{m.note}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    m.status === "approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {m.status}
                  </span>
                </td>
                <td className="text-right">
                  <button onClick={() => setSelected(m)} className="px-3 py-1 rounded-lg mr-2 bg-blue-50 text-blue-700"><Eye className="w-4 h-4 inline" /> Xem</button>
                  {m.status !== "approved" && <button onClick={() => updateStatus(m.id, "approved")} className="px-3 py-1 rounded-lg bg-green-50 text-green-700 mr-2"><Check className="w-4 h-4 inline" /> Duyệt</button>}
                  <button onClick={() => updateStatus(m.id, "rejected")} className="px-3 py-1 rounded-lg bg-red-50 text-red-700"><X className="w-4 h-4 inline" /> Hủy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h3 className="text-lg font-semibold mb-2">Chi tiết meeting</h3>
            <p className="text-sm text-gray-600 mb-4"><strong>Tutor:</strong> {selected.tutor}</p>
            <p className="text-sm text-gray-600 mb-4"><strong>Tutee:</strong> {selected.tutee}</p>
            <p className="text-sm text-gray-600 mb-4"><strong>Ngày:</strong> {selected.date}</p>
            <p className="text-sm text-gray-600 mb-6"><strong>Ghi chú:</strong> {selected.note}</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setSelected(null)} className="px-4 py-2 bg-gray-100 rounded-lg">Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
