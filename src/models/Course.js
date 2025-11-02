export class Course {
    constructor({ id, name, instructor, status, enrollments, maxSlots, startTime, endTime, format, location }) {
        this.id = id;
        this.name = name;
        this.instructor = instructor;
        this.status = status;
        this.enrollments = enrollments;
        this.maxSlots = maxSlots;
        this.startTime = startTime;
        this.endTime = endTime;
        this.format = format;
        this.location = location;
    }
}
