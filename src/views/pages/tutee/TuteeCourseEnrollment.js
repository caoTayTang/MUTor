import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, Users, Clock, MapPin, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';


// Mock API calls
const mockAPI = {
  getAllCourses: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return [
      {
        id: 1,
        title: "Giải tích 1",
        description: "Khóa học Giải tích 1 dành cho sinh viên năm nhất. Học các kiến thức cơ bản về giới hạn, đạo hàm, tích phân.",
        tutor: {
          name: "Nguyễn Văn A",
          email: "nguyenvana@hcmut.edu.vn",
          rating: 4.8
        },
        enrolledCount: 12,
        maxStudents: 20,
        schedule: "Thứ 2, 4, 6 - 18:00-20:00",
        location: "H1-201",
        startDate: "2025-11-10",
        status: "open",
        isEnrolled: false
      },
      {
        id: 2,
        title: "Lập trình C++",
        description: "Học lập trình C++ từ cơ bản đến nâng cao. Phù hợp cho sinh viên muốn nắm vững lập trình hướng đối tượng.",
        tutor: {
          name: "Trần Thị B",
          email: "tranthib@hcmut.edu.vn",
          rating: 4.9
        },
        enrolledCount: 8,
        maxStudents: 15,
        schedule: "Thứ 3, 5 - 19:00-21:00",
        location: "B4-Lab1",
        startDate: "2025-11-15",
        status: "open",
        isEnrolled: false
      },
      {
        id: 3,
        title: "Vật lý đại cương",
        description: "Khóa học vật lý đại cương cho sinh viên kỹ thuật",
        tutor: {
          name: "Lê Văn C",
          email: "levanc@hcmut.edu.vn",
          rating: 4.7
        },
        enrolledCount: 15,
        maxStudents: 15,
        schedule: "Thứ 2, 4 - 17:00-19:00",
        location: "H2-305",
        startDate: "2025-11-12",
        status: "full",
        isEnrolled: false
      },
      {
        id: 4,
        title: "Tiếng Anh giao tiếp",
        description: "Khóa học tiếng Anh giao tiếp cơ bản",
        tutor: {
          name: "Phạm Thị D",
          email: "phamthid@hcmut.edu.vn",
          rating: 4.6
        },
        enrolledCount: 10,
        maxStudents: 20,
        schedule: "Thứ 7 - 14:00-16:00",
        location: "Online",
        startDate: "2025-11-08",
        status: "open",
        isEnrolled: true
      }
    ];
  },
  enrollCourse: async (courseId) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: "Đăng ký thành công" };
  },
  unenrollCourse: async (courseId) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: "Hủy đăng ký thành công" };
  }
};

export default function TuteeCourseEnrollment() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, open, enrolled
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const data = await mockAPI.getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error('Failed to load courses:', error);
    }
    setLoading(false);
  };

  const handleEnroll = async (courseId) => {
    try {
      setActionLoading(true);
      await mockAPI.enrollCourse(courseId);
      alert('Đăng ký khóa học thành công!');
      setShowModal(false);
      await loadCourses();
    } catch (error) {
      alert('Có lỗi xảy ra khi đăng ký khóa học');
    }
    setActionLoading(false);
  };

  const handleUnenroll = async (courseId) => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy đăng ký khóa học này?')) return;

    try {
      setActionLoading(true);
      await mockAPI.unenrollCourse(courseId);
      alert('Hủy đăng ký thành công!');
      await loadCourses();
    } catch (error) {
      alert('Có lỗi xảy ra khi hủy đăng ký');
    }
    setActionLoading(false);
  };

  const openCourseDetail = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStatus === 'enrolled') return matchesSearch && course.isEnrolled;
    if (filterStatus === 'open') return matchesSearch && course.status === 'open' && !course.isEnrolled;
    return matchesSearch;
  });

  return (
    <div className="bg-white shadow-sm border-b">

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[300px] relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm khóa học..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setFilterStatus('open')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'open'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Đang mở
              </button>
              <button
                onClick={() => setFilterStatus('enrolled')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'enrolled'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Đã đăng ký
              </button>
            </div>
          </div>
        </div>

        {/* Course List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 mt-4">Đang tải khóa học...</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy khóa học</h3>
            <p className="text-gray-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredCourses.map(course => (
              <div key={course.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  {/* Header
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Tutor: {course.tutor.name}</span>
                        <span>•</span>
                        <span>⭐ {course.tutor.rating}</span>
                      </div>
                    </div>
                    {course.isEnrolled ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Đã đăng ký
                      </span>
                    ) : course.status === 'full' ? (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium flex items-center gap-1">
                        <XCircle className="w-4 h-4" />
                        Đã đủ
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        Đang mở
                      </span>
                    )}
                  </div> */}

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                  {/* Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{course.enrolledCount}/{course.maxStudents} sinh viên</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{course.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{course.location}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t">
                    <button
                      onClick={() => openCourseDetail(course)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Chi tiết
                    </button>
                    {course.isEnrolled ? (
                      <button
                        onClick={() => handleUnenroll(course.id)}
                        disabled={actionLoading}
                        className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                      >
                        Hủy đăng ký
                      </button>
                    ) : course.status === 'full' ? (
                      <button
                        disabled
                        className="flex-1 bg-gray-100 text-gray-400 px-4 py-2 rounded-lg font-medium cursor-not-allowed"
                      >
                        Đã đủ chỗ
                      </button>
                    ) : (
                      <button
                        onClick={() => openCourseDetail(course)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Đăng ký
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Course Detail Modal */}
      {showModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCourse.title}</h2>
                  <p className="text-gray-600">Giảng viên: {selectedCourse.tutor.name}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Mô tả khóa học</h3>
                <p className="text-gray-600">{selectedCourse.description}</p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Lịch học</h4>
                  <p className="text-gray-600">{selectedCourse.schedule}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Địa điểm</h4>
                  <p className="text-gray-600">{selectedCourse.location}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Ngày bắt đầu</h4>
                  <p className="text-gray-600">{new Date(selectedCourse.startDate).toLocaleDateString('vi-VN')}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Số lượng</h4>
                  <p className="text-gray-600">{selectedCourse.enrolledCount}/{selectedCourse.maxStudents} sinh viên</p>
                </div>
              </div>

              {/* Tutor Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Thông tin Tutor</h4>
                <div className="space-y-1">
                  <p className="text-gray-700">Tên: {selectedCourse.tutor.name}</p>
                  <p className="text-gray-700">Email: {selectedCourse.tutor.email}</p>
                  <p className="text-gray-700">Đánh giá: ⭐ {selectedCourse.tutor.rating}/5.0</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Đóng
                </button>
                {selectedCourse.isEnrolled ? (
                  <button
                    onClick={() => handleUnenroll(selectedCourse.id)}
                    disabled={actionLoading}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    {actionLoading ? 'Đang xử lý...' : 'Hủy đăng ký'}
                  </button>
                ) : selectedCourse.status === 'full' ? (
                  <button
                    disabled
                    className="flex-1 bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-medium cursor-not-allowed"
                  >
                    Đã đủ chỗ
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll(selectedCourse.id)}
                    disabled={actionLoading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    {actionLoading ? 'Đang xử lý...' : 'Đăng ký ngay'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}