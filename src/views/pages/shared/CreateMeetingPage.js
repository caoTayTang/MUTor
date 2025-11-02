import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Save, Send, XCircle, CheckCircle } from 'lucide-react';

const attendeesMock = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C']; // demo

export default function CreateMeetingPage() {
  const { user } = useAuth();
  const nav = useNavigate();

  /* --------- form state --------- */
  const [title, setTitle]         = useState('');
  const [date, setDate]           = useState('');
  const [time, setTime]           = useState('');
  const [location, setLocation]   = useState('');
  const [agenda, setAgenda]       = useState('');
  const [content, setContent]     = useState('');
  const [attendees, setAttendees] = useState([]);

  /* --------- UI state ----------- */
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);

  /* --------- handlers ----------- */
  const toggleAttendee = (name) =>
    setAttendees((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !date || !content) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // mock API
    setLoading(false);
    setDone(true);
    setTimeout(() => nav('/tutor/courses'), 1800);
  };

  /* --------- success card ------- */
  if (done)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Biên bản đã được nộp!</h2>
          <p className="text-gray-600">Tự động quay lại danh sách khóa học...</p>
        </div>
      </div>
    );

  /* --------- render form -------- */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ---- header (same style) ---- */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Tạo biên bản cuộc họp</h1>
            <p className="text-sm text-gray-600">Xin chào, {user?.name}</p>
          </div>
          <button
            onClick={() => nav(-1)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Quay lại
          </button>
        </div>
      </div>

      {/* ---- form card ---- */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề *</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="VD: Họp định kỳ Tutor - 05/2025"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ngày họp *</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Giờ</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Địa điểm</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="VD: H1-401"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* ---- attendees ---- */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Người tham dự</label>
            <div className="flex flex-wrap gap-3">
              {attendeesMock.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => toggleAttendee(name)}
                  className={`px-3 py-1 rounded-full border transition ${attendees.includes(name)
                    ? 'bg-blue-100 text-blue-700 border-blue-300'
                    : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* ---- agenda ---- */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chương trình họp</label>
            <textarea
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              rows={3}
              placeholder="Liệt kê các mục thảo luận..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          {/* ---- minutes content ---- */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung biên bản *</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={6}
              placeholder="Tóm tắt nội dung đã thảo luận, quyết định, phân công..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          {/* ---- action bar ---- */}
          <div className="flex gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => nav(-1)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <XCircle className="w-5 h-5" /> Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Đang nộp...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" /> Nộp biên bản
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}