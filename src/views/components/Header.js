import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import logoBK from "../../assets/logoBK.png";


export default function Header({ role }) {
  return (
    <header className="bg-[#002855] text-white py-3 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo + Trường */}
        <div className="flex items-center gap-3">
          <img src={logoBK} alt="BK Logo" className="w-10 h-10 rounded-lg bg-white p-1" />
          <div>
            <div className="text-xs font-light uppercase">Đại học Quốc gia TP. HCM</div>
            <div className="text-sm font-semibold tracking-wide">
              Trường Đại học Bách Khoa
            </div>
          </div>
        </div>

        {/* Middle: Dynamic Role Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="hover:text-blue-300 transition">Trang chủ</Link>

          {role === "tutor" && (
            <>
              <Link to="/tutor/courses" className="hover:text-blue-300 transition">Khóa học</Link>
              <Link to="/tutor/tracking" className="hover:text-blue-300 transition">Theo dõi</Link>
              <Link to="/tutor/reports" className="hover:text-blue-300 transition">Báo cáo</Link>            
            </>
          )}

          {role === "tutee" && (
            <>
              <Link to="/tutee/courses" className="hover:text-blue-300 transition">Khóa học</Link>
              <Link to="/tutee/feedback" className="hover:text-blue-300 transition">Feedback</Link>
              <Link to="/tutee/library" className="hover:text-blue-300 transition">Tài liệu</Link>
            </>
          )}

          {role === "admin" && (
            <>
              <Link to="/admin/dashboard" className="hover:text-blue-300 transition">Tổng quan</Link>
              <Link to="/admin/meetings" className="hover:text-blue-300 transition">Duyệt buổi họp</Link>
              <Link to="/admin/feedbacks" className="hover:text-blue-300 transition">Phản hồi</Link>
              <Link to="/admin/evaluations" className="hover:text-blue-300 transition">Đánh giá</Link>
              <Link to="/admin/tracking" className="hover:text-blue-300 transition">Theo dõi tiến độ</Link>
              <Link to="/admin/reports" className="hover:text-blue-300 transition">Báo cáo tổng hợp</Link>
            </>
          )}

        </nav>

      </div>
    </header>
  );
}
