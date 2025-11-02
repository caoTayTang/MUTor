import React, { useState, useEffect } from 'react';
import { Plus, BookOpen, Users, Clock, Edit2, Trash2, Search, Filter, MessageSquare, FileText, Calendar, FileBarChart } from 'lucide-react';
import { Link } from 'react-router-dom';



// Mock API calls - replace with your actual API
const mockAPI = {
  getMyCourses: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return [
      {
        id: 1,
        title: "Giải tích 1",
        description: "Khóa học Giải tích 1 dành cho sinh viên năm nhất",
        status: "active",
        enrolledCount: 12,
        maxStudents: 20,
        schedule: "Thứ 2, 4, 6 - 18:00-20:00",
        location: "H1-201"
      },
      {
        id: 2,
        title: "Lập trình C++",
        description: "Học lập trình C++ từ cơ bản đến nâng cao",
        status: "active",
        enrolledCount: 8,
        maxStudents: 15,
        schedule: "Thứ 3, 5 - 19:00-21:00",
        location: "B4-Lab1"
      }
    ];
  },
  createCourse: async (courseData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, courseId: Date.now() };
  },
  updateCourse: async (courseId, courseData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  },
  deleteCourse: async (courseId) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true };
  }
};

export default function TutorCourseDashboard() {
  const [view, setView] = useState('list'); // list, create, edit
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const user = { name: 'Nguyễn Văn A' };
  const handleLogout = () => alert('Logging out...');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    maxStudents: '',
    schedule: '',
    location: '',
    startDate: '',
    endDate: '',
    subject: '',
    level: 'beginner'
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const data = await mockAPI.getMyCourses();
      setCourses(data);
    } catch (error) {
      console.error('Failed to load courses:', error);
    }
    setLoading(false);
  };

  const handleCreateCourse = async () => {
    if (!formData.title || !formData.description) {
      alert('Vui lòng điền đầy đủ thông tin khóa học');
      return;
    }

    try {
      setLoading(true);
      await mockAPI.createCourse(formData);
      alert('Tạo khóa học thành công!');
      setView('list');
      resetForm();
      await loadCourses();
    } catch (error) {
      alert('Có lỗi xảy ra khi tạo khóa học');
    }
    setLoading(false);
  };

  const handleUpdateCourse = async () => {
    try {
      setLoading(true);
      await mockAPI.updateCourse(selectedCourse.id, formData);
      alert('Cập nhật khóa học thành công!');
      setView('list');
      resetForm();
      await loadCourses();
    } catch (error) {
      alert('Có lỗi xảy ra khi cập nhật khóa học');
    }
    setLoading(false);
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa khóa học này?')) return;

    try {
      setLoading(true);
      await mockAPI.deleteCourse(courseId);
      alert('Xóa khóa học thành công!');
      await loadCourses();
    } catch (error) {
      alert('Có lỗi xảy ra khi xóa khóa học');
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      maxStudents: '',
      schedule: '',
      location: '',
      startDate: '',
      endDate: '',
      subject: '',
      level: 'beginner'
    });
    setSelectedCourse(null);
  };

  const startEdit = (course) => {
    setSelectedCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      maxStudents: course.maxStudents.toString(),
      schedule: course.schedule,
      location: course.location,
      startDate: '',
      endDate: '',
      subject: '',
      level: 'beginner'
    });
    setView('edit');
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Quản lý khóa học</h1>
            <p className="text-sm text-gray-600">Xin chào, {user.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100"
          >
            Đăng xuất
          </button>
        <Link
        to="/feedback"
        className="px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium
                    bg-white text-gray-700 border border-gray-300
                    hover:bg-blue-50 hover:text-blue-600 hover:border-blue-500
                    transition-all"
        >
        <MessageSquare className="w-5 h-5" />
        Phản hồi / Đánh giá
        </Link>
        <Link
        to="/meeting/create"
        className="px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium
                    bg-white text-gray-700 border border-gray-300
                    hover:bg-blue-50 hover:text-blue-600 hover:border-blue-500
                    transition-all"
        >
        <FileText className="w-5 h-5" />
        Tạo biên bản
        </Link>
        <Link
        to="/tracking"
        className="px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium
                    bg-white text-gray-700 border border-gray-300
                    hover:bg-blue-50 hover:text-blue-600 hover:border-blue-500
                    transition-all"
        >
        <Calendar className="w-5 h-5" />
        Theo dõi
        </Link>
        <Link
        to="/reports"
        className="px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium
                    bg-white text-gray-700 border border-gray-300
                    hover:bg-blue-50 hover:text-blue-600 hover:border-blue-500
                    transition-all"
        >
        <FileBarChart className="w-5 h-5" />
        Báo cáo
        </Link>
        <Link
        to="/library"
        className="px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium
                    bg-white text-gray-700 border border-gray-300
                    hover:bg-blue-50 hover:text-blue-600 hover:border-blue-500
                    transition-all"
        >
        <BookOpen className="w-5 h-5" />
        Thư viện
        </Link>
        </div>
      </div> */}


      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* List View */}
        {view === 'list' && (
          <div>
            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm khóa học..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Lọc
                </button>
              </div>
            </div>

            {/* Course List */}
            {loading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-gray-600 mt-4">Đang tải khóa học...</p>
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có khóa học nào</h3>
                <p className="text-gray-600 mb-6">Tạo khóa học đầu tiên của bạn để bắt đầu</p>
                <button
                  onClick={() => setView('create')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Tạo khóa học
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <div
                    key={course.id}
                    className="group bg-white rounded-2xl border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-200"
                  >
                    <div className="p-5 flex flex-col justify-between h-full">
                      {/* Header */}
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                            {course.title}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              course.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {course.status === 'active' ? 'Đang hoạt động' : 'Đã đóng'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                      </div>

                      {/* Info grid */}
                      <div className="mt-4 space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span>{course.enrolledCount}/{course.maxStudents} sinh viên</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>{course.schedule}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-blue-500" />
                          <span>{course.location}</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 pt-5 mt-5 border-t border-gray-100">
                        <button
                          onClick={() => startEdit(course)}
                          className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg flex items-center justify-center gap-1 text-sm font-medium transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 px-3 py-2 rounded-lg flex items-center justify-center gap-1 text-sm font-medium transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}


            
          </div>
        )}

        {/* Create/Edit Form */}
        {(view === 'create' || view === 'edit') && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                {view === 'create' ? 'Tạo khóa học mới' : 'Chỉnh sửa khóa học'}
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên khóa học <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="VD: Giải tích 1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Môn học
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="VD: Toán cao cấp"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Mô tả chi tiết về khóa học..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số lượng sinh viên tối đa
                    </label>
                    <input
                      type="number"
                      value={formData.maxStudents}
                      onChange={(e) => setFormData({...formData, maxStudents: e.target.value})}
                      placeholder="20"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngày bắt đầu
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngày kết thúc
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lịch học
                    </label>
                    <input
                      type="text"
                      value={formData.schedule}
                      onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                      placeholder="VD: Thứ 2, 4, 6 - 18:00-20:00"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Địa điểm
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="VD: H1-201"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trình độ
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="beginner">Cơ bản</option>
                    <option value="intermediate">Trung cấp</option>
                    <option value="advanced">Nâng cao</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-6 border-t">
                <button
                  onClick={() => {
                    setView('list');
                    resetForm();
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={view === 'create' ? handleCreateCourse : handleUpdateCourse}
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {loading ? 'Đang xử lý...' : (view === 'create' ? 'Tạo khóa học' : 'Cập nhật')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}