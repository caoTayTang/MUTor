import { getCourses, enrollInCourse, unenrollFromCourse } from "../api/api";
import { Course } from "../models/Course";

export class CourseViewModel {
    courses = [];

    async loadCourses() {
        const data = await getCourses();
        this.courses = data.map(d => new Course(d));
    }

    async enroll(courseId) {
        const result = await enrollInCourse(courseId);
        if (result.success) {
            const course = this.courses.find(c => c.id === courseId);
            if (course) course.enrollments += 1;
        }
        return result;
    }

    async unenroll(courseId) {
        const result = await unenrollFromCourse(courseId);
        if (result.success) {
            const course = this.courses.find(c => c.id === courseId);
            if (course) course.enrollments -= 1;
        }
        return result;
    }
}
